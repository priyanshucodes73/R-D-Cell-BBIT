# SMTP Email Setup Guide for BBIT R&D Cell

## 📧 Email Verification System Overview

The application uses **Nodemailer** to send verification emails when users sign up. Currently configured in `backend/src/index.js` (lines 17-83).

---

## 🔧 Quick Setup (Gmail)

### Step 1: Enable 2-Step Verification
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click **2-Step Verification** and enable it
3. Follow the prompts to set up

### Step 2: Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select **"Mail"** and **"Other (Custom name)"**
3. Enter: `BBIT R&D Cell`
4. Click **Generate**
5. Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)

### Step 3: Update docker-compose.yml
```yaml
backend:
  environment:
    EMAIL_SERVICE: gmail
    EMAIL_USER: your-actual-email@gmail.com
    EMAIL_PASSWORD: xxxx xxxx xxxx xxxx  # Paste your app password
    FRONTEND_URL: http://localhost:3005
```

### Step 4: Restart Backend
```bash
docker-compose restart backend
```

---

## 🔌 Alternative Email Providers

### Microsoft Outlook/Hotmail
```yaml
EMAIL_SERVICE: hotmail
EMAIL_USER: your-email@outlook.com
EMAIL_PASSWORD: your-password
```

### Yahoo Mail
```yaml
EMAIL_SERVICE: yahoo
EMAIL_USER: your-email@yahoo.com
EMAIL_PASSWORD: your-app-password
```
*Note: Yahoo also requires App Password - generate at [Yahoo Account Security](https://login.yahoo.com/account/security)*

### Custom SMTP (SendGrid, AWS SES, Mailgun)

For SendGrid:
```yaml
EMAIL_HOST: smtp.sendgrid.net
EMAIL_PORT: 587
EMAIL_SECURE: false
EMAIL_USER: apikey
EMAIL_PASSWORD: your-sendgrid-api-key
```

For AWS SES:
```yaml
EMAIL_HOST: email-smtp.us-east-1.amazonaws.com
EMAIL_PORT: 587
EMAIL_SECURE: false
EMAIL_USER: your-smtp-username
EMAIL_PASSWORD: your-smtp-password
```

---

## 📝 Current Implementation Details

### Location: `backend/src/index.js`

**Lines 17-23: SMTP Configuration**
```javascript
const emailTransporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER || "noreply@bbit.edu.in",
    pass: process.env.EMAIL_PASSWORD || "your-app-password"
  }
});
```

**Lines 26-83: Email Sending Function**
```javascript
const sendVerificationEmail = async (email, verificationToken, firstName) => {
  // Sends HTML email with verification link
  // Returns true/false based on success
}
```

### Email Template Features:
- ✅ Professional HTML design with BBIT branding
- ✅ Blue gradient header
- ✅ Clickable verification button
- ✅ Fallback verification link
- ✅ 24-hour expiry notice
- ✅ BBIT contact footer

---

## 🧪 Testing Email Sending

### Method 1: Test Endpoint (Add this temporarily)
Add to `backend/src/index.js`:
```javascript
app.get("/api/test-email", async (req, res) => {
  try {
    const testEmail = await sendVerificationEmail(
      "test@example.com",
      "test-token-12345",
      "Test User"
    );
    res.json({ 
      success: testEmail, 
      message: testEmail ? "Email sent!" : "Email failed"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Method 2: Sign Up Test
1. Start all services: `docker-compose up`
2. Go to: http://localhost:3005/register
3. Fill form and submit
4. Check email inbox for verification link

### Method 3: Check Backend Logs
```bash
docker-compose logs backend -f
```
Look for:
- ✅ `Verification email sent to user@example.com`
- ❌ `Email send error: [error details]`

---

## 🐛 Troubleshooting

### Error: "Invalid login: 535-5.7.8 Username and Password not accepted"
**Solution:** You're using your regular Gmail password instead of App Password
- Generate App Password (see Step 2 above)
- Update `EMAIL_PASSWORD` in docker-compose.yml

### Error: "self signed certificate in certificate chain"
**Solution:** Add to email transporter config:
```javascript
const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: { ... },
  tls: { rejectUnauthorized: false }
});
```

### Error: "Connection timeout"
**Solution:** Check if port 587/465 is blocked by firewall
- Gmail uses port 587 (TLS) or 465 (SSL)
- Try alternative: `EMAIL_PORT: 465` with `EMAIL_SECURE: true`

### Emails not arriving
**Checklist:**
1. ✅ Check spam/junk folder
2. ✅ Verify EMAIL_USER is correct email address
3. ✅ Check backend logs for send confirmation
4. ✅ Try sending to different email address
5. ✅ Test with Mailtrap.io for development

---

## 🔒 Security Best Practices

### 1. Never Commit Credentials
Add to `.gitignore`:
```
backend/.env
docker-compose.override.yml
```

### 2. Use Environment Variables
Create `docker-compose.override.yml` (not tracked by git):
```yaml
version: '3.8'
services:
  backend:
    environment:
      EMAIL_USER: real-email@gmail.com
      EMAIL_PASSWORD: real-app-password
```

### 3. Production Setup
- Use dedicated email service (SendGrid, AWS SES)
- Set up SPF, DKIM, DMARC records
- Use rate limiting for email sending
- Monitor email delivery rates

---

## 📊 Email Sending Flow

```
User Signs Up
    ↓
Backend creates user (isVerified: false)
    ↓
Generate JWT verification token (24h expiry)
    ↓
Call sendVerificationEmail()
    ↓
Nodemailer sends HTML email via SMTP
    ↓
User receives email with link
    ↓
User clicks "Verify Email" button
    ↓
Redirects to /verify-email?token=...
    ↓
Backend validates token
    ↓
Updates user.isVerified = true
    ↓
User redirected to login
```

---

## 🆘 Need Help?

**Check backend logs:**
```bash
docker-compose logs backend --tail=100
```

**Restart services:**
```bash
docker-compose down
docker-compose up --build
```

**Verify environment variables:**
```bash
docker-compose exec backend env | grep EMAIL
```

---

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Creates user, sends verification email |
| GET | `/api/auth/verify-email?token=xxx` | Verifies email with token |
| POST | `/api/auth/resend-verification` | Resends verification email |

---

**Last Updated:** December 10, 2025  
**Nodemailer Version:** 6.9.7  
**Status:** ✅ Implemented, ⚠️ Needs SMTP credentials
