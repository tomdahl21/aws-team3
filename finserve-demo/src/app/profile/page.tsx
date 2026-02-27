'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CLIENTS } from '@/lib/mock-data';

function ProfileInner() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get('client') ?? 'billy';
  const client = CLIENTS.find((c) => c.id === clientId);
  const [activeTab, setActiveTab] = useState<'overview' | 'benefits' | 'documents' | 'history'>('overview');

  if (!client) {
    return (
      <div className="page-container">
        <div className="card" style={{ maxWidth: 600, margin: '40px auto', textAlign: 'center', padding: 40 }}>
          <h2 style={{ marginBottom: 16 }}>Client Not Found</h2>
          <p style={{ marginBottom: 24, color: 'var(--gray-600)' }}>
            The requested client could not be found.
          </p>
          <Link href="/rm" className="btn btn-primary">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Page header */}
      <div className="page-header-row fade-up">
        <div>
          <h1 className="page-title">Client Profile</h1>
          <p className="page-subtitle">{client.name}</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href={`/copilot?client=${client.id}`} className="btn btn-primary btn-sm">
            Open AI Assistant
          </Link>
          <Link href="/rm" className="btn btn-outline btn-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Client Header Card */}
      <div className="card fade-up-1" style={{ marginBottom: 16 }}>
        <div className="card-body" style={{ padding: 32 }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            {/* Avatar */}
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'var(--navy)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 600,
              flexShrink: 0,
            }}>
              {client.name.split(' ').map(n => n[0]).join('')}
            </div>

            {/* Client Info */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <h2 style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: 28, 
                    fontWeight: 600, 
                    color: 'var(--navy)',
                    marginBottom: 4,
                  }}>
                    {client.name}
                  </h2>
                  <div style={{ fontSize: 16, color: 'var(--gray-600)', marginBottom: 8 }}>
                    {client.department}
                  </div>
                </div>
                {client.status === 'flagged' && (
                  <span className="badge badge-red" style={{ fontSize: 12 }}>
                    ⚠️ Policy Impact
                  </span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Age</div>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>{client.age} years</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Years of Service</div>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>{client.yearsOfService} years</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Retirement Eligibility</div>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>{client.retirementEligibility}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Phone</div>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>{client.phone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="fade-up-2" style={{ 
        borderBottom: '1px solid var(--gray-200)', 
        marginBottom: 24,
        display: 'flex',
        gap: 32,
      }}>
        {(['overview', 'benefits', 'documents', 'history'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 0',
              border: 'none',
              background: 'none',
              fontSize: 14,
              fontWeight: 500,
              color: activeTab === tab ? 'var(--navy)' : 'var(--gray-600)',
              borderBottom: activeTab === tab ? '2px solid var(--navy)' : '2px solid transparent',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.2s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="fade-up-3">
          {/* Personal Information */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Personal Information</div>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Full Name</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{client.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Age</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{client.age} years old</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Department</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{client.department}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Location</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{client.county}, {client.state}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Contact Phone</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{client.phone}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Employment Details</div>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Years of Service</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{client.yearsOfService} years</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Retirement Eligibility</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{client.retirementEligibility}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Estimated Retirement Date</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{client.estimatedRetirementDate}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Current Status</div>
                  <span className={`badge ${client.status === 'flagged' ? 'badge-red' : 'badge-green'}`}>
                    {client.status === 'flagged' ? 'Policy Impact' : 'Active'}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Scenario</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{client.scenarioLabel}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Leave Balances */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Leave Balances</div>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>Sick Days</span>
                    <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--navy)' }}>
                      {client.sickDaysBalance} days
                    </span>
                  </div>
                  <div style={{ 
                    height: 8, 
                    background: 'var(--gray-100)', 
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min((client.sickDaysBalance / 320) * 100, 100)}%`,
                      background: 'var(--navy)',
                      borderRadius: 4,
                    }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>Vacation Days</span>
                    <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--green)' }}>
                      {client.vacationDaysBalance} days
                    </span>
                  </div>
                  <div style={{ 
                    height: 8, 
                    background: 'var(--gray-100)', 
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min((client.vacationDaysBalance / 140) * 100, 100)}%`,
                      background: 'var(--green)',
                      borderRadius: 4,
                    }}></div>
                  </div>
                </div>
                <div style={{
                  marginTop: 8,
                  padding: 12,
                  background: 'var(--gray-50)',
                  borderRadius: 'var(--radius-md)',
                }}>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>
                    Total Accrued Leave
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--navy)' }}>
                    {client.sickDaysBalance + client.vacationDaysBalance} days
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Impact */}
          {client.policyChangeImpact && (
            <div className="card">
              <div className="card-header">
                <div className="card-title">Policy Change Impact</div>
              </div>
              <div className="card-body">
                <div style={{
                  padding: 16,
                  background: 'var(--red-lt)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--red)',
                  marginBottom: 16,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--red)', marginBottom: 8 }}>
                    ⚠️ ACTIVE POLICY IMPACT
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.5 }}>
                    {client.policyChangeImpact}
                  </div>
                </div>
                <Link 
                  href={`/copilot?client=${client.id}`}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Discuss with AI Assistant
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'benefits' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="fade-up-3">
          {/* Pension Plan */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Pension Plan Details</div>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Plan Type</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>CalPERS Safety Member</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Formula</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>3% @ 50</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Service Credit</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{client.yearsOfService} years</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Projected Monthly Benefit</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--navy)' }}>$4,850</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>Based on current service credit</div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Benefits */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Health Benefits</div>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Medical Plan</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>CalPERS Gold PPO</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Dental Plan</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>Delta Dental PPO</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Vision Plan</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>VSP Choice</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Retiree Health Coverage</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>Eligible at retirement</div>
                </div>
              </div>
            </div>
          </div>

          {/* Beneficiaries */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Beneficiaries</div>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{
                  padding: 12,
                  background: 'var(--gray-50)',
                  borderRadius: 'var(--radius-md)',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Primary Beneficiary</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-600)' }}>Spouse - 100%</div>
                </div>
                <div style={{
                  padding: 12,
                  background: 'var(--gray-50)',
                  borderRadius: 'var(--radius-md)',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Contingent Beneficiaries</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-600)' }}>Children - Equal shares</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 8 }}>
                  Last updated: January 15, 2025
                </div>
              </div>
            </div>
          </div>

          {/* Contribution Summary */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Contribution Summary</div>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Employee Contributions (YTD)</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--navy)' }}>$8,450</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Employer Contributions (YTD)</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--green)' }}>$12,680</div>
                </div>
                <div style={{
                  marginTop: 8,
                  padding: 12,
                  background: 'var(--gray-50)',
                  borderRadius: 'var(--radius-md)',
                }}>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>
                    Total Lifetime Contributions
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--navy)' }}>
                    $186,420
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="card fade-up-3">
          <div className="card-header">
            <div className="card-title">Documents & Forms</div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { name: 'Annual Benefit Statement 2025', date: 'Jan 15, 2026', type: 'PDF' },
                { name: 'Service Credit Summary', date: 'Dec 1, 2025', type: 'PDF' },
                { name: 'Beneficiary Designation Form', date: 'Jan 15, 2025', type: 'PDF' },
                { name: 'Health Benefits Enrollment', date: 'Nov 20, 2024', type: 'PDF' },
                { name: 'Retirement Estimate Calculator', date: 'Oct 5, 2024', type: 'PDF' },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 16,
                    border: '1px solid var(--gray-200)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--gray-50)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      background: 'var(--red-lt)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--red)',
                    }}>
                      {doc.type}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{doc.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{doc.date}</div>
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="card fade-up-3">
          <div className="card-header">
            <div className="card-title">Activity History</div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { date: 'Feb 24, 2026', action: 'AI Assistant Session', details: 'Discussed sick/vacation day policy changes', type: 'chat' },
                { date: 'Feb 20, 2026', action: 'Phone Call', details: 'Questions about retirement timeline', type: 'call' },
                { date: 'Jan 15, 2026', action: 'Document Viewed', details: 'Annual Benefit Statement 2025', type: 'document' },
                { date: 'Jan 15, 2025', action: 'Form Submitted', details: 'Beneficiary Designation Update', type: 'form' },
                { date: 'Dec 10, 2024', action: 'AI Assistant Session', details: 'Retirement planning consultation', type: 'chat' },
                { date: 'Nov 20, 2024', action: 'Enrollment Update', details: 'Health benefits annual enrollment', type: 'enrollment' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: 16,
                    paddingBottom: 16,
                    borderBottom: idx < 5 ? '1px solid var(--gray-100)' : 'none',
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: item.type === 'chat' ? 'var(--navy-lt)' : 
                                item.type === 'call' ? 'var(--green-lt)' :
                                item.type === 'document' ? 'var(--red-lt)' : 'var(--gold-lt)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {item.type === 'chat' && '💬'}
                    {item.type === 'call' && '📞'}
                    {item.type === 'document' && '📄'}
                    {item.type === 'form' && '📝'}
                    {item.type === 'enrollment' && '✅'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{item.action}</div>
                    <div style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 4 }}>{item.details}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="page-container">
        <div style={{ textAlign: 'center', padding: 60 }}>Loading...</div>
      </div>
    }>
      <ProfileInner />
    </Suspense>
  );
}
