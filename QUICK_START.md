# Quick Start Guide

Get your portfolio running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

This installs:
- React 18
- Vite (build tool)
- Three.js & @react-three/fiber (3D graphics)
- Framer Motion (animations)
- Tailwind CSS (styling)

## Step 2: Start Development Server

```bash
npm run dev
```

Open browser to `http://localhost:5173`

**You should see:**
- Full-page slide with 3D animated icosahedron
- Navigation dots on the right
- Smooth scrolling/arrow key navigation

## Step 3: Customize Your Info

### Update GitHub Username
File: `src/sections/Projects.jsx` (line ~97)
```javascript
const GITHUB_USERNAME = "your-github-username";
```

### Update Contact Info
File: `src/sections/Contact.jsx` (around line 162)
```javascript
{
  label: "Email",
  value: "your@email.com",
  link: "mailto:your@email.com",
  icon: "✉️",
},
{
  label: "LinkedIn",
  value: "in/yourname",
  link: "https://linkedin.com/in/yourname",
  icon: "💼",
},
```

### Update About Section
File: `src/sections/About.jsx`
- Modify the bio text
- Update skills array
- Customize statistics

## Step 4: Test Navigation

Try:
- **Arrow keys** - Navigate between slides
- **Mouse wheel** - Scroll to next slide
- **Click dots** - Jump to specific slide
- **Click navbar** - Direct navigation
- **Mobile** - Tap and scroll naturally

## Step 5: Build for Production

```bash
npm run build
```

Creates optimized `dist/` folder ready for deployment.

## Step 6: Preview Production Build

```bash
npm run preview
```

Test the optimized build locally.

## 🚀 Deploy (Choose One)

### Fastest: Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Follow the prompts. Your site is live in seconds!

### Easy: Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Free: GitHub Pages

Push `dist/` folder to `gh-pages` branch.

## ✅ Verification Checklist

After setup, verify:

- [ ] Development server runs (`npm run dev`)
- [ ] All 5 slides navigate smoothly
- [ ] GitHub projects load (or show fallback)
- [ ] Contact form appears
- [ ] 3D scene renders in Hero
- [ ] Responsive on mobile (test with DevTools)
- [ ] No console errors

## 📝 Key Files to Customize

| File | Purpose | What to Change |
|------|---------|-----------------|
| `src/sections/Hero3D.jsx` | Hero section | Replace 3D mesh or add GLB model |
| `src/sections/About.jsx` | About section | Update bio and skills |
| `src/sections/Projects.jsx` | Projects section | Set GitHub username |
| `src/sections/Contact.jsx` | Contact section | Add your contact info |
| `src/sections/Services.jsx` | Services section | List your services |
| `tailwind.config.js` | Colors & theme | Customize brand colors |

## 🎨 Customization Tips

### Change Primary Color
`tailwind.config.js`:
```javascript
extend: {
  colors: {
    indigo: { // Change to your brand color
      400: "#6366f1",
      500: "#4f46e5",
      600: "#4338ca",
    },
  },
}
```

### Disable 3D on Mobile
`src/sections/Hero3D.jsx` - Already optimized! Canvas auto-disables on mobile.

### Speed Up/Slow Down Animations
`src/components/SlideWrapper.jsx`:
```javascript
transition: {
  duration: 0.8, // Increase for slower animations
}
```

### Change Slide Content
Edit sections in `src/sections/` folder. They're standard React components!

## 🆘 Common Issues

**Canvas not rendering?**
- Check if WebGL is supported (DevTools → More Tools → WebGL Inspector)
- Try different browser (Chrome, Firefox)

**GitHub projects not loading?**
- Check internet connection
- API might be rate-limited (resets hourly)
- Falls back to manual projects automatically

**Animations feel stuttery?**
- Check "Reduce motion" setting in OS
- Close other browser tabs
- Check GPU acceleration is enabled

**Mobile looks broken?**
- Refresh page
- Check responsive mode in DevTools
- Try different viewport size

## 📚 Learn More

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Three.js Docs](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

## 🎯 Next Steps

1. ✅ Get it running locally
2. ✅ Customize with your info
3. ✅ Test all features
4. ✅ Deploy to Vercel/Netlify
5. ✅ Add custom domain
6. ✅ Share with the world!

## 💡 Pro Tips

- Use `npm run build && npm run preview` to test production build locally
- Check Lighthouse score: DevTools → Lighthouse
- Monitor performance: DevTools → Performance tab
- Test on real devices before deploying
- Use browser DevTools to adjust styles in real-time

---

**You're all set! Happy coding! 🎉**

Any questions? Check [PORTFOLIO_README.md](./PORTFOLIO_README.md) for more details.
