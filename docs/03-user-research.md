# User Research & Insights

## Project: FinServe Analytics - Insurance Product Support MLP

### Primary Persona: Sofia Ferrari - Experienced RM

#### Demographics
- **Role**: Experienced Relationship Manager
- **Experience**: 5+ years in insurance
- **Language**: Italian (primary)
- **Work Context**: Desktop workspace, handles 10-15 client sessions daily
- **Tech Comfort**: High - comfortable with digital tools

#### Goals & Motivations
1. **Speed**: Answer client questions instantly during live calls
2. **Accuracy**: Provide correct information to avoid compliance issues
3. **Confidence**: Have citations to back up statements
4. **Efficiency**: Handle more clients without sacrificing quality

#### Pain Points (Current State)
1. **Manual Search Time**: 10-15 minutes per product query searching 700+ page documents
2. **Call Interruptions**: Clients wait on hold during document searches
3. **Compliance Risk**: Easy to mis-quote clauses under time pressure
4. **Edge Cases**: Rare exclusions not well-indexed, require specialist calls
5. **Conflicting Information**: Multiple document versions create confusion
6. **Context Switching**: Juggling multiple documents while on call

#### Behaviors & Workflows
- **Morning Routine**: Reviews client queue, checks pending disputes
- **Session Pattern**: 2-3 clients per hour, mix of new purchases and support
- **Query Types**: 
  - Product comparisons (40%)
  - Coverage questions (30%)
  - Claims disputes (20%)
  - Edge cases (10%)
- **Documentation**: Takes notes during/after each session
- **Evaluation**: Rates AI responses for accuracy

---

### Journey Map Summary

#### Stage 1: Login & Orientation (~2 min)
**Actions**: SSO login, persona selection, language confirmation
**Emotion**: Neutral - routine start
**Pain Point**: Manual setup eats first 5 minutes without AI

#### Stage 2: Dashboard Review (~3 min)
**Actions**: Scan client queue, review session notes, open client workspace
**Emotion**: Focused - slight concern about open disputes
**Opportunity**: Smart pre-briefing of unresolved flags

#### Stage 3: Marco - New Purchase (~12 min)
**Actions**: Product comparison query, read structured response, confirm recommendation
**Emotion**: Confident - AI delivers instantly
**Pain Point**: Without AI, 10-15 min manual search while client waits
**Opportunity**: Instant comparison cards, live call mode

#### Stage 4: Marco - Edge Case (~6 min)
**Actions**: Follow-up on partial disability exclusions, review citations
**Emotion**: Assured - citation removes uncertainty
**Pain Point**: Edge cases rarely indexed, would need specialist without AI
**Opportunity**: Context threading across session

#### Stage 5: Giulia - Policy Dispute (~15 min)
**Actions**: Query reimbursement conditions, present clause resolution, acknowledge compliance flag
**Emotion**: Tense → Relieved - compliance flag reduces error risk
**Pain Point**: Conflicting clauses are genuine compliance risk
**Opportunity**: Proactive compliance surfacing, escalation workflow

#### Stage 6: Session Wrap-up (~3 min)
**Actions**: Add session notes, rate AI responses, review metrics
**Emotion**: Satisfied - both sessions resolved cleanly
**Opportunity**: Auto session summary, evaluation nudge

---

### Key Metrics & Success Criteria

#### Time Savings
- **Target**: 10-15 minutes saved per product query
- **Current**: Manual search eliminated
- **Impact**: 30-45 minutes saved per day per RM

#### Response Quality
- **Target**: 1.8 second RAG retrieval
- **Accuracy**: 96.4% (last 7 days)
- **User Satisfaction**: 4.7/5.0

#### Compliance Impact
- **Flags Caught**: 1 per session (average)
- **Risk Reduction**: Auto-surfaced conflicts that would be missed manually

---

### Secondary Personas (Brief)

#### New RM
- **Experience**: < 1 year
- **Needs**: More detailed explanations, step-by-step guidance
- **Pain Points**: Overwhelming product complexity, fear of mistakes
- **AI Benefit**: Training wheels, confidence building

#### Specialist RM
- **Experience**: 10+ years, product expert
- **Needs**: Deep technical detail, edge case handling
- **Pain Points**: Rare scenarios not documented
- **AI Benefit**: Quick reference for obscure clauses

---

### Use Cases

#### Primary Use Case: Product Comparison During Live Call
**Scenario**: Client asks to compare two insurance products
**Current Process**: 
1. Put client on hold
2. Search through 700+ page documents
3. Find relevant sections (10-15 min)
4. Compare manually
5. Return to call

**With AI Co-Pilot**:
1. Type query in Co-Pilot panel
2. Receive structured comparison in 1.8s
3. Read to client during live call
4. Show citations for credibility

**Success Criteria**:
- Response time < 2 seconds
- Structured, scannable format
- Citations included
- Accurate product details

#### Secondary Use Case: Compliance Dispute Resolution
**Scenario**: Client disputes claim denial based on conflicting clauses
**Current Process**:
1. Search for both clauses
2. Manually compare
3. Risk missing conflict
4. Potential compliance violation

**With AI Co-Pilot**:
1. Query reimbursement conditions
2. AI auto-flags conflicting clauses
3. Side-by-side resolution presented
4. Escalation path if needed

**Success Criteria**:
- Conflict detection accuracy > 95%
- Clear resolution guidance
- Audit trail for compliance

---

### User Feedback Themes

#### What Users Love
- "I would have spent 10 minutes searching for this. It just appeared."
- "The citation gives me confidence to state this clearly."
- "The AI flag probably saved us from a complaint."

#### What Users Want
- Proactive compliance surfacing (before query)
- Context retention across full session
- Auto-generated session summaries
- Live call optimized view

#### What Users Worry About
- "What if the AI gives wrong information?"
- "How do I know the citation is current?"
- "Can I trust this for compliance-critical queries?"

---

## Research Gaps & Next Steps
- [ ] Quantitative usage data (once deployed)
- [ ] A/B testing of response formats
- [ ] Specialist RM interviews
- [ ] Mobile usage patterns
- [ ] Multi-language effectiveness (beyond Italian)

