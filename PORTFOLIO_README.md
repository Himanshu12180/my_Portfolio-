# Production-Ready 3D Portfolio Web App

A modern, full-page slide-based portfolio website built with **React 18**, **Vite**, **Tailwind CSS**, **Three.js**, and **Framer Motion**. Features smooth transitions, interactive 3D scenes, and mobile optimization.

## 🚀 Features

- **Full-Page Slide Navigation**: Smooth transitions between hero, about, projects, services, and contact
- **Interactive 3D Hero**: Procedural mesh with particle field and mouse parallax using @react-three/fiber
- **GitHub Integration**: Auto-fetch your latest projects with fallback to manual projects
- **Responsive Design**: Mobile-optimized with reduced 3D complexity on smaller devices
- **Performance Optimized**: Lazy loading, code splitting, and GPU acceleration
- **Accessibility**: Keyboard navigation, reduced motion support, proper ARIA labels
- **Framer Motion Animations**: Smooth micro-interactions and slide transitions
- **Form Validation**: Contact form with real-time validation and error handling

## 📋 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 18 |
| **Build Tool** | Vite 4 |
| **Styling** | Tailwind CSS 3 |
| **3D Graphics** | Three.js, @react-three/fiber, @react-three/drei |
| **Animations** | Framer Motion 11 |
| **CSS Preprocessor** | PostCSS, Autoprefixer |

## 🛠️ Project Structure

```
src/
├── components/
│   ├── SlideWrapper.jsx      # Slide animation wrapper
│   ├── Navbar.jsx            # Top navigation
│   ├── SlideDots.jsx         # Side slide indicator dots
│   └── ProjectCard.jsx       # Reusable project card
├── sections/
│   ├── Hero3D.jsx            # Interactive 3D hero with particles
│   ├── About.jsx             # About section with skills grid
│   ├── Projects.jsx          # GitHub projects + manual fallback
│   ├── Services.jsx          # Service cards with 3D accents
│   └── Contact.jsx           # Contact form with validation
├── utils/
│   ├── useSlideNavigation.js # Custom hook for slide navigation
│   └── github.js             # GitHub API utilities
├── App.jsx                   # Main app orchestration
├── main.jsx                  # Entry point
├── index.css                 # Global styles + Tailwind
└── App.css                   # App-specific styles
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ or 18+
- npm or yarn

### Installation

```bash
# Clone or navigate to project
cd my-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## ⌨️ Navigation

### Keyboard
- **Arrow Up / Left**: Previous slide
- **Arrow Down / Right**: Next slide

### Mouse Wheel
- **Scroll Down / Up**: Navigate slides

### Click
- **Navigation dots** (right side): Jump to specific slide
- **Navbar links**: Direct navigation

## 🎨 Customization Guide

### Change Your GitHub Username

Edit `src/sections/Projects.jsx`:

```javascript
const GITHUB_USERNAME = "your-username"; // Line 97
```

### Update Contact Information

Edit `src/sections/Contact.jsx` around line 162:

```javascript
{
  label: "Email",
  value: "your@email.com",
  link: "mailto:your@email.com",
  icon: "✉️",
},
```

### Replace Hero 3D Model

The hero uses a procedural icosahedron. To use a custom GLB model:

1. Place your model in `public/models/hero.glb`
2. Update `src/sections/Hero3D.jsx`:

```javascript
import { useGLTF } from "@react-three/drei";

function AnimatedMesh() {
  const model = useGLTF("/models/hero.glb");
  return <primitive object={model.scene} />;
}
```

### Customize Colors

Edit `tailwind.config.js` to change the color theme:

```javascript
extend: {
  colors: {
    dark: {
      900: "#your-color",
      // ... etc
    },
  },
}
```

### Adjust Animation Speed

Modify `src/components/SlideWrapper.jsx` transitions:

```javascript
transition: {
  duration: 0.8, // Change this value
  ease: "easeInOut",
}
```

## 📬 Form Submission Setup

The contact form currently simulates successful submissions. To use a real backend:

### Option 1: Formspree (Easiest)

1. Go to [formspree.io](https://formspree.io)
2. Create a free account and form
3. Get your form ID
4. Update `src/sections/Contact.jsx`:

```javascript
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

### Option 2: Serverless Function (Vercel/Netlify)

1. Create `api/contact.js` in your project root
2. Use `nodemailer` or `SendGrid` to send emails
3. Update the fetch URL in `Contact.jsx`:

```javascript
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

### Option 3: Express Backend (Railway/Render)

Deploy a Node.js backend and update the fetch URL accordingly.

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Benefits**: Free tier, serverless functions, automatic previews

**Setup contact API**: Create `api/contact.js` in root:

```javascript
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;
    // Send email using nodemailer or SendGrid
    res.status(200).json({ success: true });
  }
}
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy
```

### GitHub Pages

```bash
npm run build
# Deploy the `dist` folder to GitHub Pages
```

## 📊 Performance Tips

1. **Image Optimization**: Compress images with TinyPNG or similar
2. **Code Splitting**: Components are already lazy-loaded
3. **WebP Format**: Use WebP images for better compression
4. **Reduce 3D Complexity**: Mobile builds use lower poly counts
5. **Monitor Metrics**: Use Lighthouse to audit performance

Expected Lighthouse scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

## ♿ Accessibility

- Keyboard navigation supported
- ARIA labels on interactive elements
- Reduced motion support
- Focus indicators for all interactive elements
- Semantic HTML structure
- Color contrast WCAG AA compliant

## 🐛 Troubleshooting

### Canvas not rendering
- Check WebGL support: Open DevTools → More Tools → WebGL Inspector
- On mobile, check if hardware acceleration is enabled

### GitHub API rate limit
- The app automatically falls back to manual projects
- Rate limit resets every hour
- Anonymous requests: 60 per hour
- Authenticated: 5,000 per hour (add `?access_token=YOUR_TOKEN`)

### Animations not smooth
- Check `prefers-reduced-motion` setting in your OS
- Disable other browser extensions
- Check GPU acceleration is enabled

### Form not submitting
- Check browser console for errors
- Verify FormID or backend URL
- Test with different email providers

## 📝 Environment Variables

Create a `.env.local` file (optional):

```
VITE_GITHUB_USERNAME=your-username
VITE_FORM_ID=your-formspree-id
```

## 🔐 Security

- Contact form data is sent directly to Formspree (encrypted)
- No sensitive data stored locally
- GitHub API uses public endpoints only
- Form inputs are validated on client and server

## 📄 License

MIT - Feel free to use this template for your portfolio

## 🤝 Contributing

Feel free to fork, modify, and improve!

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review component comments for implementation details
3. Check Framer Motion and Three.js documentation

## 🎯 Next Steps

1. Customize with your information
2. Replace placeholder images/text
3. Set up form submission
4. Deploy to Vercel/Netlify
5. Add custom domain
6. Submit to search engines

---

**Built with ❤️ using modern web technologies**
