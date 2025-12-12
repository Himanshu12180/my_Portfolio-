# 🚀 DEPLOYMENT CHECKLIST

Complete checklist for deploying your spiritual UI portfolio to production.

---

## Pre-Deployment Verification

### Code Quality

- [ ] **No Console Errors**: Run `npm run dev`, open DevTools (F12), check Console tab
- [ ] **No TypeScript Errors**: If using TypeScript, verify `npm run build` succeeds
- [ ] **No Missing Dependencies**: All imports resolve correctly
- [ ] **GSAP Cleanup Working**: Close DevTools → open again (no memory leak spike)

### Performance

- [ ] **Lighthouse Score**: Run `npm run build`, test with Lighthouse (target 90+)
- [ ] **60 FPS Scrolling**: Scroll through Hero section smoothly
- [ ] **3D Rendering**: Canvas renders without black screen or artifacts
- [ ] **Mobile Performance**: Test on actual mobile device or DevTools emulation
- [ ] **Load Time**: Hero section loads in <2 seconds

### Responsiveness

- [ ] **Desktop (1920px)**: Full animations visible
- [ ] **Laptop (1366px)**: All components properly positioned
- [ ] **Tablet (768px)**: Graceful degradation (parallax disabled)
- [ ] **Mobile (375px)**: Fallback rendering works
- [ ] **Mobile (412px)**: Text readable, no overflow

### Accessibility

- [ ] **prefers-reduced-motion**: Disable animations in OS settings, verify all animations gone
- [ ] **Keyboard Navigation**: Tab through page, can access all elements
- [ ] **Screen Reader**: Test with NVDA/JAWS (optional but recommended)
- [ ] **Color Contrast**: Text readable on all backgrounds

### Browser Compatibility

- [ ] **Chrome 90+**: Test latest version
- [ ] **Firefox 88+**: Test latest version
- [ ] **Safari 14+**: Test latest version
- [ ] **Edge 90+**: Test latest version
- [ ] **Mobile Safari**: Test on actual iOS device
- [ ] **Mobile Chrome**: Test on actual Android device

---

## File Verification

### Components Exist

```bash
# Run these commands to verify all files
ls src/components/KrishnaGlow.jsx        # Should exist (200 lines)
ls src/components/FluteParallax.jsx      # Should exist (140 lines)
ls src/components/PeacockFeather3D.jsx   # Should exist (130 lines)
ls src/sections/Hero.jsx                 # Should exist (350+ lines)
ls src/spiritual-animations.css          # Should exist (265 lines)
```

### Imports Verified

- [ ] `App.jsx` imports `spiritual-animations.css`
- [ ] `Hero.jsx` imports `KrishnaGlow` from components
- [ ] `Hero.jsx` imports `FluteParallax` from components
- [ ] `Hero.jsx` imports `PeacockFeatherCanvas` from components
- [ ] `Hero.jsx` imports `spiritual-animations.css`

### Dependencies Installed

```bash
# All should be in package.json
npm list gsap                    # ^3.14.1
npm list @react-three/fiber     # ^8.18.0
npm list @react-three/drei      # ^9.122.0
npm list three                  # ^0.158.0
npm list react                  # ^18.2.0
npm list react-dom              # ^18.2.0
```

---

## Build Process

### Local Build

```bash
# Test build locally
npm run build

# Check build output
ls dist/

# Should see: index.html, assets/index-*.js, assets/index-*.css
```

### Bundle Size

- [ ] Main bundle < 500KB (with all dependencies)
- [ ] CSS bundle < 50KB
- [ ] No unused dependencies

### Build Optimization

- [ ] Tree-shaking enabled (no dead code)
- [ ] Minification enabled
- [ ] Source maps excluded from production
- [ ] Assets optimized (images, fonts)

---

## Deployment Steps

### Choose Your Platform

#### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Follow prompts:
# - Select project directory
# - Confirm build settings
# - Deploy!
```

#### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy from project root
netlify deploy

# Or connect GitHub:
# - Push to GitHub
# - Connect repo in netlify.com
# - Auto-deploys on every push
```

#### Option 3: Docker + Any Server

```dockerfile
# Create Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

```bash
# Build and run
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

### Environment Variables

- [ ] No hardcoded API keys (use .env.local)
- [ ] No console.log statements in production code
- [ ] No debug flags left enabled

---

## Post-Deployment Verification

### Live Site Checks

```bash
# Replace with your actual domain
DOMAIN="https://yourdomain.com"

# Check HTTP headers
curl -I $DOMAIN

# Check SSL certificate
openssl s_client -connect yourdomain.com:443

# Check page load
time curl -s $DOMAIN | head -20
```

### Visual Verification

- [ ] Hero section loads correctly
- [ ] Krishna glow visible (if not on mobile)
- [ ] Flute parallax responds to scroll
- [ ] 3D peacock feather renders
- [ ] Scroll animations smooth
- [ ] Navbar functional
- [ ] All links clickable
- [ ] Footer visible

### Functionality Tests

- [ ] Scroll down page: Animations trigger
- [ ] Move mouse over 3D canvas: Camera follows
- [ ] Hover on elements: Glow effects appear
- [ ] Resize window: Layout adapts
- [ ] Mobile view: Fallback renders
- [ ] Form submission: Works (if applicable)
- [ ] External links: Open correctly

### Analytics Setup

- [ ] Google Analytics installed (optional)
- [ ] Error tracking (Sentry/Rollbar)
- [ ] Performance monitoring (optional)
- [ ] SEO meta tags correct

---

## Performance Optimization (Post-Deploy)

### Image Optimization

- [ ] Compress all images (TinyPNG/ImageOptim)
- [ ] Use WebP format where possible
- [ ] Lazy load images below fold
- [ ] Responsive image sizes

### Code Optimization

- [ ] Remove unused CSS
- [ ] Remove unused JavaScript
- [ ] Minimize JavaScript bundle
- [ ] Enable gzip compression on server

### Server Optimization

- [ ] Enable caching headers (Cache-Control)
- [ ] Set up CDN for static assets
- [ ] Enable HTTP/2
- [ ] Use HTTP Compression (gzip/brotli)

---

## Maintenance Checklist

### Regular Tasks

- [ ] Monitor error logs (weekly)
- [ ] Check performance metrics (weekly)
- [ ] Review analytics (monthly)
- [ ] Update dependencies (monthly)
- [ ] Backup database (if applicable)
- [ ] Test mobile compatibility (monthly)

### Update Process

```bash
# Check for outdated dependencies
npm outdated

# Update safely
npm update

# Update specific package
npm update gsap

# Run tests after update
npm run build
npm run dev  # Test locally
```

### Security

- [ ] No hardcoded secrets in code
- [ ] HTTPS enabled (automatic on Vercel/Netlify)
- [ ] Security headers set (CSP, HSTS, X-Frame-Options)
- [ ] Dependencies scanned for vulnerabilities

```bash
# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## Rollback Plan

If something goes wrong after deployment:

### Vercel Rollback
```bash
vercel --prod --rm  # Remove latest deployment
vercel --prod       # Redeploy previous version
```

### Git Rollback
```bash
git log --oneline | head -10
git reset --hard <previous-commit-hash>
git push origin main --force
```

### Manual Backup
- [ ] Keep local backup of working version
- [ ] Tag releases in Git: `git tag -a v1.0.0 -m "Deployment v1.0"`
- [ ] Store deployment artifacts separately

---

## Final Verification Template

Before claiming deployment complete, verify:

```
✅ All components rendering correctly
✅ No console errors or warnings
✅ Scroll animations smooth (60 FPS)
✅ 3D canvas not black/corrupted
✅ Mobile responsive (tested on real device)
✅ Accessibility features working (prefers-reduced-motion)
✅ All links functional
✅ Performance acceptable (Lighthouse 90+)
✅ SSL certificate valid
✅ Analytics tracking (if set up)
✅ Error logging working (if set up)
✅ Backups created
✅ Team notified of deployment
```

---

## Monitoring & Support

### Set Up Monitoring

```bash
# Option 1: Sentry (Error Tracking)
npm install @sentry/react
# Configure in src/main.jsx

# Option 2: LogRocket (Session Replay)
npm install logrocket
# Configure in src/main.jsx
```

### Performance Monitoring

```bash
# Use Vercel Analytics (built-in)
# Or use Google Analytics
# Or use Plausible Analytics

# Check Core Web Vitals
# - LCP (Largest Contentful Paint): < 2.5s
# - FID (First Input Delay): < 100ms
# - CLS (Cumulative Layout Shift): < 0.1
```

---

## Documentation for Team

Share these files with your team:

- [ ] `README.md` - Project overview
- [ ] `SPIRITUAL_UI_QUICKSTART.md` - Feature guide
- [ ] `SPIRITUAL_UI_INTEGRATION.md` - Technical guide
- [ ] `SPIRITUAL_UI_CODE_EXAMPLES.md` - Code patterns
- [ ] Deployment URL and credentials (in secure location)

---

## Estimated Timeline

- **Preparation**: 30 minutes
- **Local Testing**: 30 minutes
- **Build & Deploy**: 5 minutes
- **Live Verification**: 15 minutes
- **Optimization**: 30 minutes
- **Total**: ~2 hours for complete deployment

---

## Deployment Completed ✅

Once all checkboxes are marked, you're production-ready!

**Deployment Date**: _______________  
**Deployed URL**: _______________  
**Verifier Name**: _______________  

---

## Quick Reference

### Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview build locally
npm run preview

# Check for errors
npm run build

# Check dependencies
npm outdated
npm audit
```

### Useful Links

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **React Docs**: https://react.dev
- **GSAP Docs**: https://gsap.com/docs
- **Three.js Docs**: https://threejs.org/docs

---

**Last Updated**: Pre-Production  
**Status**: Ready for Deployment ✅  
**Version**: 1.0.0  

