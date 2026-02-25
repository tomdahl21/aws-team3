# Technical Decisions

## Project: FinServe Analytics - Insurance Product Support MLP

### Architecture Overview
**Status**: PENDING - Awaiting tech stack decisions

#### Proposed Architecture
```
┌─────────────────┐
│   Web Client    │ (React/Next.js?)
│   Mobile App    │ (React Native?)
└────────┬────────┘
         │
    ┌────▼─────┐
    │   API    │ (Node.js/Python?)
    │  Gateway │
    └────┬─────┘
         │
    ┌────▼──────────────────┐
    │  Backend Services     │
    ├───────────────────────┤
    │ • RAG Service         │
    │ • Auth Service        │
    │ • Document Processor  │
    │ • Evaluation Service  │
    └────┬──────────────────┘
         │
    ┌────▼──────────────────┐
    │   Data Layer          │
    ├───────────────────────┤
    │ • Vector DB           │
    │ • Relational DB       │
    │ • Document Store      │
    │ • Cache Layer         │
    └───────────────────────┘
```

---

### Technology Stack
**Status**: DECIDED - Demo Phase (2-day timeline)
**Decision Date**: 2026-02-25

#### Frontend (DECIDED)
- **Web**: Next.js 14+ (React 18+)
- **Language**: TypeScript
- **State Management**: React Context + Hooks (simple for demo)
- **Styling**: CSS Modules (matching design system from finserve-components.html)
- **UI Components**: Custom components based on design system

#### Backend (MOCKED FOR DEMO)
- **API**: Mock API with static JSON responses
- **Authentication**: Mocked SSO (hardcoded users)
- **Data**: Static mock data files

#### AI/ML Stack (MOCKED FOR DEMO)
- **LLM Provider**: DEFERRED - To be decided later
- **Vector Database**: DEFERRED - To be decided later
- **RAG Service**: Mocked with pre-written responses
- **Personas**: 2-3 hardcoded persona response styles

#### Infrastructure (NOT NEEDED FOR DEMO)
- **Hosting**: Local development only
- **Deployment**: Not required for initial demo
- **CI/CD**: Not required for initial demo
- **Monitoring**: Not required for initial demo

---

### RAG Implementation Strategy
**Status**: DEFERRED - Mocked for demo phase

#### Document Processing Pipeline
```
PDF/Word Docs → Text Extraction → Chunking → Embedding → Vector Store
                                      ↓
                              Metadata Tagging
                              (Section, Product, Language)
```

#### Key Requirements
1. **Chunking Strategy**: 
   - Preserve section context (§ references)
   - Maintain clause relationships
   - Handle multi-language content

2. **Metadata Schema**:
   ```json
   {
     "document_id": "string",
     "section": "string",  // e.g., "§ 12.3"
     "product": "string",  // e.g., "Prodotto A"
     "language": "string", // e.g., "it"
     "clause_type": "string", // e.g., "exclusion", "coverage"
     "effective_date": "date",
     "chunk_text": "string",
     "embedding": "vector"
   }
   ```

3. **Retrieval Strategy**:
   - Hybrid search (vector + keyword)
   - Re-ranking for relevance
   - Citation extraction
   - Conflict detection logic

4. **Response Generation**:
   - Persona-based prompting
   - Citation formatting
   - Compliance flag injection
   - Multi-turn context management

---

### Data Model
**Status**: DRAFT

#### Core Entities
```
User
├── id
├── name
├── role (RM type)
├── language_preference
└── settings

Client
├── id
├── name
├── policies[]
└── interaction_history[]

Query
├── id
├── user_id
├── client_id
├── query_text
├── response_text
├── citations[]
├── compliance_flags[]
├── timestamp
└── feedback (thumbs up/down)

Document
├── id
├── title
├── product
├── version
├── language
├── chunks[]
└── metadata

Session
├── id
├── user_id
├── client_id
├── queries[]
├── start_time
├── end_time
└── notes
```

---

### Performance Requirements
**Status**: DEFINED

#### Response Time Targets
- **RAG Retrieval**: < 2 seconds (target: 1.8s)
- **API Response**: < 500ms (excluding LLM)
- **Page Load**: < 3 seconds (initial)
- **Mobile App Launch**: < 2 seconds

#### Scalability Targets
- **Concurrent Users**: 100+ RMs
- **Queries per Day**: 10,000+
- **Document Library**: 700-1000 pages initially, growing
- **Vector Store**: Millions of embeddings

---

### Security & Compliance
**Status**: REQUIREMENTS DEFINED

#### Security Requirements
- [ ] End-to-end encryption for sensitive data
- [ ] Role-based access control (RBAC)
- [ ] Audit logging for all queries
- [ ] PII data handling compliance
- [ ] Secure document storage
- [ ] API rate limiting
- [ ] Input validation and sanitization

#### Compliance Requirements
- [ ] GDPR compliance (EU data protection)
- [ ] Financial services regulations
- [ ] Data retention policies
- [ ] Right to deletion
- [ ] Audit trail for compliance queries

---

### Development Workflow
**Status**: TO BE DEFINED

#### Branching Strategy
- TBD: Git Flow? Trunk-based? Feature branches?

#### Code Quality
- [ ] Linting rules
- [ ] Code formatting (Prettier?)
- [ ] Pre-commit hooks
- [ ] Code review process
- [ ] Testing requirements (unit, integration, e2e)

#### Deployment Strategy
- [ ] Environment setup (dev, staging, prod)
- [ ] Blue-green deployment?
- [ ] Canary releases?
- [ ] Rollback procedures

---

## Open Technical Questions
- [ ] What's the budget for LLM API calls?
- [ ] Do we need on-premise deployment option?
- [ ] Real-time collaboration features needed?
- [ ] Offline mode requirements?
- [ ] Multi-tenancy architecture needed?
- [ ] Disaster recovery requirements?

