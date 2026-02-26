# Technical Decisions Log

> Living document — updated as decisions are made during the build.
> Format: decision → rationale → status → date

---

## Stack Overview

| Layer | Choice | Status |
|-------|--------|--------|
| Frontend | Next.js 14+ / TypeScript | DECIDED |
| Styling | CSS Modules (FinServe design system) | DECIDED |
| Backend | Next.js API routes | DECIDED |
| LLM | Amazon Bedrock — Claude 3 Sonnet or Haiku | DECIDED |
| Embeddings | Amazon Titan Embeddings V2 (via Bedrock) | DECIDED |
| Vector search | In-memory cosine similarity | DECIDED |
| Auth | Mocked (hardcoded users, no Cognito) | DECIDED (demo scope) |
| Hosting | Local dev only (no deployment for demo) | DECIDED (demo scope) |
| Database | None — static JSON mock data | DECIDED (demo scope) |

---

## Decision Log

### TD-001 — AWS Bedrock as AI provider
**Date**: 2026-02-25
**Decision**: Use Amazon Bedrock as the sole AI infrastructure provider.
**Rationale**: Project is in the `aws-team3` context for an AWS PIA Bootcamp. AWS Bedrock is the only confirmed available service.
**Impact**: Locks us into Bedrock API for both LLM inference and embeddings. No OpenAI/Anthropic direct API.
**Status**: FINAL

---

### TD-002 — In-memory RAG over Bedrock Knowledge Bases
**Date**: 2026-02-25
**Decision**: Implement RAG using Bedrock Titan Embeddings V2 for encoding + in-memory cosine similarity for retrieval. No OpenSearch Serverless or Bedrock Knowledge Bases.
**Rationale**:
- Only Amazon Bedrock (not Bedrock KBs or OpenSearch) is confirmed available
- 1-2 day timeline makes managed service setup risky
- In-memory approach is fully controllable for demo reliability
- Allows us to demo real RAG concepts (chunking, embedding, retrieval, generation) without infrastructure dependencies
**Trade-offs**:
- Not production-grade (no persistence, limited scale)
- Sufficient for demo with ~20 pages of synthesized docs
- Easy to upgrade to Bedrock KBs or OpenSearch post-demo
**Status**: FINAL

---

### TD-003 — Synthesized insurance documents (not real)
**Date**: 2026-02-25
**Decision**: Generate realistic synthetic insurance policy documents to serve as the RAG knowledge base.
**Rationale**: Real 700-1000 page insurance documents are not available. Synthetic docs let us control the content to match demo scenarios precisely.
**Scope**: ~15-25 pages covering:
- Prodotto A (product coverage, premiums, exclusions)
- Prodotto B (product coverage, premiums, exclusions)
- Reimbursement conditions (§9.4, §22.1 — conflicting clauses)
- Partial disability exclusions
- Edge cases for year 2+ coverage
**Language**: Italian primary (to match demo personas), English sections for RM guidance
**Status**: FINAL

---

### TD-004 — Claude model selection for demo
**Date**: 2026-02-25
**Decision**: TBD — Claude 3 Haiku for speed, Claude 3 Sonnet for quality
**Options**:
- `anthropic.claude-3-haiku-20240307-v1:0` — Faster, cheaper, ~2s latency target
- `anthropic.claude-3-sonnet-20240229-v1:0` — Better quality, 3-4s latency
- `anthropic.claude-3-5-sonnet-20241022-v2:0` — Best quality, higher latency/cost
**Recommendation**: Use Haiku for demo (meets <2s target), Sonnet for fallback if quality is poor.
**Status**: OPEN — decide once Bedrock access is tested

---

### TD-005 — Next.js API routes as backend
**Date**: 2026-02-25
**Decision**: Use Next.js API routes (app router) for all backend logic including Bedrock calls, embedding generation, and vector search.
**Rationale**:
- No separate backend service to deploy/manage
- AWS SDK for JavaScript works natively in Node.js runtime
- Keeps everything in one repo for demo simplicity
**Concern**: API routes will call Bedrock — requires AWS credentials in the Next.js environment (env vars)
**Status**: FINAL

---

### TD-006 — Persona prompting strategy
**Date**: 2026-02-25
**Decision**: Implement personas as system prompt modifications passed to Claude via Bedrock.
**Three personas**:
1. **Experienced RM** — "Respond concisely in Italian. Use technical insurance terminology. Assume deep product knowledge. Max 3-4 sentences."
2. **New RM** — "Respond in detail in Italian. Use simple language. Provide step-by-step guidance. Include bullet points for clarity."
3. **Specialist RM** — "Respond with maximum technical depth in Italian. Include all edge cases, clause references, and regulatory context."
**Status**: FINAL

---

### TD-007 — Embedding and chunking strategy
**Date**: 2026-02-25
**Decision**:
- Chunk size: ~300 tokens with 50-token overlap
- Preserve section headers (§ references) in each chunk
- Embed all chunks at startup (or build time) using Titan Embeddings V2 (1536 dimensions)
- Store chunks + embeddings in memory as JSON array
- Top-K retrieval: 3-5 most similar chunks per query
**Status**: FINAL

---

## Build Status (2026-02-25)

### ✅ Completed
- `finserve-demo/` — Next.js app running at http://localhost:3000
- CSS design system, TopBar, all three pages (Dashboard / Co-Pilot / Evaluation)
- `src/lib/bedrock.ts` — Bedrock client (embeddings + text generation)
- `src/lib/rag.ts` — Cosine similarity retrieval, persona prompts, compliance detection
- `src/lib/docs-source.ts` — 11 synthetic Italian policy chunks (Prodotto A, B, Condizioni Generali)
- `src/app/api/query/route.ts` — RAG + Bedrock POST endpoint
- `scripts/build-kb.ts` — Embedding seed script (`npm run build-kb`)

### 🔴 Next: AWS Credentials
Credentials needed in `.env.local` before Bedrock calls will work.

## Open Technical Questions

- [ ] **BLOCKING**: Get AWS credentials (access key + secret + session token) from SSO portal
- [ ] First-query KB init: 11 chunks embed on first request (~5-10s cold start). Pre-run `npm run build-kb` to eliminate this.
- [ ] Claude model: Haiku (default, fast) vs Sonnet (better quality) — test once credentials work
- [ ] Confirm Bedrock model access enabled for `us-east-1` in the bootcamp AWS account

---

## Post-Demo Upgrade Path

| Current (Demo) | Post-Demo Target |
|----------------|------------------|
| In-memory vector search | Bedrock Knowledge Bases or OpenSearch Serverless |
| Synthesized docs | Real insurance PDFs via S3 + document processing |
| Mocked auth | Amazon Cognito with SSO federation |
| Local dev only | AWS App Runner or ECS deployment |
| No persistence | DynamoDB or Aurora for query history/sessions |
