'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 68px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      background: 'var(--gray-50)',
    }}>
      {/* Logo mark */}
      <div className="fade-up" style={{ marginBottom: 24 }}>
        <svg width="112" height="112" viewBox="0 0 108 108" fill="none" aria-hidden="true">
          <path d="M54 98 A44 44 0 1 1 98 54" stroke="var(--navy)" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
          <path d="M54 84 A30 30 0 1 1 64.3 25.8" stroke="#3D7A56" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8"/>
          <line x1="22" y1="86" x2="82" y2="26" stroke="var(--navy)" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
          <line x1="82" y1="26" x2="97" y2="11" stroke="#E8B458" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="82" cy="26" r="6" fill="#E8B458"/>
          <circle cx="82" cy="26" r="3" fill="#1B2B4B"/>
          <circle cx="54" cy="98" r="5" fill="var(--navy)" opacity="0.35"/>
          <circle cx="98" cy="54" r="5" fill="#3D7A56"/>
        </svg>
      </div>

      {/* Hero */}
      <div className="fade-up-1" style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 36,
          fontWeight: 600,
          color: 'var(--navy)',
          marginBottom: 12,
        }}>
          Welcome to FinServe Analytics
        </h1>
        <p style={{ fontSize: 15, color: 'var(--gray-500)', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
          AI-powered pension management platform for Financial Advisors and Relationship Managers
        </p>
      </div>

      {/* Portal card */}
      <div className="fade-up-2" style={{ maxWidth: 480, width: '100%' }}>
        <Link href="/rm" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            border: '2px solid var(--gray-200)',
            padding: '48px 40px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: 'var(--shadow-sm)',
          }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--navy)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--gray-200)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div style={{ fontSize: 52, marginBottom: 20 }}>🏦</div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 24,
              fontWeight: 600,
              color: 'var(--navy)',
              marginBottom: 12,
            }}>
              Relationship Manager Portal
            </div>
            <div style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: 28 }}>
              Access your dashboard, AI Client Assistant, and client pension accounts.
              Get instant answers to California pension policy questions.
            </div>
            <span className="btn btn-primary" style={{ display: 'inline-block', fontSize: 15, padding: '12px 32px' }}>
              Sign In →
            </span>
          </div>
        </Link>
      </div>

      {/* Footer note */}
      <p className="fade-up-3" style={{ marginTop: 48, fontSize: 12, color: 'var(--gray-400)' }}>
        Powered by Amazon Bedrock · Demo Environment
      </p>
    </div>
  );
}
