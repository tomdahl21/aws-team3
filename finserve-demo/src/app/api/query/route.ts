import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_RAG_URL || 'https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/Prod/rag';

export interface QueryRequest {
  query: string;
  persona?: string;
  clientId?: string;
  jobTitle?: string;
  yearsOfService?: number;
  state?: string;
  county?: string;
  sessionId?: string;
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

    // Build context-enriched query with client information
    const contextParts = [];
    if (body.jobTitle) contextParts.push(`Job Title: ${body.jobTitle}`);
    if (body.yearsOfService) contextParts.push(`Years of Service: ${body.yearsOfService}`);
    if (body.state) contextParts.push(`State: ${body.state}`);
    if (body.county) contextParts.push(`County: ${body.county}`);
    
    const enrichedQuery = contextParts.length > 0
      ? `${contextParts.join(', ')}. ${body.query}`
      : body.query;

    // Call backend RAG API
    const backendPayload = {
      action: 'query',
      query: enrichedQuery,
      session_id: body.sessionId,
    };

    const backendResponse = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(backendPayload),
    });

    if (!backendResponse.ok) {
      throw new Error(`Backend API returned ${backendResponse.status}`);
    }

    const backendData = await backendResponse.json();

    if (!backendData.success) {
      throw new Error(backendData.error || 'Backend query failed');
    }

    const responseTimeMs = Date.now() - start;

    // Transform backend response to frontend format
    const result: QueryResponse = {
      response: backendData.answer || '',
      citations: backendData.sources?.map((s: any) => s.source) || [],
      complianceFlags: [],
      responseTimeMs,
      retrievedSections: backendData.sources?.map((s: any) => s.source) || [],
    };

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[/api/query] Error:', message);

    return NextResponse.json(
      {
        error: message,
        hint: 'Failed to communicate with backend RAG service',
      },
      { status: 500 }
    );
  }
}
