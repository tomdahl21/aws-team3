# Demo Build Plan - 2 Day Sprint

## Timeline: 2 Days
**Goal**: Working demo with mocked data to validate concept

---

## Day 1: Foundation & Core UI

### Morning (4 hours)
**Developer 1**:
- [ ] Initialize Next.js project with TypeScript
- [ ] Set up project structure
- [ ] Create base layout components (header, sidebar, navigation)
- [ ] Implement design system CSS (colors, typography, spacing)

**Developer 2**:
- [ ] Create mock data files (personas, queries, responses, clients)
- [ ] Build mock API routes in Next.js
- [ ] Set up routing structure
- [ ] Create authentication mock (hardcoded users)

**Designer**:
- [ ] Finalize component specifications
- [ ] Create any missing UI assets
- [ ] Prepare copy for all screens
- [ ] Review design system implementation

**PM**:
- [ ] Finalize demo script
- [ ] Prepare stakeholder presentation
- [ ] Document user flows
- [ ] Set up demo environment checklist

### Afternoon (4 hours)
**Developer 1**:
- [ ] Build dashboard layout
- [ ] Create stat cards component
- [ ] Implement client queue list
- [ ] Add navigation between views

**Developer 2**:
- [ ] Build AI Co-Pilot chat interface
- [ ] Implement query input component
- [ ] Create response display with citations
- [ ] Add persona selector

**Designer**:
- [ ] QA component styling
- [ ] Adjust spacing and alignment
- [ ] Test responsive behavior
- [ ] Document any design tweaks

**PM**:
- [ ] Review progress with team
- [ ] Adjust scope if needed
- [ ] Prepare demo data scenarios
- [ ] Test user flows

---

## Day 2: Features & Polish

### Morning (4 hours)
**Developer 1**:
- [ ] Build evaluation dashboard
- [ ] Create metrics visualization
- [ ] Implement query history view
- [ ] Add feedback mechanism (thumbs up/down)

**Developer 2**:
- [ ] Implement persona-based responses
- [ ] Add compliance flag UI
- [ ] Create citation chips
- [ ] Build multi-turn conversation mock

**Designer**:
- [ ] Final UI polish
- [ ] Test all interactions
- [ ] Verify design consistency
- [ ] Create demo walkthrough guide

**PM**:
- [ ] Test all user flows
- [ ] Verify demo scenarios work
- [ ] Prepare presentation deck
- [ ] Document known limitations

### Afternoon (4 hours)
**Developer 1**:
- [ ] Bug fixes and polish
- [ ] Add loading states
- [ ] Implement error states
- [ ] Performance optimization

**Developer 2**:
- [ ] Italian language responses
- [ ] Edge case handling
- [ ] Smooth transitions
- [ ] Final integration testing

**Designer**:
- [ ] Final QA pass
- [ ] Screenshot key screens
- [ ] Document component usage
- [ ] Prepare design handoff notes

**PM**:
- [ ] Full demo rehearsal
- [ ] Finalize presentation
- [ ] Prepare Q&A responses
- [ ] Set up demo environment

---

## Priority Features (Must Have)

### P0 - Critical for Demo
1. **Dashboard View**
   - Stat cards (queries, response time, accuracy, satisfaction)
   - Client queue list
   - Navigation to AI Co-Pilot

2. **AI Co-Pilot Interface**
   - Query input field
   - Response display with citations
   - Persona selector (2-3 options)
   - Feedback buttons (thumbs up/down)

3. **Compliance Flag Scenario**
   - Conflicting clause detection
   - Warning display
   - Side-by-side comparison

4. **Evaluation Dashboard**
   - Accuracy metrics
   - Query patterns
   - User satisfaction scores

### P1 - Nice to Have
- Query history view
- Session notes
- Multiple client scenarios
- Mobile responsive view

### P2 - Future
- Real-time updates
- Advanced analytics
- Export functionality
- Settings panel

---

## Mock Data Structure

### Personas
```json
{
  "experienced": {
    "name": "Experienced RM",
    "style": "concise",
    "language": "technical"
  },
  "new": {
    "name": "New RM",
    "style": "detailed",
    "language": "explanatory"
  }
}
```

### Sample Query/Response
```json
{
  "query": "Compare Prodotto A vs B for 45y medium risk",
  "response": "Prodotto A esclude l'invalidità parziale...",
  "citations": ["§ 12.3 — Esclusioni", "§ 14.1 — Copertura"],
  "complianceFlags": [],
  "responseTime": "1.8s",
  "persona": "experienced"
}
```

### Clients
```json
{
  "clients": [
    {
      "id": "1",
      "name": "Marco Bianchi",
      "scenario": "new_purchase",
      "status": "active"
    },
    {
      "id": "2",
      "name": "Giulia Ferraro",
      "scenario": "dispute",
      "status": "flagged"
    }
  ]
}
```

---

## Technical Setup

### Project Structure
```
finserve-demo/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (dashboard)
│   ├── copilot/
│   │   └── page.tsx
│   ├── evaluation/
│   │   └── page.tsx
│   └── api/
│       └── mock/
│           ├── queries.ts
│           └── metrics.ts
├── components/
│   ├── layout/
│   ├── dashboard/
│   ├── copilot/
│   └── evaluation/
├── styles/
│   ├── globals.css
│   └── design-system.css
├── lib/
│   └── mock-data/
│       ├── personas.json
│       ├── queries.json
│       └── clients.json
└── public/
```

### Key Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

## Demo Script

### Scenario 1: Product Comparison (3 min)
1. Show dashboard with client queue
2. Click on Marco Bianchi
3. Select "Experienced RM" persona
4. Type query: "Compare Prodotto A vs B"
5. Show instant response with citations
6. Rate response (thumbs up)

### Scenario 2: Compliance Flag (3 min)
1. Switch to Giulia Ferraro
2. Query reimbursement conditions
3. Show compliance flag appearing
4. Display conflicting clauses side-by-side
5. Demonstrate escalation option

### Scenario 3: Evaluation Dashboard (2 min)
1. Navigate to evaluation view
2. Show accuracy metrics
3. Display query patterns
4. Review satisfaction scores

### Q&A Preparation (2 min)
- Address questions about real implementation
- Discuss next steps and timeline
- Gather feedback on UX and features

---

## Risk Mitigation

### Technical Risks
- **Risk**: Next.js setup issues
  - **Mitigation**: Use create-next-app, test early

- **Risk**: CSS complexity
  - **Mitigation**: Start with simple styles, iterate

- **Risk**: Mock data structure changes
  - **Mitigation**: Define schema upfront, use TypeScript

### Scope Risks
- **Risk**: Feature creep
  - **Mitigation**: Strict P0 focus, defer P1/P2

- **Risk**: Design changes mid-build
  - **Mitigation**: Lock design on Day 1 morning

### Demo Risks
- **Risk**: Bugs during presentation
  - **Mitigation**: Full rehearsal, backup screenshots

- **Risk**: Missing scenarios
  - **Mitigation**: Test all flows Day 2 afternoon

---

## Success Metrics

### Demo Day Checklist
- [ ] All P0 features working
- [ ] No critical bugs
- [ ] Design matches mockups
- [ ] Demo script rehearsed
- [ ] Backup plan ready
- [ ] Stakeholders invited
- [ ] Presentation deck complete

### Post-Demo Goals
- [ ] Positive stakeholder feedback
- [ ] Clear next steps identified
- [ ] Technical decisions made
- [ ] Budget approved
- [ ] Team aligned on roadmap

