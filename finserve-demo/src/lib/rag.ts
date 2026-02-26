import { embedText } from './bedrock';
import { DOC_CHUNKS, type DocChunk } from './docs-source';

// ── TYPES ─────────────────────────────────────────────────────────────────────

export interface IndexedChunk {
  chunk: DocChunk;
  embedding: number[];
}

export interface RetrievedChunk {
  chunk: DocChunk;
  score: number;
}

// ── IN-MEMORY KNOWLEDGE BASE ─────────────────────────────────────────────────
// Lazy-initialized on first query. Module-level so it persists within a process.

let knowledgeBase: IndexedChunk[] | null = null;
let initPromise: Promise<IndexedChunk[]> | null = null;

export async function getKnowledgeBase(): Promise<IndexedChunk[]> {
  if (knowledgeBase) return knowledgeBase;

  // If already initializing, wait for it
  if (initPromise) return initPromise;

  initPromise = (async () => {
    console.log(`[RAG] Initializing knowledge base — embedding ${DOC_CHUNKS.length} chunks...`);
    const start = Date.now();

    const indexed: IndexedChunk[] = await Promise.all(
      DOC_CHUNKS.map(async (chunk) => {
        const embedding = await embedText(chunk.text);
        return { chunk, embedding };
      })
    );

    knowledgeBase = indexed;
    console.log(`[RAG] Knowledge base ready in ${Date.now() - start}ms`);
    return indexed;
  })();

  return initPromise;
}

// ── COSINE SIMILARITY ─────────────────────────────────────────────────────────

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ── RETRIEVAL ─────────────────────────────────────────────────────────────────

export async function retrieve(query: string, topK = 4): Promise<RetrievedChunk[]> {
  const kb = await getKnowledgeBase();
  const queryEmbedding = await embedText(query);

  const scored = kb.map((item) => ({
    chunk: item.chunk,
    score: cosineSimilarity(queryEmbedding, item.embedding),
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

// ── COMPLIANCE FLAG DETECTION ─────────────────────────────────────────────────

export interface ComplianceFlag {
  title: string;
  description: string;
  clauses: string[];
  recommendation: string;
}

export function detectComplianceConflicts(retrievedChunks: RetrievedChunk[]): ComplianceFlag[] {
  const flags: ComplianceFlag[] = [];

  const sections = retrievedChunks.map((r) => r.chunk.section);
  const hasSection94  = sections.some((s) => s.includes('9.4'));
  const hasSectionP21 = sections.some((s) => s.includes('22.1'));

  // Known conflict: §9.4 (30 days) vs §22.1 (60 days for claims > €10,000)
  if (hasSection94 && hasSectionP21) {
    flags.push({
      title: 'Conflitto Clausole: Tempi di Rimborso',
      description:
        '§ 9.4 stabilisce un rimborso entro 30 giorni, ma § 22.1 prevede 60 giorni per sinistri superiori a € 10.000. Le due clausole si applicano in casi diversi e potrebbero creare confusione.',
      clauses: ['§ 9.4', '§ 22.1'],
      recommendation: 'Verificare l\'importo del sinistro. Se > € 10.000, si applica § 22.1 (60 giorni). Escalation al team compliance consigliata.',
    });
  }

  return flags;
}

// ── PERSONA PROMPTS ────────────────────────────────────────────────────────────

export type PersonaKey = 'experienced' | 'new' | 'specialist';

export function getPersonaSystemPrompt(persona: PersonaKey): string {
  const base = `Sei FinServe AI Co-Pilot, un assistente specializzato per i Relationship Manager di una compagnia assicurativa italiana.
Rispondi sempre in italiano. Usa esclusivamente le informazioni fornite nel contesto documentale.
Non inventare dati, percentuali, importi o clausole. Se l'informazione non è nel contesto, dillo chiaramente.
Cita sempre le sezioni di riferimento (§) alla fine della risposta.`;

  const personas: Record<PersonaKey, string> = {
    experienced: `${base}

STILE DI RISPOSTA — EXPERIENCED RM:
- Risposta concisa e diretta (massimo 4-5 frasi principali)
- Usa terminologia tecnica assicurativa senza spiegarla
- Inizia subito con il dato chiave o la raccomandazione
- Usa bullet point solo se confronti dati numerici
- Tono professionale, sicuro, da collega esperto`,

    new: `${base}

STILE DI RISPOSTA — NEW RM:
- Risposta dettagliata con struttura chiara (titoli e bullet point)
- Spiega i termini tecnici la prima volta che li usi
- Includi una sezione "Cosa fare ora" con passi concreti
- Fornisci esempi numerici concreti quando possibile
- Tono di guida e supporto`,

    specialist: `${base}

STILE DI RISPOSTA — SPECIALIST RM:
- Risposta tecnica approfondita con tutta la precisione regolamentare
- Cita le clausole letteralmente quando rilevante
- Includi tutti i casi limite e le eccezioni
- Analisi delle interazioni tra clausole diverse
- Riferimenti alla normativa IVASS se pertinente
- Tono analitico e completo`,
  };

  return personas[persona] ?? personas.experienced;
}

// ── BUILD RAG PROMPT ───────────────────────────────────────────────────────────

export function buildRagPrompt(
  query: string,
  retrievedChunks: RetrievedChunk[],
  clientContext?: string
): string {
  const contextDocs = retrievedChunks
    .map((r, i) => `[Documento ${i + 1} — ${r.chunk.section} — ${r.chunk.product}]\n${r.chunk.text}`)
    .join('\n\n---\n\n');

  const clientSection = clientContext
    ? `\nCONTESTO CLIENTE:\n${clientContext}\n`
    : '';

  return `${clientSection}
DOCUMENTI DI RIFERIMENTO:
${contextDocs}

---

DOMANDA DEL RELATIONSHIP MANAGER:
${query}

Rispondi basandoti esclusivamente sui documenti di riferimento forniti sopra. Alla fine della risposta, elenca le sezioni citate (es: "Fonti: § 7.1 — Prodotto A, § 12.3 — Prodotto B").`;
}

// ── EXTRACT CITATIONS FROM RESPONSE ──────────────────────────────────────────

export function extractCitations(
  responseText: string,
  retrievedChunks: RetrievedChunk[]
): string[] {
  // First, look for explicit "Fonti:" section in the response
  const fontiMatch = responseText.match(/Fonti:\s*(.+?)(?:\n|$)/i);
  if (fontiMatch) {
    return fontiMatch[1]
      .split(/[,;]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  // Fallback: use the retrieved chunk sections
  return retrievedChunks
    .slice(0, 4)
    .map((r) => `${r.chunk.section} — ${r.chunk.product}`);
}
