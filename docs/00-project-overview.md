# Project Overview

## FinServe Analytics - Pension Management Support Platform

### Executive Summary

**What**: AI-powered co-pilot for Financial Advisors and Relationship Managers to provide instant, personalized pension guidance during live client calls.

**Why**: California pension policy changes are causing concern among near-retirement public sector employees. New RMs need AI support to confidently answer complex pension questions and explain policy impacts.

**Who**: 
- **Primary User**: Sophia (New RM managing Orange County Police pension account)
- **Client**: Billy (Police Officer, 15 years service, 2 years from retirement)

**When**: Demo-ready implementation (flexible timeline)

**How**: Amazon Bedrock (Claude + Titan embeddings) for RAG-based pension policy retrieval with client-specific context injection.

---

### Problem Statement

**Current State**:
- New RMs lack confidence answering complex pension questions
- Client information lookup takes 2-3 minutes during calls
- Policy changes cause client anxiety and confusion
- Manual research takes 10+ minutes, clients wait on hold
- Difficult to identify which clients are affected by policy changes

**Impact**:
- Poor client experience (long hold times)
- RM stress and lack of confidence
- Missed opportunities for proactive outreach
- Potential for incorrect pension advice

**Desired State**:
- Client profile auto-loads when call is recognized (<1 second)
- AI provides personalized pension answers in <2 seconds
- Policy changes surfaced in dashboard with affected clients flagged
- New RMs confidently handle complex pension questions
- Proactive client outreach enabled

---

### Solution Overview

#### Core Features
1. **Client Profile Auto-Load (Mocked)**
   - Mock service connects phone number to client account
   - Auto-populate pension details: years of service, retirement timeline, sick/vacation balances
   - Display in dashboard during call

2. **AI Co-Pilot**
   - Natural language pension queries
   - Context-aware responses (knows Billy's specific situation)
   - <2 second response time
   - Citations to California pension regulations

3. **Policy Change Tracking (Mocked)**
   - Surface recent California pension policy changes
   - Flag affected clients (e.g., near-retirement like Billy)
   - Policy change summaries in dashboard

4. **RAG System**
   - Amazon Bedrock (Claude + Titan embeddings)
   - Vector search across California pension documents
   - Client-specific context injection
   - Top-K retrieval with cosine similarity

---

### Key Personas

#### Sophia - New Relationship Manager
- **Experience**: <1 year in pension management
- **Account**: Orange County Police Department
- **Needs**: Confidence, clear guidance, citation support
- **Pain Points**: Knowledge gap, policy change tracking, client context lookup

#### Billy - Police Officer Client
- **Service**: 15 years with Orange County Police
- **Retirement**: 2 years away
- **Concern**: California pension policy changes affecting sick/vacation days
- **Needs**: Clear answers, personalized impact analysis, retirement confidence

---

### Triggering Event

**California Pension Policy Change**: California announced changes to sick/vacation day conversion rules for public sector pensions, causing concern among near-retirement employees like Billy.

**Billy's Concern**: "How do the new sick day rules affect my retirement? I've been planning to retire in 2 years."

**Sophia's Challenge**: As a new RM, she needs AI support to:
1. Quickly access Billy's pension details
2. Understand the policy changes
3. Explain personalized impact to Billy
4. Provide citations for credibility

---

### Technical Architecture

#### Frontend
- **Framework**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **State**: React Context API
- **Language**: English only (no multi-language support)

#### Backend (Mocked for Demo)
- **Client Data Service**: Mock phone number → account mapping
- **Call Integration**: Mock call recognition system
- **Policy Change Ingestion**: Mock California pension updates

#### AI/ML
- **LLM**: Claude 3 Haiku via Amazon Bedrock (fastest, <2s target)
- **Embeddings**: Amazon Titan Embed Text v2 (512 dimensions)
- **RAG**: In-memory vector store with cosine similarity
- **Context**: Client-specific information injected into prompts

#### Data Sources
- California pension regulations (CalPERS documents)
- Orange County Police pension plan documents
- Sick/vacation day conversion policies
- Retirement eligibility rules

---

### Success Metrics

#### Performance
- Client profile load time: <1 second
- AI query response time: <2 seconds
- Accuracy rate: >95%

#### User Experience
- RM satisfaction: >4.5/5.0
- RM confidence: Improved (qualitative)
- Escalation reduction: Fewer escalations to senior advisors

#### Business Impact
- Call duration: Reduced by 50% (from 20+ min to 10 min)
- Client satisfaction: Improved (qualitative)
- Proactive outreach: Enabled by policy change tracking

---

### Scope

#### In Scope (Demo)
- Client profile auto-load (mocked service)
- AI Co-Pilot with pension policy queries
- RAG system with California pension documents
- Policy change dashboard (mocked updates)
- Desktop web application
- English language only

#### Out of Scope (Future)
- Real call system integration
- Real-time policy document ingestion
- Agent-curated document processing
- Client-facing portal
- Financial planning calculators
- Mobile app
- Multi-language support

---

### Key Decisions

#### Business Decisions
- **Industry**: Financial Advisory & Pension Management (changed from Insurance)
- **Geography**: California, Orange County focus
- **Client Base**: Public sector employees (police, fire, government)
- **Language**: English only (removed Italian/multi-language)

#### User Decisions
- **Primary Persona**: Sophia (New RM) - changed from Sofia Ferrari (Experienced RM)
- **Client Persona**: Billy (Police Officer) - new persona
- **Removed Personas**: Experienced RM, Specialist RM, multi-persona support

#### Technical Decisions
- **Mock Services**: Client data service, call integration, policy change ingestion
- **No Phone Recognition**: Removed automatic phone number recognition (mocked instead)
- **Desktop-First**: Mobile deferred to future phases

#### Feature Decisions
- **Removed**: Multi-language support, insurance products, compliance disputes
- **Added**: Client profile auto-load, policy change tracking, sick/vacation day focus
- **Future**: Agent-curated documents, real call integration, proactive outreach

---

### Timeline & Milestones

**Status**: Demo-ready implementation (flexible timeline)

**Phase 1: Demo (Current)**
- Client profile auto-load (mocked)
- AI Co-Pilot with pension queries
- Policy change dashboard (mocked)
- Desktop web application

**Phase 2: Real Integration (Future)**
- Real call system integration
- Automatic phone number recognition
- Real-time policy document ingestion

**Phase 3: Agent-Curated (Future)**
- AI agents extract policy changes from documents
- Automatic knowledge base updates
- Proactive client impact analysis

**Phase 4: Multi-Department (Future)**
- Expand beyond Orange County Police
- Fire department, teachers, city employees
- Cross-department policy comparison

---

### Risks & Mitigation

#### High Priority Risks
- **AI provides incorrect pension advice**: Mitigate with citation requirements, user feedback, accuracy monitoring
- **Client data service fails**: Mitigate with robust error handling, manual fallback
- **Policy change detection misses updates**: Mitigate with manual review, agent-curated future state

#### Medium Priority Risks
- **Response time exceeds 2 seconds**: Mitigate with performance optimization, caching
- **New RMs don't trust AI responses**: Mitigate with training, citation transparency

---

### Dependencies

#### External
- Amazon Bedrock access (Claude + Titan)
- California pension regulation documents
- Orange County Police pension plan documents

#### Internal
- Mock client data service design
- Mock call integration design
- Design system finalization
- Tech stack decisions

---

### Stakeholders

#### Primary
- **Sophia (RM)**: End user, daily system usage
- **Billy (Client)**: Indirect beneficiary, better service
- **Product Management**: Feature prioritization
- **Engineering**: System development

#### Secondary
- **Compliance**: Regulatory adherence
- **Training**: RM onboarding
- **Executive Leadership**: Budget and strategy

---

## Document Change Log

| Date | Change | Reason |
|------|--------|--------|
| 2026-02-25 | Initial creation | Project kickoff |
| 2026-02-25 | Major pivot to pension management | Business direction change |
| 2026-02-25 | Updated personas (Sophia, Billy) | New user focus |
| 2026-02-25 | Removed multi-language support | English only |
| 2026-02-25 | Added client profile auto-load | Core feature |
| 2026-02-25 | Added policy change tracking | Core feature |
