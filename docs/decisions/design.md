# Design Decisions Log

> Living document — updated as design decisions are made during the build.
> Format: decision → rationale → status → date

---

## Design System Summary

| Token | Value | Usage |
|-------|-------|-------|
| Navy `#1B2B4B` | Primary brand | Headers, nav, primary actions |
| Navy Mid `#243660` | Hover states | Secondary nav, active states |
| Navy Lt `#EEF1F7` | Light backgrounds | Page backgrounds, info panels |
| Gold `#C8922A` | AI actions | Citations, AI indicator, highlights |
| Gold Pale `#FBF4E8` | AI backgrounds | Response cards, citation chips |
| Green `#2D5E40` | Positive/compliance | Success states, resolved flags |
| Green Pale `#EBF4EE` | Success backgrounds | Positive compliance cards |
| Red `#DC2626` | Warnings/flags | Compliance alerts, errors |
| Red Pale `#FEF2F2` | Warning backgrounds | Flag alert cards |
| White `#FFFDF9` | Warm white | Card backgrounds, content areas |

**Typography**:
- Display: `Fraunces` (serif, Google Fonts) — headers, titles
- Body: `DM Sans` (sans-serif, Google Fonts) — UI text, forms

**Reference files**:
- [finserve-components.html](../../context/finserve-components.html) — full component library
- [finserve-journey-map.html](../../context/finserve-journey-map.html) — UX journey reference

---

## Decision Log

### DD-001 — Three-view application structure
**Date**: 2026-02-25
**Decision**: Build three distinct views — Dashboard, AI Co-Pilot, Evaluation.
**Routes**:
- `/` — Dashboard (client queue + metrics overview)
- `/copilot?client=<id>` — AI Co-Pilot (query interface per client)
- `/evaluation` — Evaluation dashboard (PM metrics view)
**Rationale**: Maps directly to the three primary user journeys in the demo script. Keeps navigation simple for a demo context.
**Status**: FINAL

---

### DD-002 — Gold as the AI identity color
**Date**: 2026-02-25
**Decision**: Gold (#C8922A) is exclusively used for AI-generated content and actions.
**Applies to**:
- AI response cards
- Citation chips/badges
- "AI Co-Pilot" label and indicator
- Thinking/loading states
**Rationale**: Creates clear visual distinction between RM-authored content and AI-generated content. Builds trust through transparency.
**Status**: FINAL

---

### DD-003 — Compliance flag visual treatment
**Date**: 2026-02-25
**Decision**: Compliance warnings use Red (#DC2626) with a prominent banner above the AI response, not inline.
**Pattern**:
1. Red alert banner with ⚠️ icon appears above the response
2. Clause references called out explicitly (§9.4, §22.1)
3. "Escalate to compliance team" CTA button
4. The AI response below explains the conflict in detail
**Rationale**: Compliance flags need to be impossible to miss during a live client call. Separating the flag from the response content ensures it's seen first.
**Status**: FINAL

---

### DD-004 — Citation chip pattern
**Date**: 2026-02-25
**Decision**: Citations are rendered as gold pill badges (§ reference + section name) at the bottom of each AI response.
**Format**: `§ 12.3 — Esclusioni` as a clickable pill
**Behavior for demo**: Chips are non-functional (no modal/popover) — just visual. Can be upgraded post-demo.
**Rationale**: Provides the RM with confidence and auditability. The gold color reinforces the AI identity color.
**Status**: FINAL

---

### DD-005 — Persona selector as dropdown in Co-Pilot header
**Date**: 2026-02-25
**Decision**: Persona selection is a dropdown in the Co-Pilot page header, not a separate settings screen.
**Options**: Experienced RM | New RM | Specialist RM
**Behavior**: Changing persona changes the next response style (doesn't re-generate previous responses)
**Rationale**: RMs need to change persona mid-session as they switch between client types. In-context placement reduces friction.
**Status**: FINAL

---

### DD-006 — Client context strip in Co-Pilot
**Date**: 2026-02-25
**Decision**: A non-interactive client context strip at the top of the Co-Pilot shows: name, age, risk profile, policy scenario.
**Demo clients**:
- **Marco Bianchi** — 45 anni, profilo rischio medio, nuova polizza
- **Giulia Ferraro** — 38 anni, profilo rischio basso, sinistro in corso ⚠️
- **Luca Romano** — 52 anni, profilo rischio alto, rinnovo polizza
**Status**: FINAL

---

### DD-007 — Quick query buttons for demo flow control
**Date**: 2026-02-25
**Decision**: Include 3 quick-query buttons below the empty state to drive the demo narrative:
- "Compare Products" — triggers product comparison response
- "Edge Case" — triggers year-2 exclusion response
- "Compliance Check" — triggers conflicting clause response (only active for Giulia Ferraro)
**Rationale**: Ensures demo presenter can reliably hit the right scenarios without typing during a live demo.
**Status**: FINAL

---

### DD-008 — Thumbs up/down feedback on responses
**Date**: 2026-02-25
**Decision**: Each AI response includes thumbs up/down buttons. For demo, these update local state only (no API call, just visual confirmation).
**Rationale**: Demonstrates the feedback loop concept for the Evaluation dashboard without requiring a database.
**Status**: FINAL (demo scope; post-demo should persist to DB)

---

### DD-009 — Loading state during Bedrock calls
**Date**: 2026-02-25
**Decision**: Show a pulsing AI thinking state (animated dots + "FinServe AI is thinking...") while waiting for Bedrock response.
**Timing display**: Show elapsed time in real-time during loading; show final response time (e.g., "1.8s") after response arrives.
**Rationale**: The <2s response time is a key selling point. The timer makes it viscerally real for the audience.
**Status**: FINAL

---

---

### DD-010 — Dual-portal architecture: Customer + RM experiences
**Date**: 2026-02-25
**Decision**: Two distinct user-facing experiences from a shared landing page.

| Portal | Route | Audience | Flows |
|--------|-------|----------|-------|
| Landing | `/` | All | Portal selector |
| RM Workspace | `/rm` `/copilot` `/evaluation` | Sofia (RM) | AI Co-Pilot, evaluation |
| Customer Portal | `/customer` `/customer/products` `/customer/checkout` | Marco (customer) | Browse, compare, purchase |

**Rationale**: Tells a richer end-to-end story for the bootcamp demo — showing both the RM's AI-assisted side and the customer self-service side of the same product ecosystem.
**Status**: FINAL

---

## Open Design Questions

- [ ] Dark mode? (Deferred — not needed for demo)
- [ ] Mobile responsive? (Nice to have — P1 for demo)
- [ ] Should citation chips open a modal showing the source text? (Post-demo)
- [ ] Session history sidebar — include or defer? (Defer for demo)
- [ ] FinServe logo asset — do we have one, or should we generate text-based?
