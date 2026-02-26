'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ACCOUNTS, CLIENTS } from '@/lib/mock-data';

export default function AccountsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const totalMembers = ACCOUNTS.reduce((sum, a) => sum + a.memberCount, 0);
  const activeCount = ACCOUNTS.filter(a => a.contractStatus === 'active').length;
  const reviewCount = ACCOUNTS.filter(a => a.contractStatus === 'review').length;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-row fade-up">
        <div>
          <h1 className="page-title">Accounts</h1>
          <p className="page-subtitle">County and agency accounts under management</p>
        </div>
        <span className="badge badge-navy">{ACCOUNTS.length} accounts</span>
      </div>

      {/* Stats row */}
      <div className="grid-4 fade-up-1" style={{ marginBottom: 28 }}>
        <div className="stat-card navy">
          <div className="stat-label">Total Accounts</div>
          <div className="stat-value">{ACCOUNTS.length}</div>
          <div className="stat-note">California counties</div>
        </div>
        <div className="stat-card green">
          <div className="stat-label">Active</div>
          <div className="stat-value">{activeCount}</div>
          <div className="stat-delta up">↑ In good standing</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-label">Needs Review</div>
          <div className="stat-value">{reviewCount}</div>
          <div className="stat-note">Policy impact flagged</div>
        </div>
        <div className="stat-card navy">
          <div className="stat-label">Total Members</div>
          <div className="stat-value">{totalMembers.toLocaleString()}</div>
          <div className="stat-note">Enrolled participants</div>
        </div>
      </div>

      {/* Account cards */}
      <div className="fade-up-2" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ACCOUNTS.map((account) => {
          const isExpanded = expandedId === account.id;
          const accountClients = CLIENTS.filter(c => account.clientIds.includes(c.id));
          const isReview = account.contractStatus === 'review';

          return (
            <div key={account.id} className="card" style={{ overflow: 'hidden' }}>
              {/* Account row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : account.id)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px' }}>
                  {/* County initial */}
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: isReview ? 'var(--red-lt)' : 'rgba(27,43,75,0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    fontWeight: 700,
                    color: isReview ? 'var(--red)' : 'var(--navy)',
                    flexShrink: 0,
                  }}>
                    {account.name.charAt(0)}
                  </div>

                  {/* Main info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3 }}>
                      <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--navy)' }}>
                        {account.name}
                      </span>
                      <span className={isReview ? 'badge badge-red badge-dot' : 'badge badge-green badge-dot'} style={{ fontSize: 10 }}>
                        {isReview ? 'Needs Review' : 'Active'}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>
                      {account.plan} · Since {account.enrolledSince}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 2 }}>Members</div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>
                        {account.memberCount.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 2 }}>Active Calls</div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>
                        {accountClients.length}
                      </div>
                    </div>
                    <span style={{ color: 'var(--gray-400)', fontSize: 18, transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                      ›
                    </span>
                  </div>
                </div>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--gray-200)', padding: '0 24px 20px' }}>
                  {/* Account detail row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, padding: '20px 0 20px', borderBottom: accountClients.length > 0 ? '1px solid var(--gray-200)' : 'none' }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Agency</div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{account.agency}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Primary Contact</div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{account.primaryContact}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{account.phone}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Notes</div>
                      <div style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.4 }}>{account.notes}</div>
                    </div>
                  </div>

                  {/* Clients within this account */}
                  {accountClients.length > 0 && (
                    <div style={{ paddingTop: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
                        Active Clients
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {accountClients.map(client => (
                          <Link
                            key={client.id}
                            href={`/copilot?client=${client.id}`}
                            className="data-row"
                            style={{ textDecoration: 'none', display: 'flex' }}
                          >
                            <div className="dr-icon">👤</div>
                            <div className="dr-main">
                              <div className="dr-title">{client.name}</div>
                              <div className="dr-sub">{client.scenarioLabel}</div>
                              <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 2 }}>
                                {client.department} · {client.yearsOfService} yrs service
                              </div>
                            </div>
                            <div className="dr-right">
                              {client.status === 'flagged' && <span style={{ fontSize: 16 }}>⚠️</span>}
                              <span className={client.status === 'flagged' ? 'badge badge-red badge-dot' : 'badge badge-green badge-dot'}>
                                {client.status === 'flagged' ? 'Policy Impact' : 'Active'}
                              </span>
                              <span style={{ color: 'var(--gray-400)', fontSize: 18 }}>›</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
