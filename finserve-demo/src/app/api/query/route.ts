import { NextRequest, NextResponse } from 'next/server';
import { retrieve, detectComplianceConflicts, getPersonaSystemPrompt, buildRagPrompt, extractCitations, type PersonaKey } from '@/lib/rag';
import { generateText } from '@/lib/bedrock';
import { CLIENTS } from '@/lib/mock-data';

export interface QueryRequest {
  query: string;
  persona: PersonaKey;
  clientId: string;
  jobTitle: string;
  yearsOfService: number;
  state: string;
  county: string;
}

export interface QueryResponse {
  response: string;
  citations: string[];
  complianceFlags: Array<{
    title: string;
    description: string;
    clauses: string[];
    recommendation: string;
  }>;
  responseTimeMs: number;
  retrievedSections: string[];
}

export async function POST(req: NextRequest) {
  const start = Date.now();

  try {
    const body = (await req.json()) as Partial<QueryRequest>;

    if (!body.query?.trim()) {
      return NextResponse.json({ error: 'query is required' }, { status: 400 });
    }

    const persona = (body.persona ?? 'experienced') as PersonaKey;
    const clientId = body.clientId ?? '';
    const query = body.query.trim();

    // Look up client context for the prompt
    const client = CLIENTS.find((c) => c.id === clientId);
    
    // Use provided fields or fall back to client lookup
    const jobTitle = body.jobTitle ?? client?.department;
    const yearsOfService = body.yearsOfService ?? client?.yearsOfService;
    const state = body.state ?? client?.state;
    const county = body.county ?? client?.county;
    
    const clientContext = jobTitle || yearsOfService || state || county
      ? `Job Title: ${jobTitle ?? 'N/A'}, Years of Service: ${yearsOfService ?? 'N/A'}, State: ${state ?? 'N/A'}, County: ${county ?? 'N/A'}`
      : undefined;

    // 1. Retrieve relevant document chunks
    const retrieved = await retrieve(query, 4);

    // 2. Detect compliance conflicts in retrieved chunks
    const complianceFlags = detectComplianceConflicts(retrieved);

    // 3. Build the prompt
    const userMessage = buildRagPrompt(query, retrieved, clientContext);
    const systemPrompt = getPersonaSystemPrompt(persona);

    // 4. Generate response via Bedrock
    const responseText = await generateText(
      [{ role: 'user', content: userMessage }],
      { system: systemPrompt, maxTokens: 1024, temperature: 0.2 }
    );

    // 5. Extract citations from response
    const citations = extractCitations(responseText, retrieved);

    const responseTimeMs = Date.now() - start;

    const result: QueryResponse = {
      response: responseText,
      citations,
      complianceFlags,
      responseTimeMs,
      retrievedSections: retrieved.map((r) => `${r.chunk.section} — ${r.chunk.product}`),
    };

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[/api/query] Error:', message);

    // Provide a clear error message to help with debugging
    return NextResponse.json(
      {
        error: message,
        hint: message.includes('credentials')
          ? 'AWS credentials not configured. Add AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_SESSION_TOKEN to .env.local'
          : message.includes('ValidationException') || message.includes('ResourceNotFoundException')
          ? 'Bedrock model access issue. Check that the model ID is enabled in your AWS account for us-east-1'
          : 'See server console for details',
      },
      { status: 500 }
    );
  }
}
