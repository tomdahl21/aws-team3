import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';

// Singleton client — reused across requests in the same process
let _client: BedrockRuntimeClient | null = null;

export function getBedrockClient(): BedrockRuntimeClient {
  if (!_client) {
    _client = new BedrockRuntimeClient({
      region: process.env.AWS_REGION ?? 'us-east-1',
      credentials: process.env.AWS_ACCESS_KEY_ID
        ? {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            sessionToken: process.env.AWS_SESSION_TOKEN,
          }
        : undefined, // falls back to default credential chain (IAM role, ~/.aws, etc.)
    });
  }
  return _client;
}

// ── EMBEDDINGS ──────────────────────────────────────────────────────────────

const EMBEDDING_MODEL = process.env.BEDROCK_EMBEDDING_MODEL_ID ?? 'amazon.titan-embed-text-v2:0';

export async function embedText(text: string): Promise<number[]> {
  const client = getBedrockClient();

  const payload = {
    inputText: text,
    dimensions: 512,       // Titan v2 supports 256, 512, 1024. 512 is a good balance.
    normalize: true,
  };

  const cmd = new InvokeModelCommand({
    modelId: EMBEDDING_MODEL,
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify(payload),
  });

  const res = await client.send(cmd);
  const body = JSON.parse(new TextDecoder().decode(res.body)) as { embedding: number[] };
  return body.embedding;
}

// ── TEXT GENERATION ──────────────────────────────────────────────────────────

const CHAT_MODEL = process.env.BEDROCK_MODEL_ID ?? 'anthropic.claude-3-haiku-20240307-v1:0';

export interface BedrockMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface GenerateOptions {
  system?: string;
  maxTokens?: number;
  temperature?: number;
}

export async function generateText(
  messages: BedrockMessage[],
  options: GenerateOptions = {}
): Promise<string> {
  const client = getBedrockClient();

  const payload = {
    anthropic_version: 'bedrock-2023-05-31',
    max_tokens: options.maxTokens ?? 1024,
    temperature: options.temperature ?? 0.3,
    ...(options.system ? { system: options.system } : {}),
    messages,
  };

  const cmd = new InvokeModelCommand({
    modelId: CHAT_MODEL,
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify(payload),
  });

  const res = await client.send(cmd);
  const body = JSON.parse(new TextDecoder().decode(res.body)) as {
    content: Array<{ type: string; text: string }>;
  };

  return body.content.find((c) => c.type === 'text')?.text ?? '';
}
