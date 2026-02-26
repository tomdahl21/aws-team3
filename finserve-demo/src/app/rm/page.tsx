'use client';

import Link from 'next/link';
import { CLIENTS, DASHBOARD_METRICS, POLICY_CHANGES } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <div className="page-container">
      {/* Page header */}
      <div className="page-header-row fade-up">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Good morning, Sophia · Wednesday, February 25, 2026</p>
        </div>
        <span className="badge badge-green badge-dot" style={{ fontSize: 12, padding: '5px 12px' }}>
          System Operational
        </span>
      </div>

      {/* Metrics row */}
      <div className="grid-4 fade-up-1" style={{ marginBottom: 28 }}>
        <div className="stat-card navy">
          <div className="stat-label">Calls Today</div>
          <div className="stat-value">{DASHBOARD_METRICS.callsToday}</div>
          <div className="stat-delta up">↑ 3 vs yesterday</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-label">Avg Response</div>
          <div className="stat-value">{DASHBOARD_METRICS.avgResponseTime}</div>
          <div className="stat-note">target: &lt;2s ✓</div>
        </div>
        <div className="stat-card green">
          <div className="stat-label">Accuracy</div>
          <div className="stat-value">{DASHBOARD_METRICS.accuracyRate}</div>
          <div className="stat-delta up">↑ 0.8% this week</div>
        </div>
        <div className="stat-card navy">
          <div className="stat-label">Satisfaction</div>
          <div className="stat-value">
            {DASHBOARD_METRICS.satisfactionScore}
            <span style={{ fontSize: 16, fontFamily: 'var(--font-body)', fontWeight: 400 }}>/5</span>
          </div>
          <div className="stat-delta up">★★★★★</div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16 }} className="fade-up-2">
        {/* Active Clients */}
        <div className="card">
          <div className="card-header" style={{ paddingBottom: 16 }}>
            <div>
              <div className="card-title">Active Clients</div>
              <div className="card-subtitle">Click on a client to open AI Client Assistant</div>
            </div>
            <span className="badge badge-navy">{CLIENTS.length} client{CLIENTS.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="card-body" style={{ paddingTop: 8 }}>
            {CLIENTS.map((client) => (
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
                    {client.department} · {client.yearsOfService} years service
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
          <div className="card-footer">
            <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>Updated at 09:41 AM</span>
            <Link href="/copilot" className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }}>
              Open Client Assistant ›
            </Link>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Policy Changes */}
          <div className="card">
            <div className="card-header" style={{ paddingBottom: 16 }}>
              <div className="card-title">Recent Policy Changes</div>
              <div className="card-subtitle">California Pension Updates</div>
            </div>
            <div className="card-body" style={{ paddingTop: 8 }}>
              {POLICY_CHANGES.map((change) => (
                <div key={change.id} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--gray-200)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                    <span className={change.impactLevel === 'high' ? 'badge badge-red' : 'badge badge-gold'} style={{ fontSize: 10 }}>
                      {change.impactLevel === 'high' ? 'HIGH IMPACT' : 'MEDIUM'}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>
                        {change.title}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--gray-600)', lineHeight: 1.5, marginBottom: 6 }}>
                        {change.summary}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>
                        Effective: {change.effectiveDate} · {change.affectedClients} clients affected
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer">
              <Link href="/policy-updates" className="btn btn-ghost btn-sm" style={{ color: 'var(--navy)', marginLeft: 'auto' }}>
                View All Updates ›
              </Link>
            </div>
          </div>

          {/* Query Activity */}
          <div className="card">
            <div className="card-header" style={{ paddingBottom: 16 }}>
              <div className="card-title">Today's Query Activity</div>
            </div>
            <div className="card-body" style={{ paddingTop: 8 }}>
              {[
                { icon: '📊', label: 'Retirement Eligibility', value: '5', pct: 42 },
                { icon: '🔍', label: 'Policy Change Impact', value: '4', pct: 33 },
                { icon: '📅', label: 'Sick/Vacation Days', value: '2', pct: 17 },
                { icon: '💰', label: 'Benefit Calculations', value: '1', pct: 8 },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, color: 'var(--gray-800)' }}>
                      {item.icon} {item.label}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>
                      {item.value}
                    </span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill progress-navy"
                      style={{ width: `${item.pct}%`, opacity: 0.75 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
