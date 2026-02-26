'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Logo = () => (
  <svg width="38" height="38" viewBox="0 0 108 108" fill="none" aria-hidden="true">
    <path d="M54 98 A44 44 0 1 1 98 54" stroke="rgba(255,255,255,0.9)" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
    <path d="M54 84 A30 30 0 1 1 64.3 25.8" stroke="#3D7A56" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8"/>
    <line x1="22" y1="86" x2="82" y2="26" stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="82" y1="26" x2="97" y2="11" stroke="#E8B458" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="82" cy="26" r="6" fill="#E8B458"/>
    <circle cx="82" cy="26" r="3" fill="#1B2B4B"/>
    <circle cx="54" cy="98" r="5" fill="rgba(255,255,255,0.55)"/>
    <circle cx="98" cy="54" r="5" fill="#3D7A56"/>
  </svg>
);

export default function TopBar() {
  const pathname = usePathname();

  const isRm = pathname.startsWith('/rm') || pathname.startsWith('/copilot') || pathname.startsWith('/policy-updates') || pathname.startsWith('/accounts');
  const isLanding = pathname === '/';

  const isActive = (href: string) => {
    if (href === '/rm') return pathname === '/rm';
    return pathname.startsWith(href);
  };

  return (
    <nav className="topbar">
      {/* Logo — always links back to landing */}
      <Link href="/" className="topbar-logo" style={{ textDecoration: 'none' }}>
        <Logo />
        <div className="topbar-logo-text">
          <span className="t-brand">FinServe Analytics</span>
          <span className="t-sub">
            {isRm ? 'Financial & Pension Management' : 'AI-Powered Pension Support'}
          </span>
        </div>
      </Link>

      {/* Right group — nav + account */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 0 }}>

        {/* RM nav */}
        {isRm && (
          <div className="topbar-nav">
            <Link href="/rm" className={`topbar-link ${isActive('/rm') ? 'active' : ''}`}>
              Dashboard
            </Link>
            <Link href="/copilot" className={`topbar-link ${isActive('/copilot') ? 'active' : ''}`}>
              AI Client Assistant
            </Link>
            <Link href="/accounts" className={`topbar-link ${isActive('/accounts') ? 'active' : ''}`}>
              Accounts
            </Link>
            <Link href="/policy-updates" className={`topbar-link ${isActive('/policy-updates') ? 'active' : ''}`}>
              Policy Updates
            </Link>
          </div>
        )}

        {/* Landing — portal link */}
        {isLanding && (
          <div className="topbar-nav">
            <Link href="/rm" className="topbar-link">RM Portal</Link>
          </div>
        )}

        {/* Divider + account */}
        <div className="topbar-right" style={{ paddingLeft: 16, marginLeft: 16, borderLeft: '1px solid rgba(255,255,255,0.12)' }}>
          {isRm && (
            <>
              <span className="topbar-user">Sophia Chen</span>
              <div className="topbar-avatar" style={{ padding: 0, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/sophia.png" alt="Sophia Chen" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
            </>
          )}
          {isLanding && (
            <span className="topbar-user" style={{ fontSize: 11 }}>Sign In</span>
          )}
        </div>

      </div>
    </nav>
  );
}
