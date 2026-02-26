// Mock data for FinServe Analytics - Pension Management Platform

export const CLIENTS = [
  {
    id: 'billy',
    name: 'Billy Thompson',
    age: 48,
    department: 'Orange County Police Department',
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
    impactLevel: 'high' as const,
    affectedClients: 8,
    category: 'Retirement Benefits',
  },
  {
    id: 'ca-2026-002',
    title: 'Early Retirement Penalty Adjustment',
    effectiveDate: 'January 1, 2027',
    summary: 'Revised penalty calculations for retirement before age 55',
    impactLevel: 'medium' as const,
    affectedClients: 3,
    category: 'Retirement Eligibility',
  },
];

export type Client = typeof CLIENTS[number];

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
