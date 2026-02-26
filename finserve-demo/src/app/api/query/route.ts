import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_RAG_URL || 'https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/Prod/rag';

export interface QueryRequest {
  action: 'query';
  query: string;
  session_id?: string;
}

export interface QueryResponse {
  success: boolean;
  query: string;
  enhanced_query: string;
  entities: {
    department: string | null;
    years_of_service: number | null;
    state: string | null;
    county: string | null;
  };
  answer: string;
  validation: {
    is_valid: boolean;
    confidence: number;
    issues: string[];
    supported_claims: string[];
    unsupported_claims: string[];
  };
  sources: Array<{
    source: string;
    relevance: number;
  }>;
  session_id: string;
  timestamp: string;
}

export async function POST(req: NextRequest) {
  const start = Date.now();

  try {
    const body = (await req.json()) as Partial<QueryRequest>;

    if (!body.query?.trim()) {
      return NextResponse.json({ 
        success: false,
        error: 'query is required',
        message: 'The query field must not be empty'
      }, { status: 400 });
    }

    // Call backend RAG API with exact format
    const backendPayload: QueryRequest = {
      action: 'query',
      query: body.query.trim(),
      session_id: body.session_id,
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

    // Return backend response as-is (already matches spec)
    return NextResponse.json(backendData);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[/api/query] Error:', message);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: message,
      },
      { status: 500 }
    );
  }
}
