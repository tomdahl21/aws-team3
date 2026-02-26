# Backlog & Planning Log

> Living document — sprint tasks, priorities, and build decisions tracked here.
> Updated as items are started, completed, or descoped.

---

## Current Sprint: Demo Build (Phase 0)
**Goal**: Working demo for AWS PIA Bootcamp presentation
**Timeline**: 1-2 days
**Stack**: Next.js 14 + Bedrock (Claude + Titan Embeddings) + in-memory RAG

---

## P0 — Must Ship for Demo

### 1. Project Setup
- [ ] Initialize Next.js 14 app with TypeScript (`create-next-app`)
- [ ] Configure AWS SDK v3 (`@aws-sdk/client-bedrock-runtime`)
- [ ] Set up `.env.local` with Bedrock credentials/region
- [ ] Install Google Fonts (Fraunces + DM Sans) via Next.js font optimization
- [ ] Create base CSS design system (tokens from finserve-components.html)

### 2. Synthetic Insurance Documents
- [ ] Write ~20 pages of realistic Italian insurance policy content
  - Prodotto A: coverage, premiums, exclusions (§7.1, §12.3, §14.1, §18.2)
  - Prodotto B: coverage, premiums, exclusions (same §-structure, different terms)
  - Reimbursement conditions: §9.4 (30 days) and §22.1 (60 days — conflicting)
  - Partial disability exclusions (year 1-2 coverage change)
- [ ] Create chunking script (300-token chunks, 50-token overlap, preserve § refs)
- [ ] Generate and cache embeddings using Bedrock Titan Embeddings V2
- [ ] Save chunks + embeddings to `/lib/knowledge-base/chunks.json`

### 3. Bedrock Integration (API Routes)
- [ ] `/api/query` — POST endpoint: takes `{ query, persona, clientId }`, returns response
  - Embed query with Titan Embeddings
  - Cosine similarity search over chunks
  - Build prompt with retrieved context + persona instructions
  - Call Claude via Bedrock InvokeModel API
  - Return `{ response, citations, complianceFlags, responseTimeMs }`
- [ ] Test Bedrock credentials and model access before building UI

### 4. Dashboard (`/`)
- [ ] Global layout (nav header, page structure)
- [ ] Metrics cards (queries today, avg response time, accuracy, satisfaction)
- [ ] Client queue list (Marco, Giulia, Luca with status badges)
- [ ] Navigation: click client → opens Co-Pilot

### 5. AI Co-Pilot (`/copilot`)
- [ ] Client context strip (name, age, risk profile, scenario tag)
- [ ] Persona dropdown selector (Experienced / New / Specialist)
- [ ] Chat interface — message thread display
- [ ] Query input + send button
- [ ] Quick query buttons (Compare Products, Edge Case, Compliance Check)
- [ ] AI response card with:
  - Response text (Italian)
  - Citation chips (§-references as gold pills)
  - Compliance flag banner (when applicable)
  - Response time display
  - Thumbs up/down feedback
- [ ] Loading state (animated "AI is thinking" with live timer)

### 6. Evaluation Dashboard (`/evaluation`)
- [ ] Metrics grid (same 4 KPIs as dashboard)
- [ ] Query type breakdown (bar chart or visual %)
- [ ] Persona performance table (satisfaction + response time + usage count)
- [ ] Compliance insights strip (flagged / resolved / escalated counts)

---

## P1 — Nice to Have (if time permits)

- [ ] Smooth page transitions / loading states
- [ ] Mobile responsive layout
- [ ] Animate metrics cards counting up on load
- [ ] Session history visible in Co-Pilot sidebar
- [ ] Italian/English language toggle

---

## P2 — Deferred (post-demo)

- [ ] Real authentication (Cognito)
- [ ] Query persistence (DynamoDB)
- [ ] Bedrock Knowledge Bases integration (replace in-memory)
- [ ] Document upload / processing pipeline
- [ ] Session notes / auto-summary
- [ ] Proactive compliance surfacing
- [ ] Voice interface
- [ ] CRM integration

---

## Build Order (Recommended)

**Day 1, Block 1 (2-3 hrs): Infrastructure**
1. `create-next-app` + dependencies
2. AWS SDK setup + credentials test
3. Synthetic docs written + chunked
4. Embeddings generated + saved to file
5. `/api/query` route wired up and tested with curl

**Day 1, Block 2 (2-3 hrs): Core UI Shell**
6. CSS design system (tokens, typography, base components)
7. Layout / navigation structure
8. Dashboard view (static data OK for now)

**Day 2, Block 1 (3-4 hrs): Co-Pilot**
9. Client context strip
10. Chat interface + real Bedrock query
11. Response card with citations
12. Compliance flag display
13. Persona switching wires to different prompts

**Day 2, Block 2 (2-3 hrs): Polish + Evaluation**
14. Evaluation dashboard
15. Loading states + response timer
16. Quick query buttons
17. Bug fixes + demo rehearsal

---

## Decisions Made During Build

| # | Decision | Outcome | Date |
|---|----------|---------|------|
| 1 | Phase 0 demo from scratch | Confirmed | 2026-02-25 |
| 2 | AWS Bedrock only | Confirmed | 2026-02-25 |
| 3 | In-memory RAG (not Bedrock KBs) | Confirmed | 2026-02-25 |
| 4 | Synthesize docs (no real PDFs) | Confirmed | 2026-02-25 |
| 5 | AWS bootcamp audience | Confirmed | 2026-02-25 |

---

## Demo Day Checklist

- [ ] All P0 features working end-to-end
- [ ] Real Bedrock call succeeds live (not pre-recorded)
- [ ] Marco scenario: product comparison + persona switch
- [ ] Giulia scenario: compliance flag shown
- [ ] Evaluation dashboard populated
- [ ] Response time is visibly < 2 seconds
- [ ] No console errors in browser
- [ ] Demo script rehearsed at least once
- [ ] Backup screenshots ready if live demo fails
