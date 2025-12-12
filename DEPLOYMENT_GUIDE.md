# DEPLOYMENT_GUIDE.md

## Deploying Your Portfolio

Complete step-by-step guides for deploying to popular platforms.

## 🎯 Quick Deployment Checklist

- [ ] Replace all `example.com` links with real ones
- [ ] Update GitHub username in `Projects.jsx`
- [ ] Update contact information in `Contact.jsx`
- [ ] Set up form submission (Formspree or backend)
- [ ] Test locally with `npm run dev`
- [ ] Build and preview with `npm run build && npm run preview`
- [ ] Deploy to hosting platform
- [ ] Set up custom domain (optional)
- [ ] Monitor performance and errors

## 📦 Platform-Specific Guides

### Vercel (Recommended)

**Pros**: Free, blazing fast, serverless functions, easy setup

1. **Create Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Connect Repository**
   - Import your GitHub repo
   - Vercel auto-detects Vite
   - Click Deploy

3. **Environment Variables** (if needed)
   ```
   VITE_GITHUB_USERNAME=your-username
   ```

4. **Setup Contact API**
   - Create `api/contact.js`:

   ```javascript
   import nodemailer from "nodemailer";

   export default async function handler(req, res) {
     if (req.method !== "POST") {
       return res.status(405).json({ error: "Method not allowed" });
     }

     const { name, email, message, subject } = req.body;

     // Validate
     if (!name || !email || !message) {
       return res.status(400).json({ error: "Missing fields" });
     }

     try {
       const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
           user: process.env.EMAIL_USER,
           pass: process.env.EMAIL_PASS, // Use app password, not Gmail password
         },
       });

       await transporter.sendMail({
         from: email,
         to: process.env.EMAIL_USER,
         subject: `Portfolio Contact: ${subject}`,
         html: `
           <h2>New message from ${name}</h2>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Subject:</strong> ${subject}</p>
           <p><strong>Message:</strong></p>
           <p>${message.replace(/\n/g, "<br>")}</p>
         `,
       });

       res.status(200).json({ success: true });
     } catch (error) {
       console.error("Email error:", error);
       res.status(500).json({ error: "Failed to send email" });
     }
   }
   ```

   - Add environment variables in Vercel settings:
     - `EMAIL_USER`: Your email
     - `EMAIL_PASS`: Your Gmail app password
     - `VITE_API_ENDPOINT`: `/api/contact`

   - Update `src/sections/Contact.jsx`:
     ```javascript
     const response = await fetch("/api/contact", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(formData),
     });
     ```

5. **Custom Domain** (paid)
   - Settings → Domains
   - Connect your domain registrar

### Netlify

**Pros**: Free, easy, good for static sites, form handling

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect GitHub, select repo

2. **Build Settings**
   ```
   Build Command: npm run build
   Publish Directory: dist
   ```

3. **Netlify Functions for Contact**
   - Create `netlify/functions/contact.js`:

   ```javascript
   const nodemailer = require("nodemailer");

   exports.handler = async (event) => {
     if (event.httpMethod !== "POST") {
       return { statusCode: 405, body: "Method not allowed" };
     }

     const { name, email, message, subject } = JSON.parse(event.body);

     try {
       const transporter = nodemailer.createTransport({
         host: process.env.SMTP_HOST,
         port: 587,
         auth: {
           user: process.env.SMTP_USER,
           pass: process.env.SMTP_PASS,
         },
       });

       await transporter.sendMail({
         from: `noreply@yoursite.com`,
         replyTo: email,
         to: process.env.SMTP_USER,
         subject: `New message from ${name}`,
         html: `<p>${message}</p>`,
       });

       return {
         statusCode: 200,
         body: JSON.stringify({ success: true }),
       };
     } catch (error) {
       return {
         statusCode: 500,
         body: JSON.stringify({ error: error.message }),
       };
     }
   };
   ```

   - Add env variables in Netlify settings
   - Update fetch URL: `/api/contact`

### Railway

**Pros**: Full backend support, databases, deployment logs

1. **Create Project**
   - Go to [railway.app](https://railway.app)
   - Create new project
   - Connect GitHub

2. **Deploy Backend**
   - Create Express server in `server/` folder
   - `Railway` detects `Procfile`
   - Deploy automatically

3. **Backend Example** (Express)

   ```javascript
   // server/index.js
   import express from "express";
   import cors from "cors";
   import nodemailer from "nodemailer";

   const app = express();
   app.use(express.json());
   app.use(cors());

   app.post("/api/contact", async (req, res) => {
     const { name, email, message, subject } = req.body;

     try {
       // Send email logic
       res.json({ success: true });
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });

   app.listen(3001, () => console.log("Server running"));
   ```

### GitHub Pages

**Pros**: Free, simple, no backend

```bash
# 1. Update vite.config.js
export default {
  base: '/portfolio/', // if deploying to subdirectory
  // ...
}

# 2. Build
npm run build

# 3. Deploy
git add dist
git commit -m "Deploy"
git push
```

## 📧 Email Service Providers

### Formspree (Easiest)

```
1. Sign up at formspree.io
2. Create form, get form ID
3. Update Contact.jsx:
   - Change fetch URL to: https://formspree.io/f/YOUR_ID
4. No backend needed!
```

### SendGrid

```javascript
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: process.env.CONTACT_EMAIL,
  from: "noreply@yoursite.com",
  subject: `Portfolio: ${subject}`,
  html: message,
});
```

### Gmail + Nodemailer

```javascript
// Use app password (not account password)
// Enable 2FA first: myaccount.google.com/apppasswords
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});
```

## 🎯 Monitoring & Maintenance

### Performance Monitoring

- **Vercel Analytics**: Auto-enabled
- **Lighthouse CI**: Automated performance checks
- **Sentry**: Error tracking (free tier available)

```javascript
// Add to main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.MODE,
});
```

### SEO & Search Engines

```html
<!-- Add to index.html -->
<meta name="description" content="Full-stack developer specializing in React and 3D web experiences" />
<meta name="keywords" content="react, three.js, web development" />
<meta property="og:title" content="Your Name - Developer" />
<meta property="og:description" content="Portfolio website" />
<meta property="og:image" content="https://yoursite.com/og-image.png" />
```

## 🔒 Security Checklist

- [ ] Remove sensitive data from code
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Rate limit contact form (Vercel: default 10 req/min)
- [ ] Validate all form inputs
- [ ] Sanitize user input on backend
- [ ] Set CORS headers appropriately
- [ ] Use secure email patterns (no plaintext in logs)

## 📊 Deployment Comparison

| Feature | Vercel | Netlify | Railway | GitHub Pages |
|---------|--------|---------|---------|--------------|
| Free Tier | Yes | Yes | Yes | Yes |
| Serverless Functions | ✅ | ✅ | ❌ | ❌ |
| Database Support | ❌ | ❌ | ✅ | ❌ |
| Custom Domain | ✅ | ✅ | ✅ | ✅ |
| Auto Deploys | ✅ | ✅ | ✅ | ✅ |
| Build Time | Fast | Fast | Slower | Fast |
| Ease of Setup | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |

## 🆘 Troubleshooting Deployments

### Build fails
```bash
# Check local build
npm run build

# Check build logs in platform
# Usually missing env variables or syntax errors
```

### Website shows blank page
```bash
# Check base path in vite.config.js
# Check if CSS/JS are loading (DevTools → Network)
# Check console for errors
```

### Form not working
```bash
# Test endpoint: curl -X POST http://localhost:3000/api/contact
# Check CORS settings
# Verify environment variables are set
```

---

**Happy Deploying! 🚀**
