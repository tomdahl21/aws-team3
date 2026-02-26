# Business Requirements

## Project: FinServe Analytics - Pension Management Support Platform

### Executive Summary

**Project Goal**: Build an AI-powered co-pilot for Financial Advisors and Relationship Managers (RMs) to instantly retrieve client pension information and answer complex policy questions during live calls, enabling personalized guidance on California pension regulations and policy changes.

**Business Value**:
- **Client Experience**: Instant, personalized answers during calls (no hold time)
- **Policy Awareness**: Proactive identification of clients affected by regulatory changes
- **RM Confidence**: New RMs can handle complex pension questions with AI support
- **Compliance**: Accurate citations to California pension regulations

---

### Business Context

**Industry**: Financial Advisory & Pension Management  
**Geography**: California (Orange County focus)  
**Client Base**: Public sector employees (police, fire, government workers)  
**Current Challenge**: RMs need instant access to client pension details and California policy changes during live calls

**Triggering Event**: California announced pension policy changes affecting sick/vacation day conversion rules, causing concern among near-retirement public sector employees.

---

### Target Users

#### Primary: Sophia (Relationship Manager)
- **Role**: New RM managing Orange County Police pension account
- **Experience**: <1 year in pension management
- **Responsibilities**: 
  - Answer client questions about pension benefits
  - Explain policy changes and their impact
  - Manage relationships with public sector clients
- **Tech Comfort**: Moderate - needs intuitive tools
- **Language**: English
- **Needs**: 
  - Quick access to client information during calls
  - Clear explanations of complex pension policies
  - Guidance on how policy changes affect specific clients
  - Confidence when answering retirement planning questions

#### Secondary: Billy (Client - Police Officer)
- **Role**: Orange County Police Officer
- **Service**: 15 years with Orange County Police Department
- **Retirement**: 2 years away from retirement eligibility
- **Age**: ~45-50 years old
- **Concern**: Recent California pension policy changes affecting sick/vacation days
- **Needs**:
  - Clear answers about how policy changes affect his retirement
  - Understanding of sick/vacation day conversion rules
  - Confidence in his retirement planning

---

### Business Objectives

#### Primary Objectives
1. **Enable Client Recognition**: Auto-load client profile when call is initiated (mocked service)
2. **Instant Policy Answers**: Provide pension policy responses in < 2 seconds
3. **Personalized Guidance**: Context-aware responses based on client's specific situation
4. **Policy Change Awareness**: Surface recent California pension changes affecting clients

#### Secondary Objectives
1. **Empower New RMs**: Enable new advisors to handle complex pension questions confidently
2. **Proactive Outreach**: Identify clients affected by policy changes
3. **Build Knowledge Base**: Centralize California pension regulations and client data
4. **Audit Trail**: Complete query history for compliance

---

### Success Metrics

#### Quantitative KPIs
| Metric | Baseline | Target | Measurement |
|--------|----------|--------|-------------|
| Client Profile Load Time | Manual lookup | < 1 sec | System logs |
| Query Response Time | N/A | < 2 sec | System logs |
| Accuracy Rate | N/A | > 95% | User feedback |
| Policy Change Awareness | Manual | Auto-flagged | System detection |
| RM Satisfaction | N/A | > 4.5/5 | In-app ratings |

#### Qualitative KPIs
- RM confidence in handling policy change questions
- Client satisfaction with call experience
- Reduction in escalations to senior advisors
- Improved new RM onboarding experience

---

### Functional Requirements

#### Must Have (MLP)
1. **Client Profile Auto-Load (Mocked)**
   - Mock service connects phone number to client account
   - Auto-populate client information on call initiation:
     - Name, department, years of service
     - Retirement eligibility timeline
     - Current sick/vacation day balances
     - Pension plan details
   - Display in dashboard during call

2. **AI Co-Pilot Interface**
   - Text input for pension queries
   - Context-aware responses (knows Billy's situation)
   - Structured response display
   - Citation links to policy documents
   - Response time <2 seconds

3. **RAG System**
   - Amazon Bedrock integration (Claude + Titan embeddings)
   - Vector search across pension policy documents
   - California pension regulation documents
   - Client-specific context injection
   - Top-K retrieval (4 chunks)
   - Cosine similarity ranking

4. **Policy Change Tracking (Mocked for Demo)**
   - Surface recent California pension policy changes
   - Highlight changes affecting sick/vacation days
   - Flag affected clients (e.g., near-retirement like Billy)
   - Policy change summaries in dashboard

5. **Dashboard**
   - Active client queue (public sector accounts)
   - Current call: Client profile display
   - Session metrics (queries, response time, satisfaction)
   - Policy change alerts

6. **Document Knowledge Base**
   - California pension regulations
   - Orange County Police pension plan documents
   - Sick/vacation day conversion policies
   - Retirement eligibility rules

#### Should Have (Post-MLP)
1. **Real Phone Integration**
   - Actual call system integration (not mocked)
   - Automatic phone number recognition
   - Call recording and transcription

2. **Agent-Curated Document Processing**
   - AI agents extract information from policy documents
   - Automatic knowledge base updates
   - Policy change detection and summarization

3. **Session Context Threading**
   - Maintain conversation history across calls
   - Reference previous Billy conversations

4. **Proactive Client Outreach**
   - Auto-identify clients affected by policy changes
   - Generate personalized impact summaries
   - Suggested talking points for RMs

5. **Multi-Account Support**
   - Expand beyond Orange County Police
   - Fire department, city employees, teachers
   - Cross-department policy comparison

#### Won't Have (Out of Scope)
1. Real call system integration (mocked for demo)
2. Real-time policy document ingestion (mocked for demo)
3. Client-facing portal (RM-only tool for now)
4. Financial planning calculators
5. Investment advice or portfolio management
6. Payment/billing integration
7. Mobile app (desktop-first)
8. Integration with existing pension management systems (standalone for MLP)
9. Multi-language support (English only)

---

### Core Use Cases

#### 1. Client Call with Policy Change Concern
**Actor**: Sophia (New RM managing Orange County Police account)  
**Client**: Billy (Police Officer, 15 years service, 2 years from retirement)  
**Trigger**: Billy calls concerned about California pension policy changes affecting sick/vacation days

**Flow**:
1. Billy calls Sophia about recent California pension policy changes
2. System recognizes call and auto-loads Billy's profile (mocked service)
   - 15 years of service
   - 2 years from retirement
   - Orange County Police Department
   - Current sick/vacation day balances
3. Sophia sees Billy's information in dashboard
4. Sophia asks AI Co-Pilot: "How do the new California pension changes affect Billy's sick and vacation days?"
5. AI retrieves relevant policy documents and Billy's specific situation
6. AI generates personalized response in <2s with citations
7. Sophia explains impact to Billy during call

**Success Criteria**:
- Client profile auto-loads on call initiation (mocked)
- Response time <2s
- Personalized to Billy's specific situation (years of service, retirement timeline)
- Citations to California pension policy changes
- Clear explanation of sick/vacation day impact

#### 2. Policy Change Awareness
**Actor**: Sophia (RM)  
**Trigger**: California announces pension policy changes

**Flow**:
1. New California pension policy published (sick/vacation day rules)
2. System ingests policy documents (future: agent-curated from documents)
3. AI identifies affected clients (e.g., Billy - 2 years from retirement)
4. Dashboard surfaces policy change summary
5. RM proactively reaches out to affected clients

**Success Criteria**:
- Policy changes surfaced in dashboard
- Affected clients flagged
- Clear summary of changes

---

### User Stories

#### Epic 1: Client Profile & Call Context
```
As Sophia (RM)
I want Billy's pension information to auto-load when he calls
So that I can provide personalized guidance without asking him to repeat information

Acceptance Criteria:
- Client profile loads in < 1 second (mocked service)
- Displays: name, years of service, retirement timeline, sick/vacation balances
- Profile visible in dashboard during call
- Mock service connects phone number to account data
```

#### Epic 2: AI Query & Response
```
As Sophia (RM)
I want to ask pension policy questions in natural language
So that I can get instant, personalized answers for Billy during our call

Acceptance Criteria:
- Query response time < 2 seconds
- Responses include Billy's specific context (years of service, retirement date)
- Citations to California pension regulations
- Clear explanation of sick/vacation day policy changes
```

#### Epic 3: Policy Change Awareness
```
As Sophia (RM)
I want to see recent California pension policy changes in my dashboard
So that I can proactively reach out to affected clients like Billy

Acceptance Criteria:
- Policy changes surfaced in dashboard (mocked for demo)
- Affected clients flagged (e.g., near-retirement)
- Summary of changes with impact analysis
- Links to full policy documents
```

---

### Business Rules

#### Client Data Handling
1. Client profiles auto-load via mocked phone number service
2. All client data displayed must be current and accurate
3. Client information visible only to assigned RM
4. Audit trail of all client profile accesses

#### Query Handling
1. All queries must include client context when available
2. Responses must include at least one citation to policy documents
3. Personalized responses based on client's years of service and retirement timeline
4. Policy change impacts must be clearly explained

#### Policy Change Tracking
1. Recent California pension changes surfaced in dashboard (mocked)
2. Affected clients automatically flagged
3. Policy change summaries include effective dates
4. Links to full regulatory documents provided

---

### Constraints & Assumptions

#### Constraints
1. **Timeline**: Demo-ready implementation (flexible timeline)
2. **Infrastructure**: Must use Amazon Bedrock (Claude + Titan)
3. **Language**: English only (no multi-language support)
4. **Integration**: Mocked call system and client data service

#### Assumptions
1. RMs have reliable internet connectivity
2. Pension policy documents are available in digital format
3. Desktop is primary usage context
4. Client data can be mocked realistically for demo
5. California pension regulations are publicly available
6. Phone number to account mapping can be mocked

---

### Risks & Mitigation

#### High Priority Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| AI provides incorrect pension advice | High | Medium | Citation requirement, user feedback, accuracy monitoring |
| Client data service fails | High | Low | Robust error handling, manual fallback |
| Policy change detection misses updates | Medium | Medium | Manual review process, agent-curated future state |

#### Medium Priority Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Response time exceeds 2 seconds | Medium | Medium | Performance optimization, caching |
| New RMs don't trust AI responses | Medium | Low | Training program, citation transparency |

---

### Stakeholders

#### Primary Stakeholders
- **RMs (End Users)**: Daily users of the system (Sophia)
- **Clients**: Public sector employees seeking pension guidance (Billy)
- **Product Management**: Defines features and priorities
- **IT/Engineering**: Builds and maintains system

#### Secondary Stakeholders
- **Compliance Team**: Ensures regulatory adherence
- **Training Team**: Uses system for RM onboarding
- **Executive Leadership**: Approves budget and strategy

---

### Dependencies

#### External Dependencies
- [ ] Amazon Bedrock access (Claude + Titan embeddings)
- [ ] California pension regulation documents
- [ ] Orange County Police pension plan documents

#### Internal Dependencies
- [ ] Mock client data service design
- [ ] Mock call integration design
- [ ] Design system finalization
- [ ] Tech stack decisions

---

### Future Enhancements (Post-Demo)

1. **Real Call Integration**: Actual phone system integration with automatic client recognition
2. **Agent-Curated Documents**: AI agents extract and summarize policy changes from documents
3. **Multi-Department Support**: Expand beyond police to fire, teachers, city employees
4. **Proactive Outreach**: Auto-generate personalized impact summaries for affected clients
5. **Financial Planning Tools**: Retirement calculators, benefit projections
6. **Mobile App**: On-the-go access for RMs

---

## Open Business Questions
- [ ] What other public sector departments should we support after Orange County Police?
- [ ] What's the long-term product roadmap beyond MLP?
- [ ] Should we build client-facing portal in future phases?
- [ ] What's the pricing model if selling to other financial advisory firms?
- [ ] Are there competitive products we should analyze?
