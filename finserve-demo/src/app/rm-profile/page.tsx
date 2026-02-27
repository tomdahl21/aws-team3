'use client';

import Link from 'next/link';

export default function RMProfilePage() {
  const rmData = {
    name: 'Sophia Chen',
    title: 'Relationship Manager',
    email: 'sophia.chen@finserve.com',
    phone: '(714) 555-0890',
    department: 'Pension Advisory Services',
    location: 'Orange County, CA',
    employeeId: 'RM-2024-0847',
    startDate: 'September 2024',
    tenure: '5 months',
  };

  const stats = {
    activeClients: 12,
    totalCalls: 248,
    avgResponseTime: '1.6s',
    satisfactionScore: '4.8',
    queriesResolved: 186,
    accuracyRate: '97.2%',
  };

  const recentActivity = [
    { date: 'Feb 26, 2026', action: 'AI Session with Billy Thompson', details: 'Sick/vacation day policy questions' },
    { date: 'Feb 26, 2026', action: 'Client Call - Sarah Martinez', details: 'Retirement planning review' },
    { date: 'Feb 25, 2026', action: 'Policy Update Review', details: 'CA sick/vacation conversion rules' },
    { date: 'Feb 24, 2026', action: 'AI Session with Marcus Lee', details: 'Annual benefit review' },
    { date: 'Feb 23, 2026', action: 'Client Call - Robert Garcia', details: 'Early retirement penalty questions' },
  ];

  const accounts = [
    { name: 'Orange County', members: 2340, status: 'review' },
    { name: 'Los Angeles County', members: 4820, status: 'active' },
    { name: 'San Diego County', members: 3105, status: 'active' },
    { name: 'Riverside County', members: 1870, status: 'active' },
  ];

  return (
    <div className="page-container">
      {/* Page header */}
      <div className="page-header-row fade-up">
        <div>
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">Relationship Manager Dashboard</p>
        </div>
        <Link href="/rm" className="btn btn-outline btn-sm">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Profile Header Card */}
      <div className="card fade-up-1" style={{ marginBottom: 16 }}>
        <div className="card-body" style={{ padding: 32 }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            {/* Avatar */}
            <div style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
              border: '3px solid var(--navy)',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/sophia.png" 
                alt="Sophia Chen" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} 
              />
            </div>

            {/* RM Info */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <h2 style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: 32, 
                    fontWeight: 600, 
                    color: 'var(--navy)',
                    marginBottom: 4,
                  }}>
                    {rmData.name}
                  </h2>
                  <div style={{ fontSize: 18, color: 'var(--gray-600)', marginBottom: 8 }}>
                    {rmData.title}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--gray-500)' }}>
                    {rmData.department}
                  </div>
                </div>
                <span className="badge badge-green" style={{ fontSize: 13 }}>
                  Active
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Email</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{rmData.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Phone</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{rmData.phone}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Location</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{rmData.location}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Tenure</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{rmData.tenure}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }} className="fade-up-2">
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ fontSize: 36, fontWeight: 600, color: 'var(--navy)', marginBottom: 8 }}>
              {stats.activeClients}
            </div>
            <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>Active Clients</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ fontSize: 36, fontWeight: 600, color: 'var(--green)', marginBottom: 8 }}>
              {stats.totalCalls}
            </div>
            <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>Total Calls</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ fontSize: 36, fontWeight: 600, color: 'var(--gold)', marginBottom: 8 }}>
              {stats.satisfactionScore}
            </div>
            <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>Satisfaction Score</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="fade-up-3">
        
        {/* Performance Metrics */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Performance Metrics</div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>Queries Resolved</span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--navy)' }}>
                    {stats.queriesResolved}
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
                    width: '75%',
                    background: 'var(--navy)',
                    borderRadius: 4,
                  }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>Accuracy Rate</span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--green)' }}>
                    {stats.accuracyRate}
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
                    width: '97.2%',
                    background: 'var(--green)',
                    borderRadius: 4,
                  }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>Avg Response Time</span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--gold)' }}>
                    {stats.avgResponseTime}
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
                    width: '92%',
                    background: 'var(--gold)',
                    borderRadius: 4,
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Assignments */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Account Assignments</div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {accounts.map((account, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 12,
                    border: '1px solid var(--gray-200)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                      {account.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                      {account.members.toLocaleString()} members
                    </div>
                  </div>
                  <span className={`badge ${account.status === 'review' ? 'badge-gold' : 'badge-green'}`}>
                    {account.status === 'review' ? 'Under Review' : 'Active'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header">
            <div className="card-title">Recent Activity</div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {recentActivity.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: 16,
                    paddingBottom: 16,
                    borderBottom: idx < recentActivity.length - 1 ? '1px solid var(--gray-100)' : 'none',
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: item.action.includes('AI') ? 'var(--navy-lt)' : 
                                item.action.includes('Call') ? 'var(--green-lt)' : 'var(--gold-lt)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {item.action.includes('AI') && '💬'}
                    {item.action.includes('Call') && '📞'}
                    {item.action.includes('Policy') && '📋'}
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

        {/* Employment Details */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Employment Details</div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Employee ID</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{rmData.employeeId}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Start Date</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{rmData.startDate}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Department</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{rmData.department}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Office Location</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{rmData.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Quick Actions</div>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Link 
                href="/rm" 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--navy)';
                  e.currentTarget.style.borderColor = 'var(--navy)';
                  const icon = e.currentTarget.querySelector('.action-icon') as HTMLElement;
                  const text = e.currentTarget.querySelector('.action-text') as HTMLElement;
                  if (icon) icon.style.background = 'rgba(255,255,255,0.2)';
                  if (text) text.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = 'var(--gray-200)';
                  const icon = e.currentTarget.querySelector('.action-icon') as HTMLElement;
                  const text = e.currentTarget.querySelector('.action-text') as HTMLElement;
                  if (icon) icon.style.background = 'var(--navy-lt)';
                  if (text) text.style.color = 'var(--navy)';
                }}
              >
                <div 
                  className="action-icon"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'var(--navy-lt)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 12,
                    fontSize: 24,
                    transition: 'all 0.2s',
                  }}
                >
                  📊
                </div>
                <div className="action-text" style={{ fontSize: 14, fontWeight: 500, color: 'var(--navy)', transition: 'all 0.2s' }}>
                  Dashboard
                </div>
              </Link>

              <Link 
                href="/copilot" 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--green)';
                  e.currentTarget.style.borderColor = 'var(--green)';
                  const icon = e.currentTarget.querySelector('.action-icon') as HTMLElement;
                  const text = e.currentTarget.querySelector('.action-text') as HTMLElement;
                  if (icon) icon.style.background = 'rgba(255,255,255,0.2)';
                  if (text) text.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = 'var(--gray-200)';
                  const icon = e.currentTarget.querySelector('.action-icon') as HTMLElement;
                  const text = e.currentTarget.querySelector('.action-text') as HTMLElement;
                  if (icon) icon.style.background = 'var(--green-lt)';
                  if (text) text.style.color = 'var(--green)';
                }}
              >
                <div 
                  className="action-icon"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'var(--green-lt)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 12,
                    fontSize: 24,
                    transition: 'all 0.2s',
                  }}
                >
                  💬
                </div>
                <div className="action-text" style={{ fontSize: 14, fontWeight: 500, color: 'var(--green)', transition: 'all 0.2s' }}>
                  AI Assistant
                </div>
              </Link>

              <Link 
                href="/accounts" 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--gold)';
                  e.currentTarget.style.borderColor = 'var(--gold)';
                  const icon = e.currentTarget.querySelector('.action-icon') as HTMLElement;
                  const text = e.currentTarget.querySelector('.action-text') as HTMLElement;
                  if (icon) icon.style.background = 'rgba(255,255,255,0.2)';
                  if (text) text.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = 'var(--gray-200)';
                  const icon = e.currentTarget.querySelector('.action-icon') as HTMLElement;
                  const text = e.currentTarget.querySelector('.action-text') as HTMLElement;
                  if (icon) icon.style.background = 'var(--gold-lt)';
                  if (text) text.style.color = 'var(--gold)';
                }}
              >
                <div 
                  className="action-icon"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'var(--gold-lt)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 12,
                    fontSize: 24,
                    transition: 'all 0.2s',
                  }}
                >
                  🏢
                </div>
                <div className="action-text" style={{ fontSize: 14, fontWeight: 500, color: 'var(--gold)', transition: 'all 0.2s' }}>
                  Accounts
                </div>
              </Link>

              <Link 
                href="/policy-updates" 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--red)';
                  e.currentTarget.style.borderColor = 'var(--red)';
                  const icon = e.currentTarget.querySelector('.action-icon') as HTMLElement;
                  const text = e.currentTarget.querySelector('.action-text') as HTMLElement;
                  if (icon) icon.style.background = 'rgba(255,255,255,0.2)';
                  if (text) text.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = 'var(--gray-200)';
                  const icon = e.currentTarget.querySelector('.action-icon') as HTMLElement;
                  const text = e.currentTarget.querySelector('.action-text') as HTMLElement;
                  if (icon) icon.style.background = 'var(--red-lt)';
                  if (text) text.style.color = 'var(--red)';
                }}
              >
                <div 
                  className="action-icon"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'var(--red-lt)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 12,
                    fontSize: 24,
                    transition: 'all 0.2s',
                  }}
                >
                  📋
                </div>
                <div className="action-text" style={{ fontSize: 14, fontWeight: 500, color: 'var(--red)', transition: 'all 0.2s' }}>
                  Policy Updates
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
