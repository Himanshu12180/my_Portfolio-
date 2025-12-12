# 📋 CUSTOMIZATION CHECKLIST

Complete this checklist to personalize your portfolio.

## 🎯 Priority 1: Essential (Do First!)

These changes are required for the app to work properly.

### GitHub Integration
**File**: `src/sections/Projects.jsx` (line ~97)

```javascript
// CHANGE THIS:
const GITHUB_USERNAME = "Himanshu12180";

// TO THIS:
const GITHUB_USERNAME = "your-actual-github-username";
```

**Why**: Your GitHub projects won't load without your username.

---

## 🎨 Priority 2: Personal Info (Do Next!)

These changes make it YOUR portfolio.

### Contact Information
**File**: `src/sections/Contact.jsx` (around lines 162-180)

Replace the contact cards with YOUR information:

```javascript
{
  label: "Email",
  value: "hello@example.com",              // ← YOUR EMAIL
  link: "mailto:hello@example.com",        // ← YOUR EMAIL
  icon: "✉️",
},
{
  label: "LinkedIn",
  value: "in/yourprofile",                 // ← YOUR LINKEDIN
  link: "https://linkedin.com/in/yourprofile",  // ← YOUR LINKEDIN PROFILE
  icon: "💼",
},
{
  label: "GitHub",
  value: "github.com/yourname",            // ← YOUR GITHUB
  link: "https://github.com/yourname",     // ← YOUR GITHUB PROFILE
  icon: "🐙",
},
```

### About Section Bio
**File**: `src/sections/About.jsx` (around lines 50-65)

```javascript
<motion.p variants={itemVariants} className="text-lg text-gray-300 mb-4">
  // ← UPDATE THIS TEXT TO YOUR BIO
  I'm a full-stack developer passionate about creating beautiful, 
  performant web experiences. With expertise in React, Three.js...
</motion.p>
```

### Skills
**File**: `src/sections/About.jsx` (around lines 28-32)

```javascript
const skills = [
  { category: "Frontend", items: ["React", "Vue.js", "Tailwind CSS", "Framer Motion"] },
  { category: "3D & Graphics", items: ["Three.js", "WebGL", "@react-three/fiber", "GLSL"] },
  // ← UPDATE THESE TO YOUR SKILLS
];
```

### Statistics
**File**: `src/sections/About.jsx` (around lines 72-88)

```javascript
[
  { label: "Years Experience", value: "5+" },       // ← YOUR EXPERIENCE
  { label: "Projects Completed", value: "50+" },    // ← YOUR PROJECTS
  { label: "Happy Clients", value: "30+" },         // ← YOUR CLIENTS
  { label: "Open Source Contributions", value: "20+" }, // ← YOUR CONTRIBUTIONS
]
```

---

## 🛠️ Priority 3: Services (Customize!)

Describe the services you actually offer.

### Services List
**File**: `src/sections/Services.jsx` (around lines 25-48)

```javascript
const services = [
  {
    id: 1,
    title: "Frontend Development",          // ← YOUR SERVICE NAME
    description: "Modern, responsive web applications...",  // ← YOUR DESCRIPTION
    icon: "🎨",                             // ← YOUR EMOJI
    color: "#6366f1",                       // ← YOUR COLOR
  },
  // ← ADD/REMOVE/MODIFY MORE SERVICES
];
```

---

## 📁 Priority 4: Manual Projects (Good to Have)

If GitHub doesn't load, these show as fallback.

### Fallback Projects
**File**: `src/sections/Projects.jsx` (around lines 12-48)

```javascript
const MANUAL_PROJECTS = [
  {
    id: "p1",
    name: "Your Project Name",              // ← YOUR PROJECT
    description: "What it does...",         // ← YOUR DESCRIPTION
    tech: ["Tech1", "Tech2", "Tech3"],      // ← TECHNOLOGIES USED
    demo: "https://demo-link.com",          // ← YOUR DEMO LINK (or #)
    repo: "https://github.com/you/project", // ← YOUR REPO LINK
  },
  // ← ADD/REMOVE MORE PROJECTS
];
```

---

## 🎨 Priority 5: Branding (Polish!)

Make it match your personal brand.

### Colors & Theme
**File**: `tailwind.config.js` (around lines 6-19)

```javascript
colors: {
  dark: {
    900: "#0a0e27",  // ← BACKGROUND
    800: "#1a1f3a",  // ← CARDS
    700: "#2a2f4a",  // ← HOVER
    600: "#3a3f5a",  // ← BORDERS
  },
},
```

Change these hex values to your brand colors.

### Primary Accent Color
Search `tailwind.config.js` and `index.css` for color values:

```css
from-indigo-400 to-purple-600  /* Change "indigo" and "purple" to your colors */
```

Or update Tailwind theme to use your color names.

### Animations
**File**: `tailwind.config.js` (optional, around lines 14-31)

```javascript
animation: {
  float: "float 6s ease-in-out infinite",    // ← CHANGE DURATION
  pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  glow: "glow 2s ease-in-out infinite",
},
```

Smaller numbers = faster animations

---

## 📱 Priority 6: Meta Tags & SEO (Deploy!)

Update page title and description.

### Page Title
**File**: `index.html` (around line 5)

```html
<title>Your Name - Full Stack Developer</title>  ← UPDATE THIS
```

### Page Description
**File**: `index.html` (around line 7)

```html
<meta name="description" content="Your description here" />  ← UPDATE THIS
```

### Favicon
**File**: `index.html` (around line 7)

```html
<!-- Replace with your favicon -->
<link rel="icon" href="/your-favicon.ico" />
```

Place favicon at `public/your-favicon.ico`

---

## 🔗 Priority 7: Form Submission (Optional but Recommended)

Make contact form actually work.

### Option A: Formspree (Easiest)

1. Go to [formspree.io](https://formspree.io)
2. Create free account
3. Create a form and get ID
4. Update `src/sections/Contact.jsx` (around line 58):

```javascript
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  //                                            ↑ REPLACE THIS
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

### Option B: Your Own Backend

Update `src/sections/Contact.jsx` (around line 58):

```javascript
const response = await fetch("https://your-api.com/contact", {
  //                          ↑ UPDATE THIS
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

### Option C: Skip for Now

Leave as-is. Form will show success message but won't actually send.

---

## 🚀 Priority 8: Environment Variables (Optional)

Create `.env.local` file:

```env
VITE_GITHUB_USERNAME=your-username
VITE_FORM_ID=your-formspree-id
```

(See `.env.local.example` for all options)

---

## 📸 Priority 9: Add Custom Images (Optional)

Add images to showcase your work.

### Hero Section
Add custom 3D model to `public/models/hero.glb`

Edit `src/sections/Hero3D.jsx`:
```javascript
import { useGLTF } from "@react-three/drei";

function AnimatedMesh() {
  const { scene } = useGLTF("/models/hero.glb");
  return <primitive object={scene} />;
}
```

### Project Thumbnails
Add to `src/sections/Projects.jsx`:
```javascript
{
  id: "p1",
  name: "Project Name",
  // ... other fields ...
  image: "/images/project-1.png",  // ← ADD THIS
}
```

Then display in ProjectCard.jsx:
```javascript
{project.image && <img src={project.image} alt={project.name} />}
```

---

## ✅ VERIFICATION CHECKLIST

After customizing, verify:

- [ ] App starts: `npm run dev`
- [ ] Navigation works (arrows, scroll, dots, links)
- [ ] GitHub projects load (or show fallback)
- [ ] Contact form appears
- [ ] Contact info is correct
- [ ] No console errors (F12)
- [ ] Looks good on mobile (DevTools responsive mode)
- [ ] Build succeeds: `npm run build`
- [ ] Production preview works: `npm run preview`

---

## 🚀 FINAL STEPS

1. ✅ Complete Priority 1 (GitHub username)
2. ✅ Complete Priority 2 (Contact info + About)
3. ✅ Verify in browser (`npm run dev`)
4. ✅ Build for production (`npm run build`)
5. ✅ Deploy (`vercel` or `netlify deploy --prod --dir=dist`)

---

## 🆘 Quick Reference

### File Locations
- Contact info: `src/sections/Contact.jsx` (line ~162)
- About/skills: `src/sections/About.jsx` (line ~28)
- Services: `src/sections/Services.jsx` (line ~25)
- Projects: `src/sections/Projects.jsx` (line ~12)
- Colors: `tailwind.config.js` (line ~6)
- Page title: `index.html` (line ~5)

### Common Changes
- Change colors: `tailwind.config.js`
- Change text: Edit section files in `src/sections/`
- Change animations: Edit `src/components/SlideWrapper.jsx`
- Change navigation: Edit `src/App.jsx`

### Testing Commands
```bash
npm run dev          # Start development
npm run build        # Build for production
npm run preview      # Preview production build
```

---

**Once you complete this checklist, you'll have a fully personalized, professional portfolio!** 🎉
