'use client';

import { useState } from 'react';
import Link from 'next/link';
import { POLICY_CHANGES, type PolicyChange } from '@/lib/mock-data';

const IMPACT_LABELS: Record<PolicyChange['impactLevel'], string> = {
  high: 'HIGH IMPACT',
  medium: 'MEDIUM',
};

const IMPACT_BADGE: Record<PolicyChange['impactLevel'], string> = {
  high: 'badge badge-red',
  medium: 'badge badge-gold',
};

const STATUS_BADGE: Record<PolicyChange['status'], string> = {
  upcoming: 'badge badge-navy',
  active: 'badge badge-green',
};

const STATUS_LABELS: Record<PolicyChange['status'], string> = {
  upcoming: 'Upcoming',
  active: 'Active',
};

type FilterLevel = 'all' | PolicyChange['impactLevel'];

export default function PolicyUpdatesPage() {
  const [filter, setFilter] = useState<FilterLevel>('all');
  const [expandedId, setExpandedId] = useState<string | null>(POLICY_CHANGES[0]?.id ?? null);

  const filtered = filter === 'all' ? POLICY_CHANGES : POLICY_CHANGES.filter((p) => p.impactLevel === filter);

  const totalAffected = POLICY_CHANGES.reduce((sum, p) => sum + p.affectedClients, 0);
  const highImpactCount = POLICY_CHANGES.filter((p) => p.impactLevel === 'high').length;
  const nextPolicy = [...POLICY_CHANGES].sort((a, b) => new Date(a.effectiveDate).getTime() - new Date(b.effectiveDate).getTime())[0];

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-row fade-up">
        <div>
          <h1 className="page-title">Policy Updates</h1>
          <p className="page-subtitle">California Pension Regulation Tracker</p>
        </div>
        <span className="badge badge-gold badge-dot" style={{ fontSize: 12, padding: '5px 12px' }}>
          {POLICY_CHANGES.filter((p) => p.status === 'upcoming').length} Upcoming Changes
        </span>
      </div>

      {/* Stats row */}
      <div className="grid-4 fade-up-1" style={{ marginBottom: 28 }}>
        <div className="stat-card navy">
          <div className="stat-label">Total Policies</div>
          <div className="stat-value">{POLICY_CHANGES.length}</div>
          <div className="stat-note">2026 – 2027</div>
        </div>
        <div className="stat-card red">
          <div className="stat-label">High Impact</div>
          <div className="stat-value">{highImpactCount}</div>
          <div className="stat-note">require immediate review</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-label">Clients Affected</div>
          <div className="stat-value">{totalAffected}</div>
          <div className="stat-note">across all policies</div>
        </div>
        <div className="stat-card green">
          <div className="stat-label">Next Effective</div>
          <div className="stat-value" style={{ fontSize: 18 }}>{nextPolicy?.effectiveDate ?? '—'}</div>
          <div className="stat-note">{nextPolicy?.title ?? ''}</div>
        </div>
      </div>

      {/* Main content */}
      <div className="fade-up-2">
        <div className="card">
          {/* Card header with filters */}
          <div className="card-header" style={{ paddingBottom: 0 }}>
            <div>
              <div className="card-title">Regulation Changes</div>
              <div className="card-subtitle">Click a policy to view full details and key changes</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['all', 'high', 'medium'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setFilter(level)}
                  className={filter === level ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}
                  style={{ fontSize: 12 }}
                >
                  {level === 'all' ? 'All' : level === 'high' ? 'High Impact' : 'Medium'}
                </button>
              ))}
            </div>
          </div>

          <div className="card-body" style={{ paddingTop: 16 }}>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--gray-400)' }}>
                No policies match the selected filter.
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered.map((policy) => {
                const isExpanded = expandedId === policy.id;
                return (
                  <div
                    key={policy.id}
                    style={{
                      border: `1px solid ${isExpanded ? 'var(--navy)' : 'var(--gray-200)'}`,
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      transition: 'border-color 0.15s',
                    }}
                  >
                    {/* Policy row — always visible */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : policy.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 16,
                        padding: '16px 20px',
                        background: isExpanded ? 'var(--gray-50)' : 'var(--white)',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      {/* Left: badges */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0, marginTop: 2 }}>
                        <span className={IMPACT_BADGE[policy.impactLevel]} style={{ fontSize: 10 }}>
                          {IMPACT_LABELS[policy.impactLevel]}
                        </span>
                        <span className={STATUS_BADGE[policy.status]} style={{ fontSize: 10 }}>
                          {STATUS_LABELS[policy.status]}
                        </span>
                      </div>

                      {/* Middle: title + summary */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>
                          {policy.title}
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.5 }}>
                          {policy.summary}
                        </div>
                        <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                            📅 Effective: <strong style={{ color: 'var(--navy)' }}>{policy.effectiveDate}</strong>
                          </span>
                          <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                            👥 {policy.affectedClients} client{policy.affectedClients !== 1 ? 's' : ''} affected
                          </span>
                          <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                            🏷 {policy.category}
                          </span>
                        </div>
                      </div>

                      {/* Right: chevron */}
                      <div style={{
                        fontSize: 18,
                        color: 'var(--gray-400)',
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.15s',
                        flexShrink: 0,
                      }}>
                        ›
                      </div>
                    </button>

                    {/* Expanded detail panel */}
                    {isExpanded && (
                      <div style={{
                        padding: '0 20px 20px 20px',
                        borderTop: '1px solid var(--gray-200)',
                        background: 'var(--gray-50)',
                      }}>
                        {/* Description */}
                        <div style={{ paddingTop: 16, marginBottom: 20 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                            Overview
                          </div>
                          <p style={{ fontSize: 13.5, color: 'var(--gray-700)', lineHeight: 1.7, margin: 0 }}>
                            {policy.description}
                          </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                          {/* Key Changes */}
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                              Key Changes
                            </div>
                            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                              {policy.keyChanges.map((change, i) => (
                                <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.5 }}>
                                  <span style={{ color: 'var(--navy)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>→</span>
                                  {change}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Meta info */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div>
                              <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Regulatory Source</div>
                              <div style={{ fontSize: 13, color: 'var(--gray-800)', fontWeight: 500 }}>{policy.source}</div>
                            </div>
                            <div>
                              <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Category</div>
                              <div style={{ fontSize: 13, color: 'var(--gray-800)', fontWeight: 500 }}>{policy.category}</div>
                            </div>
                            <div>
                              <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Clients Affected</div>
                              <div style={{ fontSize: 13, color: 'var(--gray-800)', fontWeight: 500 }}>{policy.affectedClients} client{policy.affectedClients !== 1 ? 's' : ''}</div>
                            </div>
                            <div style={{ marginTop: 'auto', paddingTop: 4 }}>
                              <Link
                                href={`/copilot?policy=${policy.id}`}
                                className="btn btn-primary btn-sm"
                                style={{ fontSize: 13 }}
                              >
                                Ask AI Client Assistant →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-footer">
            <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>
              Source: California Public Employees' Retirement System · Updated Feb 2026
            </span>
            <Link href="/rm" className="btn btn-ghost btn-sm" style={{ color: 'var(--navy)', marginLeft: 'auto' }}>
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
