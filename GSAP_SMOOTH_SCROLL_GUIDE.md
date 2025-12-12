# GSAP Smooth Scroll Animations - Complete Production Guide

## 📦 Installation

```bash
npm install gsap
```

**Or with yarn:**
```bash
yarn add gsap
```

## 🚀 Quick Start

### 1. Import the Demo App

```jsx
import GSAPSmoothScrollApp from './GSAPSmoothScrollApp'

export default function App() {
  return <GSAPSmoothScrollApp />
}
```

### 2. CSS Setup

The app automatically imports `animations.css` which provides:
- GPU-accelerated transforms (will-change, translate3d)
- Smooth scrollbar styling
- Responsive breakpoints
- Accessibility (prefers-reduced-motion)

## 📁 File Structure

```
src/
├── animations.css                  # Core animation styles
├── GSAPSmoothScrollApp.jsx          # Main demo component
├── components/
│   └── SmoothScroll.jsx            # ScrollSmoother wrapper
├── hooks/
│   └── useGSAPSetup.js             # GSAP initialization
└── sections/
    ├── HeroSectionGSAP.jsx         # Hero with text reveal
    ├── AboutSectionGSAP.jsx        # 3D depth effects
    ├── ParallaxSection.jsx         # Multi-layer parallax
    └── CardShowcase.jsx            # Floating cards
```

## ✨ Features Explained

### 1. **ScrollSmoother** - Buttery Smooth Scrolling
```jsx
// In useGSAPSetup hook:
ScrollSmoother.create({
  smooth: 2,  // Smoothing amount (1-3)
  effects: true,  // Enable scroll effects
})
```
**Effect**: The entire page scrolls smoothly with inertia, like modern portfolio sites.

---

### 2. **Hero Section** - Text Reveal + Image Scale
```
Timeline:
1. Title slides up + fades in
2. Subtitle staggered (delayed)
3. Image scales + fades
4. CTA button fades

Scroll: Image parallax moves slower than scroll
```

**Customize:**
```jsx
// Adjust timing
tl.from(titleRef.current, { y: 120, opacity: 0 }, 0)
//                                   ^^^ increase for bigger move

// Adjust parallax intensity
gsap.to(imageRef.current, { y: -80 }) // -80 = 80px slower
```

---

### 3. **Parallax Section** - Multi-Layer Depth
```
3 background layers move at different speeds:
- Layer 1: y +100 (slowest)
- Layer 2: y +60 (medium)
- Layer 3: y +30 (fastest)
```

**Effect**: Creates depth illusion as you scroll.

**Customize:**
```jsx
gsap.to(bgLayer1.current, {
  y: 150,  // Increase for stronger effect
  scrollTrigger: { scrub: 1.5 }
})
```

---

### 4. **3D Transforms** - rotateX/Y + translateZ
```jsx
gsap.to(contentRef.current, {
  rotateX: 5,     // Tilt forward
  rotateY: -3,    // Tilt left
  z: 100,         // translateZ for depth
  scrollTrigger: { scrub: 1.5 }
})
```

**Effect**: Content appears to come forward/backward in 3D space.

**Customize intensity:**
```jsx
rotateX: 10,  // Increase tilt
rotateY: -5,  // Increase side tilt
z: 200,       // Increase depth
```

---

### 5. **Floating Cards** - Gentle Motion
```jsx
// Staggered entrance
gsap.from(cardRef.current, {
  opacity: 0, y: 80, delay: index * 0.15
})

// Floating animation
gsap.to(cardRef.current, {
  y: -20,
  repeat: -1,
  yoyo: true,
  duration: 3 + index * 0.5
})
```

**Effect**: Cards float up/down gently and stagger in as you scroll.

---

## 🎨 Customization Guide

### Change Color Scheme

**File**: `animations.css` and component files

Current: Indigo (#6366f1) + Pink (#ec4899)

```css
/* animations.css */
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

### Adjust Scroll Speed

**Smooth scroll amount (1-3):**
```jsx
// In SmoothScroll.jsx
ScrollSmoother.create({
  smooth: 2,  // Higher = smoother but slower response
})
```

**Parallax intensity (higher = more effect):**
```jsx
// In ParallaxSection.jsx
gsap.to(bgLayer1.current, {
  y: 150,  // Increase: 100 → 150
  scrollTrigger: { scrub: 2 }  // Increase scrub too
})
```

### Change Animation Duration

```jsx
// In HeroSectionGSAP.jsx
const tl = gsap.timeline({
  defaults: {
    duration: 1.2,  // Increase for slower reveal
    ease: 'cubic.out',  // Try 'power2.out', 'back.out'
  },
})
```

### Mobile Performance (Reduce Effects)

```jsx
// In any component
const isMobile = window.matchMedia('(max-width: 768px)').matches

if (isMobile) {
  // Use simpler animations
  gsap.to(element, { opacity: 0.5 })  // Less CPU usage
}
```

---

## ⚡ Performance Best Practices

### 1. **GPU Acceleration**
```css
/* Use translate3d instead of top/left */
will-change: transform;
transform: translate3d(0, 0, 0);
```

### 2. **Cleanup in useEffect**
```jsx
useEffect(() => {
  // ... animations ...
  
  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill())
  }
}, [])
```

### 3. **Lazy Load Heavy Sections**
```jsx
import { lazy, Suspense } from 'react'

const CardShowcase = lazy(() => import('./sections/CardShowcase'))

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CardShowcase />
    </Suspense>
  )
}
```

### 4. **Mobile Fallback**
```jsx
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (reducedMotion) {
  // Use simpler animations or disable parallax
}
```

### 5. **Monitor Performance**
```bash
# Use Chrome DevTools Performance tab
# Target: 60 FPS, < 16.7ms frame time
```

---

## 🎯 Common Issues & Solutions

### Issue: Scrolling feels jittery
**Solution**: Lower `smooth` value (try 1.5 instead of 2)

### Issue: Animations stutter on mobile
**Solution**: Disable parallax on small screens
```jsx
const isMobile = window.matchMedia('(max-width: 768px)').matches
if (!isMobile) {
  // Apply parallax only
}
```

### Issue: Page feels heavy/slow
**Solution**: Reduce number of active ScrollTriggers
```jsx
// Instead of one trigger per pixel, group animations
gsap.utils.toArray('.card').forEach((card) => {
  gsap.from(card, { opacity: 0, scrollTrigger: card })
})
```

---

## 📚 Advanced Techniques

### Create a Custom Hook for Scroll Animations

```jsx
function useScrollAnimation(element, fromVars, toVars, triggerConfig = {}) {
  useEffect(() => {
    if (!element.current) return

    gsap.fromTo(
      element.current,
      fromVars,
      {
        ...toVars,
        scrollTrigger: {
          trigger: element.current,
          ...triggerConfig,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])
}
```

### Timeline Stagger Effect

```jsx
gsap.utils.toArray('.card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 80%',
    },
    opacity: 0,
    y: 80,
    stagger: 0.2,  // Delays each card by 0.2s
    delay: i * 0.1,
  })
})
```

---

## 🔗 Resources

- **GSAP Docs**: https://greensock.com/docs/
- **ScrollTrigger Guide**: https://greensock.com/scrolltrigger/
- **ScrollSmoother Docs**: https://greensock.com/ScrollSmoother/
- **Performance**: https://greensock.com/gsap-performance/

---

## 💡 Tips

1. **Always kill ScrollTriggers on unmount** to prevent memory leaks
2. **Use `scrub` for scroll-linked animations** (smoother than trigger-based)
3. **GPU acceleration matters**: Use `translate3d()` instead of `top/left`
4. **Test on real devices** - mobile performance varies greatly
5. **Profile in DevTools** - see actual FPS and frame times

---

## 📄 License

Free to use and customize for personal and commercial projects.

Happy animating! 🚀
