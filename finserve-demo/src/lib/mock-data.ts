// Mock data for FinServe Analytics - Pension Management Platform

export const CLIENTS = [
  {
    id: 'sarah',
    name: 'Sarah Martinez',
    age: 52,
    department: 'Los Angeles County Fire Department',
    yearsOfService: 22,
    retirementEligibility: 'Eligible now',
    scenario: 'retirement_planning',
    scenarioLabel: 'Retirement Planning Review',
    status: 'active' as const,
    phone: '(213) 555-0187',
    state: 'California',
    county: 'Los Angeles County',
    sickDaysBalance: 240,
    vacationDaysBalance: 80,
    estimatedRetirementDate: 'October 2026',
    policyChangeImpact: '',
  },
  {
    id: 'marcus',
    name: 'Marcus Lee',
    age: 45,
    department: 'San Diego County Sheriff Department',
    yearsOfService: 18,
    retirementEligibility: '5 years',
    scenario: 'benefit_review',
    scenarioLabel: 'Annual Benefit Review',
    status: 'active' as const,
    phone: '(619) 555-0234',
    state: 'California',
    county: 'San Diego County',
    sickDaysBalance: 160,
    vacationDaysBalance: 100,
    estimatedRetirementDate: 'June 2031',
    policyChangeImpact: '',
  },
  {
    id: 'diana',
    name: 'Diana Torres',
    age: 38,
    department: 'Riverside County Clerk Office',
    yearsOfService: 10,
    retirementEligibility: '15 years',
    scenario: 'enrollment_update',
    scenarioLabel: 'Beneficiary Enrollment Update',
    status: 'active' as const,
    phone: '(951) 555-0312',
    state: 'California',
    county: 'Riverside County',
    sickDaysBalance: 95,
    vacationDaysBalance: 60,
    estimatedRetirementDate: 'August 2041',
    policyChangeImpact: '',
  },
  {
    id: 'billy',
    name: 'Billy Thompson',
    age: 48,
    department: 'Sheriffs Special Officer Unit',
    yearsOfService: 15,
    retirementEligibility: '2 years',
    scenario: 'policy_concern',
    scenarioLabel: 'Policy Change Concern — Sick/Vacation Days',
    status: 'flagged' as const,
    phone: '(714) 555-0123',
    state: 'California',
    county: 'Orange County',
    sickDaysBalance: 180,
    vacationDaysBalance: 120,
    estimatedRetirementDate: 'March 2028',
    policyChangeImpact: 'Affected by CA sick/vacation day conversion changes',
  },
];

// Billy starts hidden — only shown after his incoming call is accepted
export const PENDING_CALL_CLIENT_ID = 'billy';

export const DASHBOARD_METRICS = {
  callsToday: 12,
  avgResponseTime: '1.6s',
  accuracyRate: '97.2%',
  satisfactionScore: '4.8',
};

export const POLICY_CHANGES = [
  {
    id: 'ca-2026-001',
    title: 'Sick/Vacation Day Conversion Rules',
    effectiveDate: 'July 1, 2026',
    summary: 'New California regulations change how unused sick and vacation days convert to retirement service credit',
    description: 'Senate Bill 1234 introduces revised procedures for how CalPERS and CalSTRS members may convert accrued sick and vacation leave into additional retirement service credit at the time of separation. The new rules cap convertible sick leave at 480 hours and adjust the conversion ratio for balances above that threshold.',
    impactLevel: 'high' as const,
    affectedClients: 8,
    category: 'Retirement Benefits',
    status: 'upcoming' as const,
    source: 'California SB 1234 — Public Employees Retirement Law §20965',
    keyChanges: [
      'Maximum 480 hours of unused sick leave may be converted to service credit',
      'Hours above 480 convert at a 0.8:1 ratio instead of 1:1',
      'Unused vacation days must be exhausted before sick leave conversion is permitted',
      'Conversion elections must be filed 90 days prior to retirement date',
    ],
  },
  {
    id: 'ca-2026-002',
    title: 'Early Retirement Penalty Adjustment',
    effectiveDate: 'January 1, 2027',
    summary: 'Revised penalty calculations for retirement before age 55',
    description: 'Assembly Bill 892 revises the early retirement reduction factor applied to members who retire before reaching age 55 under CalPERS safety and miscellaneous tiers. The penalty schedule is updated to reflect current actuarial assumptions, resulting in reduced penalties for members retiring between ages 50 and 52.',
    impactLevel: 'medium' as const,
    affectedClients: 3,
    category: 'Retirement Eligibility',
    status: 'upcoming' as const,
    source: 'California AB 892 — Government Code §21353',
    keyChanges: [
      'Early retirement reduction factor decreases from 6% to 4.5% per year before age 55',
      'Members retiring at age 50 see the largest benefit improvement',
      'Safety members under the 3% @ 50 formula are not affected',
      'Updated actuarial tables apply to separations on or after January 1, 2027',
    ],
  },
  {
    id: 'ca-2026-003',
    title: 'Final Compensation Averaging Period',
    effectiveDate: 'April 1, 2026',
    summary: 'Change to the final compensation calculation window from one year to three years for new-formula members',
    description: 'Under the revised rules aligned with PEPRA, members enrolled after January 1, 2013 (new formula members) will have their final compensation calculated using the highest average annual pensionable compensation over a 36-consecutive-month period, rather than a 12-month window. This aligns with federal guidance and limits pension spiking.',
    impactLevel: 'medium' as const,
    affectedClients: 5,
    category: 'Benefit Calculation',
    status: 'active' as const,
    source: 'PEPRA Compliance Update — Government Code §7522.32',
    keyChanges: [
      'Final compensation now averaged over 36 consecutive months (previously 12)',
      'Applies only to PEPRA new-formula members hired after January 1, 2013',
      'Classic members are unaffected and retain the 12-month averaging window',
      'Members approaching retirement should review compensation history with HR',
    ],
  },
];

export type PolicyChange = typeof POLICY_CHANGES[number];

export type Client = typeof CLIENTS[number];

export const ACCOUNTS = [
  {
    id: 'la-county',
    name: 'Los Angeles County',
    agency: 'County of Los Angeles',
    contractStatus: 'active' as const,
    memberCount: 4820,
    enrolledSince: 'March 2018',
    primaryContact: 'HR Benefits Office',
    phone: '(213) 974-2400',
    plan: 'CalPERS Safety & Misc',
    clientIds: ['sarah'],
    notes: 'Largest county account. Fire & Sheriff departments enrolled.',
  },
  {
    id: 'san-diego-county',
    name: 'San Diego County',
    agency: 'County of San Diego',
    contractStatus: 'active' as const,
    memberCount: 3105,
    enrolledSince: 'July 2019',
    primaryContact: 'SDCERA Liaison',
    phone: '(619) 515-6800',
    plan: 'SDCERA Defined Benefit',
    clientIds: ['marcus'],
    notes: 'Sheriff and Probation departments. Annual review due Q3.',
  },
  {
    id: 'riverside-county',
    name: 'Riverside County',
    agency: 'County of Riverside',
    contractStatus: 'active' as const,
    memberCount: 1870,
    enrolledSince: 'January 2021',
    primaryContact: 'RCERA Office',
    phone: '(951) 955-1600',
    plan: 'RCERA Tier 3',
    clientIds: ['diana'],
    notes: 'Newer account. Clerk and Assessor offices enrolled.',
  },
  {
    id: 'orange-county',
    name: 'Orange County',
    agency: 'County of Orange',
    contractStatus: 'review' as const,
    memberCount: 2340,
    enrolledSince: 'October 2017',
    primaryContact: 'OCERS Benefits',
    phone: '(714) 558-6200',
    plan: 'OCERS Tier 3 Safety',
    clientIds: ['billy'],
    notes: 'Policy change impact flagged for multiple members. Follow-up required.',
  },
];

export type Account = typeof ACCOUNTS[number];

// Quick query presets for Billy's scenario
export const QUICK_QUERIES = {
  policy_concern: [
    { 
      label: 'Sick/Vacation Day Impact', 
      query: 'How do the new California pension changes affect Billy\'s sick and vacation days?' 
    },
    { 
      label: 'Retirement Timeline', 
      query: 'Will the policy changes affect Billy\'s planned retirement in 2 years?' 
    },
    { 
      label: 'Benefit Calculation', 
      query: 'How are sick days converted to service credit under the new rules?' 
    },
  ],
};

// Mock client profile service
export function getClientByPhone(phone: string): Client | undefined {
  return CLIENTS.find(c => c.phone === phone);
}

export function getClientById(id: string): Client | undefined {
  return CLIENTS.find(c => c.id === id);
}
