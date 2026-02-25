# Design Decisions

## Project: FinServe Analytics - Insurance Product Support MLP

### Design System
**Decision Date**: 2026-02-25

#### Color Palette
- **Navy** (#1B2B4B): Primary brand color, headers, primary actions
- **Gold** (#C8922A): AI/Co-Pilot actions, citations, highlights
- **Green** (#2D5E40): Success states, positive indicators, compliance
- **Red** (#DC2626): Errors, compliance flags, warnings
- **Gray Scale**: Neutral backgrounds and text hierarchy

**Rationale**: Professional financial services aesthetic with clear semantic meaning for AI interactions (gold) and compliance states (green/red).

#### Typography
- **Display Font**: Fraunces (serif) - Headers, titles, emphasis
- **Body Font**: DM Sans (sans-serif) - UI text, forms, content
- **Sizing**: 10px-40px range with clear hierarchy

**Rationale**: Serif for authority and trust, sans-serif for readability in dense information displays.

#### Component Patterns
- **Buttons**: 6 variants (Primary, Gold, Green, Outline, Ghost, Danger), 4 sizes
- **Forms**: Consistent focus states with 3px navy ring
- **Cards**: 3px top border for category encoding
- **Citations**: Gold pill badges with section references
- **Mobile**: Bottom tab bar (max 5 items), navy header with gradient accent

**Rationale**: Minimal, professional design that prioritizes information density and quick scanning during live client calls.

---

### User Experience Patterns

#### Journey Map Insights
**Key Findings**:
1. **Time Savings**: 10-15 minutes saved per product query (manual search eliminated)
2. **Response Speed**: 1.8s average RAG retrieval target
3. **Critical Moment**: Live client calls require instant, accurate responses
4. **Pain Point**: Conflicting clauses in policy documents create compliance risk

#### Persona-Based Responses
**Personas Defined**:
- **Experienced RM**: Concise, technical language, assumes product knowledge
- **New RM**: More detailed explanations, step-by-step guidance
- **Specialist RM**: Deep technical detail, edge case handling

**Rationale**: Different experience levels need different communication styles to be effective.

#### Design Opportunities (Priority Order)
1. **HIGH**: Proactive compliance surfacing - Flag conflicts before query
2. **HIGH**: Context threading - Maintain conversation context across session
3. **MEDIUM**: Auto session summary - Generate draft notes from conversation
4. **MEDIUM**: Live call mode - Reduced-chrome view for active calls
5. **LOW**: One-click persona recall - Remember settings from last session

---

### Information Architecture

#### Desktop Navigation
- **Global Top Bar**: App-wide navigation (Dashboard, Clients, Products, Reports)
- **Sidebar**: Workspace navigation (220px fixed width)
- **Tab Nav**: In-page context switching
- **Breadcrumbs**: Location awareness

#### Mobile Navigation
- **Top Header**: Navy with greeting, search, status
- **Quick Actions**: 3-column grid for primary tasks
- **Bottom Tab Bar**: 5 items max (Home, AI, Clients, Reports, Settings)
- **Notification**: Gold dot indicator (no number badges on mobile)

---

### Accessibility Considerations
- Minimum touch target: 44x44px (mobile)
- Color contrast ratios meet WCAG AA standards
- Focus indicators on all interactive elements
- Screen reader friendly semantic HTML

---

## Open Design Questions
- [ ] Dark mode support needed?
- [ ] Offline mode for mobile app?
- [ ] Print-friendly citation export format?
- [ ] Multi-language UI (beyond Italian content)?

