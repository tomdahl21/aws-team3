# Design Decisions

## Project: FinServe Analytics - Pension Management Support Platform

### Design System
**Decision Date**: 2026-02-25  
**Status**: DECIDED - Demo Phase

#### Color Palette
- **Navy** (#1B2B4B): Primary brand color, headers, primary actions
- **Gold** (#C8922A): AI/Co-Pilot actions, citations, highlights
- **Green** (#2D5E40): Success states, positive indicators, active clients
- **Red** (#DC2626): Errors, urgent policy changes, warnings
- **Gray Scale**: Neutral backgrounds and text hierarchy

**Rationale**: Professional financial services aesthetic with clear semantic meaning for AI interactions (gold) and client status indicators (green/red).

#### Typography
- **Display Font**: Fraunces (serif) - Headers, titles, emphasis
- **Body Font**: DM Sans (sans-serif) - UI text, forms, content
- **Sizing**: 10px-40px range with clear hierarchy

**Rationale**: Serif for authority and trust (important for financial advice), sans-serif for readability in dense pension policy information.

#### Component Patterns
- **Buttons**: 6 variants (Primary, Gold, Green, Outline, Ghost, Danger), 4 sizes
- **Forms**: Consistent focus states with 3px navy ring
- **Cards**: 3px top border for category encoding
- **Citations**: Gold pill badges with policy section references
- **Client Profile Cards**: Auto-populated with key pension information
- **Policy Change Alerts**: Red/gold badges for urgent/informational changes

**Rationale**: Minimal, professional design that prioritizes information density and quick scanning during live client calls.

---

### User Experience Patterns

#### Journey Map Insights
**Key Findings**:
1. **Client Context**: Auto-loading client profile saves 2-3 minutes per call
2. **Response Speed**: <2 second target for pension policy queries
3. **Critical Moment**: Live client calls require instant, personalized responses
4. **Pain Point**: Policy changes cause client anxiety, need clear explanations

#### Persona-Based Design
**Primary Persona: Sophia (New RM)**
- **Experience Level**: <1 year in pension management
- **Needs**: Clear guidance, confidence-building, citation support
- **UI Approach**: 
  - Prominent client profile display
  - Step-by-step query suggestions
  - Clear policy change alerts
  - Citation transparency

**Secondary Persona: Billy (Client)**
- **Context**: 15 years service, 2 years from retirement
- **Concern**: California pension policy changes affecting sick/vacation days
- **RM Needs**: 
  - Instant access to Billy's pension details
  - Personalized policy change impact
  - Clear, plain-language explanations

**Rationale**: New RMs need more support than experienced advisors. Design should build confidence and provide clear guidance.

#### Design Opportunities (Priority Order)
1. **HIGH**: Client profile auto-load - Display pension details when call is recognized
2. **HIGH**: Policy change dashboard - Surface recent California pension changes
3. **HIGH**: Personalized AI responses - Context-aware answers based on client situation
4. **MEDIUM**: Affected client flagging - Identify clients impacted by policy changes
5. **MEDIUM**: Call context threading - Maintain conversation history across calls
6. **LOW**: Proactive outreach suggestions - Generate talking points for policy changes

---

### Information Architecture

#### Desktop Navigation
- **Global Top Bar**: App-wide navigation (Dashboard, AI Co-Pilot, Policy Updates)
- **Client Profile Panel**: Auto-populated client information (right sidebar, 380px)
- **AI Co-Pilot Panel**: Query input and response display (main content area)
- **Policy Change Alerts**: Dashboard widget for recent California pension changes

#### Dashboard Layout
- **Active Call Section**: Current client profile display
- **Client Queue**: List of scheduled calls and follow-ups
- **Policy Change Alerts**: Recent California pension updates
- **Session Metrics**: Queries handled, response time, satisfaction

#### AI Co-Pilot Interface
- **Client Context Header**: Billy's key information (years of service, retirement date)
- **Query Input**: Natural language text input
- **Response Display**: Structured answer with citations
- **Citation Links**: Gold badges linking to California pension regulations
- **Quick Queries**: Pre-populated questions based on client scenario

---

### Client Profile Display

#### Auto-Loaded Information (Mocked Service)
**Billy's Profile Card**:
- **Name**: Billy [Last Name]
- **Department**: Orange County Police Department
- **Years of Service**: 15 years
- **Retirement Eligibility**: 2 years (estimated date)
- **Sick Days Balance**: [X] days
- **Vacation Days Balance**: [X] days
- **Pension Plan**: California Public Employees' Retirement System (CalPERS)
- **Policy Change Impact**: Flagged - affected by sick/vacation day changes

**Rationale**: All information needed for personalized pension advice visible at a glance.

---

### Policy Change Tracking

#### Dashboard Widget
- **Recent Changes**: List of California pension policy updates
- **Effective Date**: When changes take effect
- **Impact Summary**: Brief description of changes
- **Affected Clients**: Count of clients impacted (e.g., "12 clients affected")
- **Action Items**: Suggested outreach or follow-up

**Rationale**: Proactive awareness of policy changes enables better client service.

---

### Language & Terminology

#### Removed (Insurance-Specific)
- ~~Multi-language support (Italian/English)~~
- ~~Insurance products, policies, claims~~
- ~~Compliance disputes, conflicting clauses~~
- ~~Persona types (Experienced/New/Specialist RM)~~

#### Added (Pension-Specific)
- **Client Profile**: Pension account details, years of service, retirement timeline
- **Policy Changes**: California pension regulation updates
- **Sick/Vacation Days**: Conversion rules, balances, impact on retirement
- **Retirement Eligibility**: Timeline, requirements, benefit calculations
- **CalPERS**: California Public Employees' Retirement System
- **Public Sector**: Police, fire, teachers, government employees

**Rationale**: Language should reflect pension management domain, not insurance.

---

### Accessibility Considerations
- Minimum touch target: 44x44px (mobile)
- Color contrast ratios meet WCAG AA standards
- Focus indicators on all interactive elements
- Screen reader friendly semantic HTML
- Clear, plain-language explanations (avoid pension jargon)

---

### Mobile Considerations
**Status**: DEFERRED - Desktop-first for demo

**Future Mobile Design**:
- **Top Header**: Navy with client name, call status
- **Client Profile**: Collapsible card at top
- **AI Co-Pilot**: Full-screen query interface
- **Bottom Tab Bar**: Dashboard, AI Co-Pilot, Policy Updates, Profile

---

## Open Design Questions
- [ ] Should client profile be always visible or collapsible?
- [ ] How many policy changes should dashboard display (5, 10, all)?
- [ ] Should we show retirement benefit projections in client profile?
- [ ] Dark mode support needed for late-night calls?
- [ ] Print-friendly format for policy change summaries?
- [ ] Should we display call duration timer during active calls?
