/**
 * Knowledge Base Builder
 * Generates embeddings for all document chunks using Amazon Bedrock Titan Embeddings V2.
 * Run once before starting the dev server:
 *   npm run build-kb
 *
 * Output: src/lib/kb-data.json  (committed to repo for fast startup)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { DOC_CHUNKS } from '../src/lib/docs-source';

const EMBEDDING_MODEL = process.env.BEDROCK_EMBEDDING_MODEL_ID ?? 'amazon.titan-embed-text-v2:0';
const OUTPUT_PATH = path.resolve(__dirname, '../src/lib/kb-data.json');

async function embedText(text: string, client: BedrockRuntimeClient): Promise<number[]> {
  const cmd = new InvokeModelCommand({
    modelId: EMBEDDING_MODEL,
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({ inputText: text, dimensions: 512, normalize: true }),
  });
  const res = await client.send(cmd);
  const body = JSON.parse(new TextDecoder().decode(res.body)) as { embedding: number[] };
  return body.embedding;
}

async function main() {
  console.log('🔧 FinServe KB Builder — Amazon Bedrock Titan Embeddings V2\n');

  if (!process.env.AWS_ACCESS_KEY_ID) {
    console.error('❌  AWS_ACCESS_KEY_ID not set. Add credentials to .env.local first.');
    process.exit(1);
  }

  const client = new BedrockRuntimeClient({
    region: process.env.AWS_REGION ?? 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    },
  });

  console.log(`📄  Embedding ${DOC_CHUNKS.length} document chunks...\n`);
  const results = [];
  const start = Date.now();

  for (let i = 0; i < DOC_CHUNKS.length; i++) {
    const chunk = DOC_CHUNKS[i];
    process.stdout.write(`  [${i + 1}/${DOC_CHUNKS.length}] ${chunk.section} — ${chunk.product}...`);
    try {
      const embedding = await embedText(chunk.text, client);
      results.push({ chunk, embedding });
      console.log(` ✓ (${embedding.length}d)`);
    } catch (err) {
      console.error(` ✗ FAILED: ${err instanceof Error ? err.message : err}`);
      process.exit(1);
    }
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2));
  console.log(`\n✅  Knowledge base written to ${OUTPUT_PATH}`);
  console.log(`    ${DOC_CHUNKS.length} chunks · ${(Date.now() - start) / 1000}s total\n`);
  console.log('   Now run: npm run dev\n');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
