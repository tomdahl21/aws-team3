# User Context & Decisions Log

> Living document — captures user research insights, persona decisions, and UX choices as we build.

---

## Primary User: Sofia Ferrari (Relationship Manager)

### Profile
- **Role**: Experienced insurance Relationship Manager
- **Experience**: 5+ years
- **Language**: Italian (primary)
- **Context**: Desktop workspace, 10-15 client sessions/day
- **Tech comfort**: High

### Core Job to Be Done
> "When I'm on a live call with a client who has a product question, I need to get the right answer instantly — with the citation to back it up — so I don't have to put them on hold or risk giving wrong information."

### Key Pain Points (ranked)
1. **10-15 min manual search** — biggest blocker, directly causes hold times
2. **Compliance risk** — easy to mis-cite conflicting clauses under pressure
3. **Edge cases** — rare scenarios aren't well-indexed, require specialist calls
4. **Context fragmentation** — juggling multiple documents while talking

### Success Looks Like
- Ask a question in natural language, get a structured answer with citations in <2 seconds
- Never have to put a client on hold for a product query
- Feel confident quoting information because there's a §-reference attached
- Spot compliance conflicts before they become client complaints

---

## Demo Personas (3)

These are **AI response style personas**, not user personas. They represent the different "modes" an RM can choose based on their experience level.

### Experienced RM
**System prompt style**: Concise, technical, assumes product knowledge.
**Response characteristics**:
- Short (2-4 sentences per point)
- Uses insurance jargon freely
- Leads with recommendation, supports with data
- Cites §-references inline
- Italian language

**Demo trigger**: Default selection when opening Co-Pilot

---

### New RM
**System prompt style**: Detailed, explanatory, step-by-step.
**Response characteristics**:
- Structured bullet points
- Defines terms when used
- Explicit action steps ("Cosa fare ora:")
- More citations for credibility
- Italian language

**Demo trigger**: Switch persona mid-demo to show contrast with Experienced RM response

---

### Specialist RM
**System prompt style**: Maximum technical depth, edge cases, regulatory context.
**Response characteristics**:
- Full clause text quoted
- Regulatory cross-references
- Historical context if relevant
- Flagging of all exceptions
- Italian language

**Demo trigger**: Optional / P2 for demo day

---

## Demo Client Scenarios

### Client 1: Marco Bianchi
**Profile**: 45 anni, profilo rischio medio
**Scenario**: Considering new policy purchase — comparing Prodotto A vs Prodotto B
**Key demo moment**: Instant product comparison with pricing and exclusions called out
**Persona to show**: Experienced RM (concise), then switch to New RM (detailed) to show contrast
**Compliance flags**: None — clean comparison scenario

---

### Client 2: Giulia Ferraro
**Profile**: 38 anni, profilo rischio basso
**Scenario**: Active claims dispute — client challenging reimbursement timeline
**Key demo moment**: AI detects conflicting clauses (§9.4 vs §22.1) and surfaces compliance flag
**Persona to show**: New RM (detailed guidance for navigating conflict)
**Compliance flags**: YES — §9.4 (30 days) vs §22.1 (60 days for claims >€10,000)

---

### Client 3: Luca Romano
**Profile**: 52 anni, profilo rischio alto
**Scenario**: Policy renewal consultation
**Key demo moment**: P2 — only include if time permits
**Compliance flags**: None

---

## User Journey (Demo Script)

```
1. Dashboard                    ~30 seconds
   └─ Show metrics (148 queries, 1.8s, 96.4%, 4.7/5)
   └─ Show client queue (Marco = Active, Giulia = Flagged ⚠️)

2. AI Co-Pilot — Marco Bianchi  ~2 minutes
   └─ Default: Experienced RM persona
   └─ Click "Compare Products" quick query
   └─ Show instant Italian response with citations
   └─ Switch to New RM persona, show same query = detailed response
   └─ Thumbs up to rate

3. AI Co-Pilot — Giulia Ferraro  ~1.5 minutes
   └─ Switch to Giulia (Flagged client)
   └─ Click "Compliance Check" quick query
   └─ Show ⚠️ compliance flag banner
   └─ Show conflicting clauses explained in Italian
   └─ Show escalation option

4. Evaluation Dashboard          ~1 minute
   └─ Show accuracy, response time, satisfaction metrics
   └─ Show query type breakdown (product comparisons 40%)
   └─ Show persona performance comparison
   └─ Show compliance insights (8 flagged, 6 resolved)

5. Q&A                           ~5 minutes
```

---

## UX Decisions

### UD-001 — Italian language responses (not Italian UI)
**Decision**: AI responses are in Italian. UI labels are in English.
**Rationale**: Matches real-world usage — Italian RMs, English product management team evaluating the tool. Shows language capability without complicating UI strings.
**Status**: FINAL

### UD-002 — Client queue as primary entry point
**Decision**: RMs start from the client queue on the dashboard, not from a query box.
**Rationale**: Establishes client context before querying. Matches real workflow — RM always has a client session open.
**Status**: FINAL

### UD-003 — Response timing displayed on every response
**Decision**: Show actual response time (e.g., "1.8s") on each AI response card.
**Rationale**: Response speed is a core value prop — make it visible and real. For the demo, seeing an actual elapsed time from a real Bedrock call is more impressive than a hardcoded "1.8s".
**Status**: FINAL

---

## Open User Questions

- [ ] Do RMs ever need to search across all clients (not just current session)?
- [ ] Is session note-taking in scope for demo? (Current decision: no)
- [ ] Should query history be visible in the Co-Pilot? (Current decision: no, defer)
- [ ] How should the RM escalate a compliance flag in practice? (Email? CRM ticket?)
