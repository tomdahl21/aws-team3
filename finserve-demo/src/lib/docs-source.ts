// Synthetic insurance policy documents for FinServe demo
// These are representative Italian insurance policy sections used for RAG retrieval.
// In production, these would be extracted from real 700-1000 page policy PDFs.

export interface DocChunk {
  id: string;
  section: string;
  product: string;
  language: 'it' | 'en';
  clauseType: 'coverage' | 'exclusion' | 'tariff' | 'reimbursement' | 'procedure' | 'definition';
  text: string;
}

export const DOC_CHUNKS: DocChunk[] = [
  // ═══════════════════════════════════════════════
  // PRODOTTO A — "Protezione Totale"
  // ═══════════════════════════════════════════════
  {
    id: 'pa-71',
    section: '§ 7.1',
    product: 'Prodotto A',
    language: 'it',
    clauseType: 'coverage',
    text: `PRODOTTO A — "Protezione Totale"
§ 7.1 — Tabella di Copertura

Prodotto A offre copertura completa per invalidità permanente totale e parziale, attiva dal primo giorno di polizza senza periodi di carenza.

Copertura Invalidità Permanente Totale (IPT ≥ 66%):
- Massimale: € 500.000
- Attivazione: dal primo giorno
- Limite di età all'ingresso: 18–65 anni

Copertura Invalidità Permanente Parziale (IPP, 10%–65%):
- Massimale: € 500.000 proporzionale al grado di invalidità
- Attivazione: dal primo giorno
- Nessun periodo minimo di carenza

Copertura Morte per Qualsiasi Causa:
- Beneficio: € 250.000 ai beneficiari designati
- Attivazione: dal primo giorno

Premio Annuale Base: € 2.400
Coefficiente età 40–50 anni: 1,00
Coefficiente profilo rischio medio: 1,00
Premio effettivo per cliente 45 anni, rischio medio: € 2.400/anno`,
  },
  {
    id: 'pa-123',
    section: '§ 12.3',
    product: 'Prodotto A',
    language: 'it',
    clauseType: 'exclusion',
    text: `PRODOTTO A — "Protezione Totale"
§ 12.3 — Esclusioni dalla Copertura

Prodotto A esclude dalla copertura esclusivamente le seguenti condizioni:

12.3.1 Condizioni preesistenti documentate: patologie diagnosticate o in trattamento nei 90 giorni precedenti la stipula della polizza, se non dichiarate al momento della sottoscrizione.

12.3.2 Atti dolosi: invalidità o decesso derivanti da atti dolosamente provocati dall'assicurato.

12.3.3 Attività ad alto rischio non dichiarate: sport estremi o attività professionali pericolose non comunicate al momento della stipula.

NOTA IMPORTANTE: Prodotto A NON esclude l'invalidità parziale in nessun periodo di copertura. Non esistono periodi di carenza per l'invalidità parziale. Questa è una caratteristica distintiva di Prodotto A rispetto ad altre offerte di mercato.`,
  },
  {
    id: 'pa-141',
    section: '§ 14.1',
    product: 'Prodotto A',
    language: 'it',
    clauseType: 'coverage',
    text: `PRODOTTO A — "Protezione Totale"
§ 14.1 — Copertura Invalidità: Dettaglio Tecnico

Calcolo del beneficio per invalidità permanente parziale (IPP):
- Beneficio = Massimale × Percentuale di invalidità accertata
- Esempio: IPP 30% su massimale € 500.000 → beneficio € 150.000

Periodi di carenza: NESSUNO per Prodotto A.

Invalidità da infortunio (non da malattia):
- Copertura immediata dal primo giorno
- Nessun limite di percentuale minima per infortuni

Invalidità da malattia:
- Copertura dal 91° giorno dalla stipula per malattie preesistenti non dichiarate
- Copertura immediata per malattie insorte dopo la stipula

Documentazione richiesta per liquidazione:
- Certificazione medica di grado di invalidità (INPS o CTU)
- Dichiarazione del medico curante
- Documentazione dell'evento invalidante`,
  },
  {
    id: 'pa-182',
    section: '§ 18.2',
    product: 'Prodotto A',
    language: 'it',
    clauseType: 'tariff',
    text: `PRODOTTO A — "Protezione Totale"
§ 18.2 — Tariffe e Premi

Premio base annuale: € 2.400

Tabella coefficienti per età all'ingresso:
- 18–29 anni: 0,75 (sconto giovani)
- 30–39 anni: 0,90
- 40–50 anni: 1,00 (base)
- 51–59 anni: 1,25
- 60–65 anni: 1,60

Tabella coefficienti per profilo di rischio:
- Rischio basso:  0,85
- Rischio medio:  1,00 (base)
- Rischio alto:   1,35

Esempio calcolo — Cliente 45 anni, rischio medio:
Premio = € 2.400 × 1,00 × 1,00 = € 2.400/anno = € 200/mese

Possibilità di pagamento: annuale (sconto 5%), semestrale, trimestrale, mensile.

Adeguamento annuale del premio: IPC + 1,5% massimo per anno di rinnovo.`,
  },

  // ═══════════════════════════════════════════════
  // PRODOTTO B — "Protezione Base"
  // ═══════════════════════════════════════════════
  {
    id: 'pb-71',
    section: '§ 7.1',
    product: 'Prodotto B',
    language: 'it',
    clauseType: 'coverage',
    text: `PRODOTTO B — "Protezione Base"
§ 7.1 — Tabella di Copertura

Prodotto B offre copertura per invalidità permanente totale dal primo giorno. La copertura per invalidità parziale è soggetta a restrizioni nei primi 24 mesi (vedi § 12.3).

Copertura Invalidità Permanente Totale (IPT ≥ 66%):
- Massimale: € 400.000
- Attivazione: dal primo giorno

Copertura Invalidità Permanente Parziale (IPP):
- Massimale: € 400.000
- ATTENZIONE: Nei primi 24 mesi, invalidità parziale <30% NON è coperta (vedi § 12.3.4)
- Dal 25° mese: copertura completa per IPP ≥ 10%

Copertura Morte per Qualsiasi Causa:
- Beneficio: € 200.000 ai beneficiari designati

Premio Annuale Base: € 1.800 (risparmio del 25% rispetto a Prodotto A)
Coefficiente età 40–50 anni: 1,00
Coefficiente profilo rischio medio: 1,00
Premio effettivo per cliente 45 anni, rischio medio: € 1.800/anno`,
  },
  {
    id: 'pb-123',
    section: '§ 12.3',
    product: 'Prodotto B',
    language: 'it',
    clauseType: 'exclusion',
    text: `PRODOTTO B — "Protezione Base"
§ 12.3 — Esclusioni dalla Copertura

12.3.1 Condizioni preesistenti: come da condizioni standard.

12.3.2 Atti dolosi: come da condizioni standard.

12.3.3 Attività ad alto rischio non dichiarate: come da condizioni standard.

12.3.4 ★ ESCLUSIONE PARZIALE INVALIDITÀ — PERIODO DI CARENZA:
Nei primi 24 (ventiquattro) mesi dalla data di stipula della polizza, l'invalidità permanente parziale (IPP) con grado di invalidità inferiore al 30% (trenta per cento) è ESCLUSA dalla copertura assicurativa.

Nei primi 24 mesi, per IPP compresa tra 30% e 65%:
- Viene erogato il 50% del beneficio calcolato sul massimale

Dal 25° mese dalla stipula:
- Copertura completa per IPP ≥ 10% (nessuna esclusione)

Questa clausola si applica indipendentemente dalla causa dell'invalidità (infortunio o malattia), salvo infortuni sul lavoro documentati.`,
  },
  {
    id: 'pb-141',
    section: '§ 14.1',
    product: 'Prodotto B',
    language: 'it',
    clauseType: 'coverage',
    text: `PRODOTTO B — "Protezione Base"
§ 14.1 — Copertura Invalidità: Dettaglio Tecnico

Calcolo del beneficio in funzione del periodo e del grado di invalidità:

PERIODO 1 — Mesi 1–24 dalla stipula:
- IPP < 30%: NON COPERTA
- IPP 30%–65%: beneficio al 50% del massimale proporzionale
- IPT ≥ 66%: beneficio pieno su € 400.000

PERIODO 2 — Dal mese 25 in poi:
- IPP ≥ 10%: beneficio pieno = massimale × percentuale invalidità
- IPT ≥ 66%: beneficio pieno su € 400.000

Esempio pratico — Cliente con IPP 25%, polizza attiva da 12 mesi:
→ Il beneficio è ZERO perché IPP < 30% nel primo periodo.

Esempio pratico — Cliente con IPP 25%, polizza attiva da 30 mesi:
→ Beneficio = € 400.000 × 25% = € 100.000`,
  },
  {
    id: 'pb-182',
    section: '§ 18.2',
    product: 'Prodotto B',
    language: 'it',
    clauseType: 'tariff',
    text: `PRODOTTO B — "Protezione Base"
§ 18.2 — Tariffe e Premi

Premio base annuale: € 1.800 (risparmio 25% vs Prodotto A)

Tabella coefficienti per età all'ingresso:
- 18–29 anni: 0,75
- 30–39 anni: 0,90
- 40–50 anni: 1,00 (base)
- 51–59 anni: 1,25
- 60–65 anni: 1,60

Tabella coefficienti per profilo di rischio:
- Rischio basso:  0,85
- Rischio medio:  1,00
- Rischio alto:   1,35

Esempio calcolo — Cliente 45 anni, rischio medio:
Premio = € 1.800 × 1,00 × 1,00 = € 1.800/anno = € 150/mese

Risparmio rispetto a Prodotto A: € 600/anno (€ 50/mese).

NOTA: Il risparmio sul premio deve essere valutato alla luce delle esclusioni dei primi 24 mesi per IPP < 30%.`,
  },

  // ═══════════════════════════════════════════════
  // CONDIZIONI GENERALI (si applicano a entrambi i prodotti)
  // ═══════════════════════════════════════════════
  {
    id: 'cg-32',
    section: '§ 3.2',
    product: 'Condizioni Generali',
    language: 'it',
    clauseType: 'procedure',
    text: `CONDIZIONI GENERALI — Applicabili a tutti i prodotti
§ 3.2 — Procedura di Denuncia del Sinistro

Il contraente o il beneficiario deve denunciare il sinistro entro i seguenti termini:

3.2.1 Termine di denuncia:
- Sinistri da infortunio: entro 30 giorni dall'evento
- Sinistri da malattia: entro 30 giorni dalla diagnosi definitiva
- Decesso: entro 30 giorni dalla data del decesso

3.2.2 Documentazione richiesta:
- Modulo di denuncia sinistri compilato e firmato
- Certificazione medica dell'evento
- Documentazione identificativa del contraente/beneficiario
- Copia della polizza assicurativa in vigore

3.2.3 Modalità di presentazione:
- Via raccomandata A/R alla sede della Compagnia
- Via PEC all'indirizzo: sinistri@finserve-assicurazioni.it
- Tramite il Relationship Manager di riferimento

Il mancato rispetto dei termini di denuncia può comportare la decadenza dal diritto al beneficio.`,
  },
  {
    id: 'cg-94',
    section: '§ 9.4',
    product: 'Condizioni Generali',
    language: 'it',
    clauseType: 'reimbursement',
    text: `CONDIZIONI GENERALI — Applicabili a tutti i prodotti
§ 9.4 — Tempi di Rimborso — Disposizione Generale

Il rimborso delle prestazioni assicurative sarà effettuato entro 30 (trenta) giorni dalla data di ricevimento della documentazione completa e certificata.

9.4.1 Decorrenza del termine:
Il termine dei 30 giorni decorre dalla data di protocollazione della documentazione completa presso gli uffici della Compagnia. La Compagnia è tenuta a comunicare entro 5 giorni lavorativi l'eventuale incompletezza della documentazione.

9.4.2 Modalità di rimborso:
Il rimborso verrà effettuato tramite bonifico bancario sul conto corrente indicato dal beneficiario al momento della stipula o in sede di denuncia del sinistro.

9.4.3 Interessi di mora:
In caso di ritardo nel rimborso oltre i 30 giorni, la Compagnia è tenuta al pagamento degli interessi di mora al tasso legale vigente.

Vedi anche: § 22.1 per disposizioni speciali relative a sinistri di importo elevato.`,
  },
  {
    id: 'cg-221',
    section: '§ 22.1',
    product: 'Condizioni Generali',
    language: 'it',
    clauseType: 'reimbursement',
    text: `CONDIZIONI GENERALI — Applicabili a tutti i prodotti
§ 22.1 — Rimborso per Sinistri di Importo Elevato — Disposizione Speciale

★ CLAUSOLA DEROGATORIA rispetto a § 9.4

In deroga a quanto stabilito dall'articolo 9.4, per sinistri che comportino un importo di rimborso superiore a € 10.000 (diecimila euro), si applicano le seguenti disposizioni speciali:

22.1.1 Termine di rimborso esteso:
Il rimborso sarà effettuato entro 60 (sessanta) giorni dalla data di ricevimento della documentazione completa. Tale proroga è necessaria per consentire la necessaria verifica documentale approfondita e la valutazione tecnica da parte del perito della Compagnia.

22.1.2 Procedura di verifica obbligatoria:
- Perizia medica da parte di un medico fiduciario della Compagnia (entro 30 giorni dalla denuncia)
- Possibilità di richiesta di documentazione integrativa entro 15 giorni dalla perizia
- Delibera dell'Ufficio Liquidazione Sinistri Complessi

22.1.3 Comunicazione al beneficiario:
La Compagnia deve informare il beneficiario dell'applicazione di questa clausola entro 10 giorni lavorativi dalla ricezione della denuncia.

CONFLITTO CON § 9.4: Per sinistri > € 10.000, si applica § 22.1 (60 giorni), NON § 9.4 (30 giorni). La clausola specifica prevale su quella generale.`,
  },
  {
    id: 'cg-251',
    section: '§ 25.1',
    product: 'Condizioni Generali',
    language: 'it',
    clauseType: 'procedure',
    text: `CONDIZIONI GENERALI — Applicabili a tutti i prodotti
§ 25.1 — Contestazioni, Ricorsi ed Escalation

25.1.1 Reclamo formale:
In caso di insoddisfazione per le decisioni della Compagnia, il contraente può presentare reclamo formale entro 60 giorni dalla comunicazione della decisione.

Modalità: raccomandata A/R o PEC a: reclami@finserve-assicurazioni.it
La Compagnia risponde entro 30 giorni lavorativi.

25.1.2 Ricorso all'Arbitro Assicurativo:
Se il reclamo non viene risolto in modo soddisfacente, è possibile ricorrere all'Arbitro Assicurativo IVASS entro 12 mesi dalla risposta della Compagnia.

25.1.3 Escalation interna — procedura per Relationship Manager:
Quando viene rilevato un conflitto di clausole o una situazione di incertezza interpretativa:
1. Il RM deve immediatamente segnalare al team Compliance (compliance@finserve.it)
2. Non fornire al cliente interpretazioni definitive fino alla risoluzione del conflitto
3. Comunicare al cliente i possibili scenari e i tempi di risoluzione
4. Documentare la segnalazione nel CRM entro 24 ore

25.1.4 Organo di Vigilanza: IVASS (Istituto per la Vigilanza sulle Assicurazioni)`,
  },
  // Comparison summary chunk to help with product comparison queries
  {
    id: 'comp-ab',
    section: '§ Riepilogo Comparativo',
    product: 'Confronto A/B',
    language: 'it',
    clauseType: 'coverage',
    text: `CONFRONTO DIRETTO: Prodotto A vs Prodotto B

CARATTERISTICA               PRODOTTO A              PRODOTTO B
─────────────────────────────────────────────────────────────────
Premio annuale (45 anni, rm)  € 2.400                 € 1.800
Risparmio annuale             —                       € 600 (25%)
Massimale IPT                 € 500.000               € 400.000
Massimale IPP                 € 500.000               € 400.000
IPP <30% mesi 1–24           COPERTA                 NON COPERTA ★
IPP 30–65% mesi 1–24         COPERTA al 100%         COPERTA al 50%
IPP dal mese 25              COPERTA al 100%         COPERTA al 100%
Copertura morte               € 250.000               € 200.000
Periodi di carenza            NESSUNO                 24 mesi per IPP

★ Esclusione critica di Prodotto B: nei primi 24 mesi, invalidità parziale inferiore al 30% non è coperta.

RACCOMANDAZIONE PER CLIENTE 45 ANNI, PROFILO MEDIO:
- Se il cliente vuole massima protezione immediata → Prodotto A (€ 600/anno in più)
- Se il cliente è giovane e sano, vuole risparmiare → Prodotto B (con consapevolezza dell'esclusione)
- Per clienti con storia di problemi muscolo-scheletrici → Prodotto A fortemente consigliato`,
  },
];
