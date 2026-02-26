# User Research & Insights

## Project: FinServe Analytics - Pension Management Support Platform

### Primary Persona: Sophia - New Relationship Manager

#### Demographics
- **Role**: Relationship Manager (Financial Advisor)
- **Experience**: <1 year in pension management
- **Account**: Orange County Police Department pension account
- **Language**: English
- **Work Context**: Desktop workspace, handles client calls throughout the day
- **Tech Comfort**: Moderate - comfortable with digital tools but needs intuitive interfaces

#### Goals & Motivations
1. **Confidence**: Answer complex pension questions accurately during live calls
2. **Client Trust**: Build credibility with public sector clients
3. **Policy Awareness**: Stay current on California pension regulation changes
4. **Efficiency**: Provide instant answers without putting clients on hold
5. **Career Growth**: Demonstrate competence to handle more complex accounts

#### Pain Points (Current State)
1. **Knowledge Gap**: <1 year experience, unfamiliar with complex pension regulations
2. **Policy Changes**: California pension rules change frequently, hard to track
3. **Client Context**: Manually looking up client information during calls wastes time
4. **Personalization**: Difficult to explain how policy changes affect specific clients
5. **Confidence**: Fear of providing incorrect pension advice
6. **Documentation**: Pension policy documents are dense and hard to navigate

#### Behaviors & Workflows
- **Morning Routine**: Reviews client queue, checks for policy updates
- **Call Pattern**: 5-8 client calls per day, mix of routine questions and policy concerns
- **Query Types**: 
  - Retirement eligibility questions (30%)
  - Policy change impacts (40%)
  - Sick/vacation day conversion (20%)
  - General pension benefits (10%)
- **Documentation**: Takes notes during/after each call
- **Escalation**: Frequently escalates complex questions to senior advisors

---

### Secondary Persona: Billy - Police Officer Client

#### Demographics
- **Role**: Police Officer, Orange County Police Department
- **Service**: 15 years with Orange County Police
- **Retirement**: 2 years away from retirement eligibility
- **Age**: ~45-50 years old
- **Family**: Married, 2 children
- **Tech Comfort**: Moderate - uses smartphone, prefers phone calls over email

#### Goals & Motivations
1. **Retirement Security**: Ensure pension benefits are maximized
2. **Policy Understanding**: Understand how California changes affect his retirement
3. **Planning**: Make informed decisions about retirement timing
4. **Peace of Mind**: Confidence that his pension is on track

#### Pain Points (Current State)
1. **Policy Confusion**: Recent California pension changes are unclear
2. **Sick/Vacation Days**: Unsure how new rules affect his accumulated days
3. **Retirement Timing**: Worried changes might affect his 2-year retirement plan
4. **Information Access**: Pension documents are confusing and hard to understand
5. **Trust**: Needs clear, authoritative answers from his RM

#### Triggering Event
**California Pension Policy Change**: California announced changes to sick/vacation day conversion rules for public sector pensions, causing concern among near-retirement employees like Billy.

---

### Journey Map: Billy's Call with Sophia

#### Stage 1: Call Initiation (~1 min)
**Actions**: Billy calls Sophia, explains concern about California pension changes  
**Emotion**: Anxious - worried about retirement impact  
**Pain Point**: Without AI, Sophia would need to manually look up Billy's information  
**Opportunity**: Auto-load Billy's profile when call is recognized

#### Stage 2: Client Context Loading (~30 sec)
**Actions**: System recognizes Billy's phone number (mocked), auto-loads profile  
**Emotion**: Sophia feels prepared - Billy's info is immediately available  
**Pain Point**: Manual lookup would take 2-3 minutes, Billy would wait  
**Opportunity**: Instant client context enables personalized conversation

#### Stage 3: Policy Question (~2 min)
**Actions**: Billy asks: "How do the new sick day rules affect my retirement?"  
**Emotion**: Billy is concerned, Sophia is confident with AI support  
**Pain Point**: Without AI, Sophia would need to search policy documents or escalate  
**Opportunity**: AI Co-Pilot provides instant, personalized answer

#### Stage 4: AI Query & Response (~5 sec)
**Actions**: Sophia types: "How do the new California pension changes affect Billy's sick and vacation days?"  
**Emotion**: Sophia is relieved - AI provides clear answer in <2 seconds  
**Pain Point**: Manual research would take 10+ minutes  
**Opportunity**: Instant, context-aware response with citations

#### Stage 5: Explanation to Client (~3 min)
**Actions**: Sophia explains AI response to Billy in plain language  
**Emotion**: Billy is reassured - clear answer with regulatory citations  
**Pain Point**: Without citations, Billy might doubt the accuracy  
**Opportunity**: Citations build trust and credibility

#### Stage 6: Follow-up Questions (~2 min)
**Actions**: Billy asks follow-up about retirement timing  
**Emotion**: Confident - Sophia can answer with AI support  
**Pain Point**: Multiple escalations would frustrate Billy  
**Opportunity**: Context threading maintains conversation flow

#### Stage 7: Call Wrap-up (~1 min)
**Actions**: Sophia summarizes, Billy feels confident about retirement plan  
**Emotion**: Satisfied - both Billy and Sophia feel good about the call  
**Opportunity**: Auto-generate call summary for records

---

### Key Metrics & Success Criteria

#### Time Savings
- **Client Profile Load**: < 1 second (vs 2-3 minutes manual lookup)
- **Policy Query Response**: < 2 seconds (vs 10+ minutes manual research)
- **Call Duration**: 10 minutes (vs 20+ minutes with manual lookups)

#### Response Quality
- **Accuracy**: > 95% correct pension policy responses
- **Personalization**: Context-aware responses based on client's specific situation
- **Citations**: All responses include regulatory citations

#### User Satisfaction
- **RM Confidence**: Sophia feels confident handling complex pension questions
- **Client Trust**: Billy trusts the information provided
- **Escalation Reduction**: Fewer escalations to senior advisors

---

### Use Cases

#### Primary Use Case: Policy Change Impact Question
**Scenario**: Client calls concerned about California pension policy changes  
**Current Process**: 
1. RM manually looks up client information (2-3 min)
2. RM searches policy documents (10+ min)
3. RM may need to escalate to senior advisor
4. Client waits on hold or receives callback

**With AI Co-Pilot**:
1. System auto-loads client profile when call is recognized (<1 sec)
2. RM asks AI Co-Pilot about policy change impact (<2 sec response)
3. RM explains personalized answer to client during call
4. Citations provided for credibility

**Success Criteria**:
- Client profile loads in < 1 second
- AI response in < 2 seconds
- Personalized to client's specific situation
- Citations to California pension regulations
- No escalation needed

#### Secondary Use Case: Proactive Policy Change Outreach
**Scenario**: California announces pension policy changes  
**Current Process**:
1. RMs manually review policy changes
2. RMs manually identify affected clients
3. RMs schedule outreach calls
4. Time-consuming and error-prone

**With AI Co-Pilot**:
1. System ingests policy changes (future: agent-curated)
2. AI identifies affected clients (e.g., near-retirement)
3. Dashboard surfaces affected clients with impact summaries
4. RM proactively reaches out with personalized talking points

**Success Criteria**:
- Policy changes surfaced in dashboard
- Affected clients automatically flagged
- Impact summaries generated
- Proactive outreach enabled

---

### User Feedback Themes

#### What Users Need
- "I need Billy's information immediately when he calls, not 3 minutes later."
- "I need to explain policy changes in plain language, not legalese."
- "I need citations so Billy trusts the information."
- "I need to know which clients are affected by policy changes."

#### What Users Worry About
- "What if the AI gives wrong pension advice?"
- "How do I know the policy information is current?"
- "Can I trust this for retirement planning questions?"
- "Will clients think I'm just reading from a script?"

#### What Users Want (Future)
- Real-time call transcription and summarization
- Proactive alerts when clients are affected by policy changes
- Retirement planning calculators integrated with AI
- Mobile access for on-the-go client calls

---

### Research Insights

#### Key Findings
1. **New RMs Need Support**: <1 year experience RMs lack confidence with complex pension questions
2. **Policy Changes Cause Anxiety**: Clients like Billy are concerned about how changes affect their retirement
3. **Personalization Matters**: Generic policy explanations don't address client-specific concerns
4. **Citations Build Trust**: Regulatory citations increase client confidence in RM advice
5. **Time is Critical**: Clients don't want to wait on hold while RMs research answers

#### Behavioral Patterns
- RMs escalate 40% of policy change questions to senior advisors
- Clients call within 1-2 weeks of policy change announcements
- Near-retirement clients (2-5 years out) are most concerned about changes
- Phone calls are preferred over email for complex pension questions

---

### Persona Evolution (Future)

#### Sophia's Growth Path
- **Month 1-6**: New RM, relies heavily on AI Co-Pilot
- **Month 6-12**: Experienced RM, uses AI for complex edge cases
- **Year 2+**: Senior RM, mentors new RMs on using AI effectively

#### Billy's Journey
- **Current**: 2 years from retirement, concerned about policy changes
- **Year 1**: 1 year from retirement, focused on maximizing benefits
- **Year 2**: Retired, may refer other officers to FinServe

---

## Research Gaps & Next Steps
- [ ] Interview senior RMs to understand advanced use cases
- [ ] Survey clients about preferred communication channels
- [ ] Analyze call recordings to identify common question patterns
- [ ] Test AI responses with real pension policy experts
- [ ] Expand research to other public sector departments (fire, teachers)
