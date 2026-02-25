# Project Overview

## FinServe Analytics - Insurance Product Support

### Current Phase: Demo Build
**Timeline**: 2 days
**Decision Date**: 2026-02-25

---

## Quick Reference

### Team
- **Developers**: 2 (names TBD)
- **Designer**: 1 (name TBD)
- **Agile PM**: 1 (name TBD)

### Tech Stack (Demo Phase)
- **Frontend**: Next.js 14+ with TypeScript
- **Styling**: CSS Modules (custom design system)
- **Data**: Mocked JSON files
- **Backend**: Mocked API responses
- **AI/RAG**: Deferred - using pre-written responses

### Demo Scope
**Priority Features**:
1. ✅ Evaluation/matching dashboard
2. ✅ AI Co-Pilot interface (name TBD)
3. ✅ Persona-based responses (2-3 personas)
4. ✅ Multi-lingual support (Italian)

**Explicitly Out of Scope**:
- ❌ Real LLM integration
- ❌ Vector database
- ❌ Document processing
- ❌ Real authentication
- ❌ Backend infrastructure
- ❌ Deployment/hosting

---

## Key Decisions

### What We're Building
An AI-powered co-pilot for insurance Relationship Managers to instantly retrieve product information during client calls.

### Why We're Building It
- **Time Savings**: Reduce 10-15 min manual searches to <2 seconds
- **Compliance**: Auto-flag conflicting clauses
- **Customer Experience**: No more hold times during calls

### How We're Building It (Demo)
- Mock everything that requires infrastructure
- Focus on UI/UX and user flow
- Use static data to demonstrate value
- Validate concept before investing in backend

---

## Demo User Flows

### Flow 1: Product Comparison Query
1. RM logs in (mocked SSO)
2. Selects "Experienced RM" persona
3. Opens client session (Marco Bianchi)
4. Types query: "Compare Prodotto A vs B for 45y medium risk"
5. Receives instant response with citations
6. Rates response (thumbs up/down)

### Flow 2: Compliance Flag Scenario
1. RM queries reimbursement conditions
2. System detects conflicting clauses
3. Compliance flag displayed prominently
4. Side-by-side clause comparison shown
5. Escalation option available

### Flow 3: Evaluation Dashboard
1. PM views accuracy metrics
2. Sees query patterns
3. Reviews user satisfaction scores
4. Identifies improvement areas

---

## Mock Data Requirements

### Personas (2-3)
- **Experienced RM**: Concise, technical responses
- **New RM**: Detailed, explanatory responses
- **(Optional) Specialist RM**: Deep technical detail

### Sample Queries & Responses
- Product comparisons (Prodotto A vs B)
- Coverage questions (partial disability exclusions)
- Claims disputes (conflicting clauses)
- Edge cases (year 2+ coverage changes)

### Sample Clients
- Marco Bianchi (new purchase scenario)
- Giulia Ferraro (dispute scenario)

### Sample Metrics
- 148 queries today
- 1.8s avg response time
- 96.4% accuracy rate
- 4.7/5 satisfaction score

---

## Design System Reference
All components and styling based on:
- `context/finserve-components.html`
- `context/finserve-journey-map.html`

**Color Palette**:
- Navy (#1B2B4B) - Primary
- Gold (#C8922A) - AI actions
- Green (#2D5E40) - Success/compliance
- Red (#DC2626) - Warnings/flags

---

## Deferred Decisions

### To Be Decided Later
- [ ] LLM provider (OpenAI/Anthropic/Bedrock)
- [ ] Vector database (Pinecone/Weaviate/Chroma)
- [ ] Document processing pipeline
- [ ] Real authentication system
- [ ] Cloud infrastructure
- [ ] API architecture
- [ ] Final name for "AI Co-Pilot"

### Blocked By
- [ ] Sample insurance documents (700-1000 pages)
- [ ] Document processing APIs
- [ ] Chat management APIs
- [ ] Budget approval for LLM costs

---

## Success Criteria for Demo

### Must Have
- [ ] Working UI that matches design system
- [ ] 2-3 persona response styles demonstrated
- [ ] Italian language responses shown
- [ ] Compliance flag scenario working
- [ ] Evaluation dashboard with metrics
- [ ] Smooth user flow (no broken states)

### Nice to Have
- [ ] Mobile responsive view
- [ ] Query history
- [ ] Session notes
- [ ] Multiple client scenarios

---

## Next Steps After Demo

1. **Stakeholder Review**: Present demo to decision makers
2. **Feedback Collection**: Gather input on UX and features
3. **Technical Planning**: Decide on LLM provider and infrastructure
4. **Budget Approval**: Get funding for API costs
5. **Document Preparation**: Digitize insurance product library
6. **Team Expansion**: Hire additional resources if needed

---

## Document Structure

```
docs/
├── 00-project-overview.md (this file)
├── 01-design-decisions.md
├── 02-technical-decisions.md
├── 03-user-research.md
├── 04-business-requirements.md
└── 05-backlog-planning.md

context/
├── finserve-components.html
├── finserve-journey-map.html
├── PRD_Insurance_Product_Support_MLP.pdf
└── PIA Bootcamp - Discovery Readout Template.pdf
```

---

## Contact & Questions
- **Project Lead**: TBD
- **Tech Lead**: TBD
- **Design Lead**: TBD
- **Product Owner**: TBD

