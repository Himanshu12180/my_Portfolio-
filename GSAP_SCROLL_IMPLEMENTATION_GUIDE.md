/**
 * GSAP + ScrollTrigger + ScrollSmoother Integration Guide
 * Production-ready smooth scrolling setup for portfolio
 * 
 * This document explains the architecture and how to customize animations
 */

# GSAP Premium Smooth Scroll Implementation

## 📦 Installation

```bash
npm install gsap
```

## 🏗️ Architecture

### Files Created/Updated

```
src/
├── App.jsx                          # ScrollSmoother wrapper setup
├── gsap-animations.css              # All animation styles (GPU-optimized)
├── sections/
│   └── Hero.jsx                     # Hero with scroll animations + 3D
├── hooks/
│   └── useGSAPAnimations.js         # Reusable GSAP hooks
└── components/
    └── Navbar.jsx                   # Fixed navbar (updated)
```

## 🎯 How It Works

### 1. ScrollSmoother Initialization (App.jsx)

```jsx
ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2.5,      // Smoothing amount (1-4, higher = smoother)
  effects: true,    // Enable effects like parallax
})
```

**Structure:**
```html
<div id="smooth-wrapper">      <!-- Fixed container -->
  <div id="smooth-content">    <!-- Actual scrollable content -->
    <!-- All sections here -->
  </div>
</div>
```

### 2. Hero Animations

#### Text Reveal Timeline (fade-in + slide-up + stagger)
```jsx
// Hero entrance animations (runs on page load)
const tl = gsap.timeline()

// Title: slide up + fade
tl.from(heroTitle, { opacity: 0, y: 60, duration: 0.8 }, 0)

// Subtitle: staggered (0.2s delay)
tl.from(heroSubtitle, { opacity: 0, y: 40, duration: 0.7 }, 0.2)

// Buttons + Info box follow
```

#### Parallax Layers (scroll-driven)
```jsx
// Background moves slower: yPercent = 60
gsap.to(parallaxBg, {
  scrollTrigger: { scrub: 1.2 },
  yPercent: 60,
  ease: "none"
})

// Mid-ground: yPercent = 35
gsap.to(parallaxMid, {
  scrollTrigger: { scrub: 1.2 },
  yPercent: 35,
  ease: "none"
})
```

**Parallax Speed Formula:**
- `yPercent: 0` = moves with scroll (normal speed)
- `yPercent: 50` = moves at 50% of scroll speed (typical parallax)
- `yPercent: 100` = moves very slow (deep parallax)

**Customize intensity:**
```jsx
// For stronger parallax:
yPercent: 80   // was 60
yPercent: 50   // was 35

// For subtle parallax:
yPercent: 30   // was 60
yPercent: 15   // was 35
```

### 3. 3D Canvas Reacting to Scroll

The Aurora Blob mesh responds to scroll via `scrollProgressRef`:

```jsx
// Inside useFrame():
mesh.rotation.y += 0.004 + scrollProgress * 0.03    // Scroll-driven rotation
mesh.scale.set(1 + Math.sin(time) * 0.05 + scrollProgress * 0.4)  // Scale
```

**Result:** 3D object rotates and scales as page scrolls down

---

## 🎨 Using Reusable Hooks

### useScrollAnimation - Fade in + Slide elements

```jsx
import { useScrollAnimation } from "./hooks/useGSAPAnimations"

export function MyComponent() {
  const ref = useRef(null)
  
  useScrollAnimation(ref, {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    duration: 0.8,
    triggerOptions: { start: 'top 80%' }
  })
  
  return <div ref={ref}>Animated on scroll!</div>
}
```

### useParallax - Parallax layers

```jsx
const bgRef = useRef(null)

useParallax(bgRef, { speed: 60 })  // Slower movement
// Or: speed: 30 for faster, speed: 80 for even slower
```

### useStaggerAnimation - Multiple elements in sequence

```jsx
const containerRef = useRef(null)

useStaggerAnimation(containerRef, {
  from: { opacity: 0, y: 50 },
  stagger: 0.15,  // Delay between items
  duration: 0.8
})

// In JSX:
<div ref={containerRef}>
  <div data-stagger>Item 1</div>
  <div data-stagger>Item 2</div>
  <div data-stagger>Item 3</div>
</div>
```

### useMouseParallax - Mouse-driven 3D tilt

```jsx
const imageRef = useRef(null)

useMouseParallax(imageRef, { intensity: 20 })

return <img ref={imageRef} src="..." />
```

---

## ⚙️ Customization Guide

### Change Smooth Scrolling Amount

**File:** `App.jsx`
```jsx
ScrollSmoother.create({
  smooth: 2.5  // Try: 1.5 (snappier), 3 (more syrupy), 4 (very smooth)
})
```

### Adjust Parallax Speed

**File:** `Hero.jsx`
```jsx
// Stronger parallax:
gsap.to(parallaxBgRef.current, {
  yPercent: 100,  // was 60
  scrollTrigger: { scrub: 1.2 }
})

// Subtle parallax:
gsap.to(parallaxBgRef.current, {
  yPercent: 20,   // was 60
  scrollTrigger: { scrub: 1.2 }
})
```

### Change Scrub Amount

Lower = tighter tracking, Higher = more lag (smoother)
```jsx
scrub: 0.5   // Snappy, tight
scrub: 1.2   // Balanced (current)
scrub: 2     // Very smooth, cinematic
scrub: 3     // Maximum smoothness
```

### Hero Text Animation Speed

**File:** `Hero.jsx`
```jsx
const tl = gsap.timeline()

tl.from(heroTitle, {
  opacity: 0, y: 60,
  duration: 0.8  // Faster: 0.5, Slower: 1.2
}, 0)
```

### Color Scheme

Update gradient colors in:
- `Hero.jsx` - gradient classes
- `gsap-animations.css` - scrollbar colors

---

## 🔧 Performance Optimization

### 1. GPU Acceleration (Already Enabled)
```css
/* In gsap-animations.css */
will-change: transform;
transform: translate3d(0, 0, 0);
```

### 2. Lazy Load Sections
```jsx
const LazyProjects = lazy(() => import('./sections/Projects'))

<Suspense fallback={<div>Loading...</div>}>
  <LazyProjects />
</Suspense>
```

### 3. Disable Parallax on Mobile
```jsx
useLayoutEffect(() => {
  if (isMobile) return  // Skip animation on small screens
  // ... animation code
}, [isMobile])
```

### 4. Monitor Performance
- Open DevTools → Performance tab
- Target: 60 FPS (green), < 16.7ms frame time
- Look for "long tasks" and optimize

---

## 🐛 Troubleshooting

### Issue: Scrolling feels jittery
**Solution:** Lower `smooth` value
```jsx
smooth: 1.5  // instead of 2.5
```

### Issue: Parallax not working
**Solution:** Ensure elements have `will-change: transform`
```css
.parallax-layer {
  will-change: transform;
  transform: translate3d(0, 0, 0);
}
```

### Issue: 3D objects don't react to scroll
**Solution:** Verify `scrollProgressRef` is updating
```jsx
useEffect(() => {
  const updateScroll = () => {
    const max = document.body.scrollHeight - window.innerHeight
    scrollProgressRef.current = max > 0 ? window.scrollY / max : 0
  }
  window.addEventListener('scroll', updateScroll)
}, [])
```

### Issue: Mobile animations too heavy
**Solution:** Use `isMobile` check to disable effects
```jsx
if (isMobile) {
  // Skip parallax, reduce 3D effects
  return
}
```

---

## 📚 Advanced Techniques

### Pin & Timeline Combined

```jsx
gsap.to(element, {
  scrollTrigger: {
    trigger: element,
    start: 'top center',
    end: '+=' + (window.innerHeight * 3),
    pin: true,
    pinSpacing: false,
    scrub: true
  },
  // Animations while pinned
  rotation: 360,
  scale: 1.2
})
```

### Morphing Section Reveal

```jsx
gsap.from(section, {
  scrollTrigger: {
    trigger: section,
    start: 'top 80%',
    end: 'top 20%'
  },
  opacity: 0,
  y: 100,
  scale: 0.8,
  stagger: 0.1
})
```

### Scroll Speed Indicator

```jsx
useScrollProgress((progress) => {
  // progress = 0..1
  document.documentElement.style.setProperty(
    '--scroll-progress',
    progress
  )
})
```

---

## 📊 Timeline Overview

```
Page Load
  ↓
[Hero Entrance Timeline]
  - Title fades in (0ms)
  - Subtitle fades in (0.2s)
  - Buttons fade in (0.35s)
  ↓
User Scrolls
  ↓
[Parallax Layers Activate]
  - Background: slow movement (yPercent: 60)
  - Midground: medium movement (yPercent: 35)
  - 3D Canvas: rotates & scales
  ↓
[Scroll Down More]
  ↓
[Other Sections Trigger]
  - Fade animations
  - Stagger effects
  - Image reveals
```

---

## 🚀 Best Practices

1. **Always cleanup ScrollTrigger:** Use `return () => ScrollTrigger.getAll().forEach(t => t.kill())`
2. **Use useLayoutEffect:** Ensures GSAP runs before paint
3. **Enable GPU:** Add `will-change: transform` and `translate3d()`
4. **Test on devices:** Performance varies; test on actual phones
5. **Reduce on mobile:** Disable heavy effects for small screens
6. **Profile regularly:** Use DevTools Performance tab

---

## 🔗 Resources

- GSAP Docs: https://greensock.com/docs/
- ScrollTrigger: https://greensock.com/scrolltrigger/
- ScrollSmoother: https://greensock.com/ScrollSmoother/
- Examples: https://greensock.com/examples/

Happy animating! ✨
