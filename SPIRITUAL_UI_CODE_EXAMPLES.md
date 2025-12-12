# 📚 Spiritual UI Code Examples

Complete code examples and patterns for using the spiritual UI components in your portfolio.

---

## Quick Start

### Basic Integration (What You Have)

Your `Hero.jsx` already includes everything:

```jsx
import KrishnaGlow from "../components/KrishnaGlow";
import FluteParallax from "../components/FluteParallax";
import { PeacockFeatherCanvas } from "../components/PeacockFeather3D";

export default function Hero() {
  const scrollProgressRef = useRef(0);
  
  // Scroll tracking
  useEffect(() => {
    window.addEventListener("scroll", () => {
      scrollProgressRef.current = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    });
  }, []);

  return (
    <section className="hero-section">
      {/* Spiritual components */}
      <KrishnaGlow position="left" intensity={0.9} />
      <FluteParallax intensity={1} />
      
      {/* 3D Canvas */}
      <Canvas>
        <PeacockFeatherCanvas scrollRef={scrollProgressRef} />
      </Canvas>
    </section>
  );
}
```

---

## Component Examples

### KrishnaGlow Component

#### Example 1: Left Position (Default)
```jsx
<KrishnaGlow 
  position="left" 
  intensity={0.9}
/>
```

Result: Krishna glow positioned at left 5%, top 20%

#### Example 2: Right Position
```jsx
<KrishnaGlow 
  position="right" 
  intensity={1.1}
/>
```

Result: Krishna glow positioned at right 5%, top 20%, slightly more intense

#### Example 3: High Intensity (Spotlight Effect)
```jsx
<KrishnaGlow 
  position="left" 
  intensity={1.2}
/>
```

Result: 
- Larger scale (1.08 * 1.2 = 1.296)
- Brighter glow (opacity max 0.8 * 1.2)
- More saturated colors

#### Example 4: Subtle (Background Element)
```jsx
<KrishnaGlow 
  position="right" 
  intensity={0.5}
/>
```

Result:
- Smaller scale (1.08 * 0.5 = 0.54)
- Dimmer glow (opacity max 0.8 * 0.5)
- Subtle, non-intrusive effect

---

### FluteParallax Component

#### Example 1: Default Parallax
```jsx
<FluteParallax 
  intensity={1}
/>
```

Result:
- x parallax: 120px movement
- Rotation: 8° tilt
- Positioned at top 33%, left 25%

#### Example 2: Strong Parallax
```jsx
<FluteParallax 
  intensity={1.5}
/>
```

Result:
- x parallax: 180px movement (120 * 1.5)
- Rotation: 12° tilt (8 * 1.5)
- More pronounced scroll effect

#### Example 3: Subtle Parallax
```jsx
<FluteParallax 
  intensity={0.6}
/>
```

Result:
- x parallax: 72px movement (120 * 0.6)
- Rotation: 4.8° tilt (8 * 0.6)
- Gentle, elegant effect

#### Example 4: Different Position (Custom CSS)
To move flute to different position, modify in `FluteParallax.jsx`:

```jsx
// Default positioning
const containerClassName = "absolute top-1/3 left-1/4 opacity-60 hover:opacity-100";

// Custom positioning
const containerClassName = "absolute top-1/2 right-1/6 opacity-60 hover:opacity-100";
```

---

### PeacockFeather3D Component

#### Example 1: Basic 3D Feather (With Scroll Tracking)
```jsx
const scrollProgressRef = useRef(0);

useEffect(() => {
  const handleScroll = () => {
    const max = document.body.scrollHeight - window.innerHeight;
    scrollProgressRef.current = window.scrollY / max;
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

return (
  <Canvas>
    <PeacockFeatherCanvas scrollRef={scrollProgressRef} />
  </Canvas>
);
```

#### Example 2: Multiple Feathers (Array Pattern)
```jsx
const scrollProgressRef = useRef(0);

return (
  <Canvas>
    {/* Feather 1 - Center */}
    <group position={[0, 0, 0]}>
      <PeacockFeatherCanvas scrollRef={scrollProgressRef} />
    </group>
    
    {/* Feather 2 - Left (Smaller) */}
    <group position={[-4, 1, -2]} scale={0.6}>
      <PeacockFeatherCanvas scrollRef={scrollProgressRef} />
    </group>
    
    {/* Feather 3 - Right (Larger) */}
    <group position={[4, -1, -3]} scale={1.3}>
      <PeacockFeatherCanvas scrollRef={scrollProgressRef} />
    </group>
  </Canvas>
);
```

#### Example 3: Dynamic Color Based on Scroll
```jsx
// Modify PeacockFeather3D.jsx useFrame hook:
useFrame(({ clock }) => {
  const scroll = scrollRef.current || 0;
  
  // Color transitions from purple to cyan with scroll
  const hue = scroll * 0.5; // 0 (purple) to 0.5 (cyan)
  eyeMesh.material.color.setHSL(hue, 0.7, 0.5);
  
  // ... rest of animation
});
```

#### Example 4: Interactive Feather with Click Detection
```jsx
import { useBox } from "@react-three/drei";

function PeacockFeatherInteractive({ scrollRef }) {
  const meshRef = useRef();
  
  const handleClick = () => {
    console.log("Peacock feather clicked!");
    // Add click animation
    gsap.to(meshRef.current.scale, {
      x: 1.3,
      y: 1.3,
      z: 1.3,
      duration: 0.5,
      yoyo: true,
      repeat: 1
    });
  };
  
  return (
    <mesh ref={meshRef} onClick={handleClick}>
      <sphereGeometry args={[0.35, 32, 32]} />
    </mesh>
  );
}
```

---

## Advanced Integration Patterns

### Pattern 1: Conditional Rendering (Mobile)

```jsx
import { useMediaQuery } from 'react-responsive';

export default function Hero() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const scrollProgressRef = useRef(0);

  return (
    <section className="hero-section">
      {/* Desktop: Full spiritual UI */}
      {!isMobile && (
        <>
          <KrishnaGlow position="left" intensity={0.9} />
          <FluteParallax intensity={1} />
          <Canvas>
            <PeacockFeatherCanvas scrollRef={scrollProgressRef} />
          </Canvas>
        </>
      )}
      
      {/* Mobile: Simplified version */}
      {isMobile && (
        <div className="text-center py-20">
          <h1>Welcome to Himanshu's Portfolio</h1>
          <p>View on desktop for spiritual animations ✨</p>
        </div>
      )}
    </section>
  );
}
```

### Pattern 2: Sequential Animation Triggers

```jsx
export default function Hero() {
  const krishnaRef = useRef();
  const fluteRef = useRef();
  
  useLayoutEffect(() => {
    const tl = gsap.timeline();
    
    // Krishna appears first
    tl.from(krishnaRef.current, { opacity: 0, duration: 0.8 }, 0);
    
    // Flute appears after Krishna
    tl.from(fluteRef.current, { opacity: 0, duration: 0.8 }, 0.4);
    
    // Both pulse together
    tl.to([krishnaRef.current, fluteRef.current], 
      { scale: 1.05, duration: 0.6, yoyo: true, repeat: -1 }, 
      0
    );
    
    return () => tl.kill();
  }, []);

  return (
    <section>
      <div ref={krishnaRef}>
        <KrishnaGlow position="left" />
      </div>
      <div ref={fluteRef}>
        <FluteParallax />
      </div>
    </section>
  );
}
```

### Pattern 3: Linked Scroll Animations

```jsx
export default function Hero() {
  const scrollProgressRef = useRef(0);
  const krishnaRef = useRef();
  const fluteRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      scrollProgressRef.current = progress;

      // Fade Krishna based on scroll
      if (krishnaRef.current) {
        krishnaRef.current.style.opacity = 1 - progress * 2;
      }

      // Move flute based on scroll
      if (fluteRef.current) {
        fluteRef.current.style.transform = `translateX(${progress * 100}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section>
      <div ref={krishnaRef}>
        <KrishnaGlow position="left" />
      </div>
      <div ref={fluteRef}>
        <FluteParallax />
      </div>
    </section>
  );
}
```

### Pattern 4: Responsive Canvas Size

```jsx
export default function Hero() {
  const canvasRef = useRef();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScale(0.6);  // 60% on mobile
      } else if (width < 1024) {
        setScale(0.8);  // 80% on tablet
      } else {
        setScale(1);    // 100% on desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={canvasRef} style={{ transform: `scale(${scale})` }}>
      <Canvas camera={{ position: [0, 0, 6 / scale], fov: 35 }}>
        <PeacockFeatherCanvas scrollRef={scrollProgressRef} />
      </Canvas>
    </div>
  );
}
```

### Pattern 5: Custom Animation Timeline

```jsx
export default function Hero() {
  useLayoutEffect(() => {
    const tl = gsap.timeline({ 
      defaults: { ease: "power2.inOut" } 
    });

    // Complex sequence
    tl.from(".hero-title", { opacity: 0, y: 50 }, 0)
      .from(".hero-subtitle", { opacity: 0, y: 30 }, 0.2)
      .from(".krishna-glow-container", { opacity: 0, x: -100 }, 0.15)
      .from(".flute-parallax", { opacity: 0, rotation: -45 }, 0.25)
      .to(".hero-buttons", { opacity: 1, y: 0 }, 0.35);

    return () => tl.kill();
  }, []);

  return (
    <section className="hero-section">
      <KrishnaGlow position="left" />
      <FluteParallax />
      {/* ... */}
    </section>
  );
}
```

---

## Styling Examples

### Make Krishna More Glowy

In `src/spiritual-animations.css`:

```css
.krishna-glow-container {
  filter: drop-shadow(0 0 60px rgba(99, 102, 241, 0.6))
          drop-shadow(0 0 40px rgba(245, 158, 11, 0.4));
}
```

### Add Neon Border to Flute

```css
.flute-parallax {
  filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.8));
  border: 2px solid rgba(6, 182, 212, 0.3);
  border-radius: 50%;
  padding: 20px;
}
```

### Make Peacock Feather Pulse

In `src/components/PeacockFeather3D.jsx`:

```jsx
// Inside useFrame
mesh.material.emissiveIntensity = 0.4 + Math.sin(time) * 0.2;
```

---

## Performance Optimization Examples

### Disable on Mobile

```jsx
function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) return <SimpleMobileHero />;

  return <FullHeroWithSpiritual />;
}
```

### Lazy Load Canvas

```jsx
import { lazy, Suspense } from 'react';

const LazyCanvas = lazy(() => import('./Canvas'));

export default function Hero() {
  return (
    <Suspense fallback={<div>Loading 3D...</div>}>
      <LazyCanvas />
    </Suspense>
  );
}
```

### Reduce Particle Count on Mobile

```jsx
const particleCount = isMobile ? 100 : 260;

return (
  <Canvas>
    <ParticleSwirl count={particleCount} />
  </Canvas>
);
```

---

## Common Customizations

### Change Krishna Glow Color

In `src/components/KrishnaGlow.jsx`:

```jsx
// Line with radial gradient
<defs>
  <radialGradient id="krishnaGlow">
    <stop offset="0%" stopColor="#06b6d4" />      {/* cyan instead of indigo */}
    <stop offset="100%" stopColor="#ec4899" />    {/* pink instead of golden */}
  </radialGradient>
</defs>
```

### Change Flute Rotation Speed

In `src/components/FluteParallax.jsx`:

```jsx
gsap.to(fluteRef, {
  scrollTrigger: { scrub: 1.2 },
  x: 120 * intensity,
  rotation: 15 * intensity,  // Increase from 8 to 15
});
```

### Change Peacock Eye Color

In `src/components/PeacockFeather3D.jsx`:

```jsx
// Find this line:
const eyeMaterial = new THREE.MeshStandardMaterial({
  color: 0x7c3aed,      // purple
  // Change to:
  color: 0x06b6d4,      // cyan
  emissiveIntensity: 0.8
});
```

---

## Troubleshooting Code Examples

### Debug Scroll Progress

```jsx
useEffect(() => {
  const handleScroll = () => {
    const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    console.log("Scroll Progress:", progress);  // 0 to 1
    scrollProgressRef.current = progress;
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

### Check if GSAP Animations are Running

```jsx
useLayoutEffect(() => {
  const tl = gsap.timeline();
  
  console.log("Timeline created:", tl);
  console.log("Active animations:", gsap.globalTimeline.getChildren());
  
  tl.from(element, { opacity: 0, duration: 1 });
  
  return () => {
    console.log("Killing animations");
    tl.kill();
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}, []);
```

### Verify 3D Canvas is Rendering

```jsx
<Canvas onCreated={(state) => {
  console.log("Canvas created:", state);
  console.log("Camera:", state.camera);
  console.log("Scene:", state.scene);
}}>
  <PeacockFeatherCanvas scrollRef={scrollProgressRef} />
</Canvas>
```

---

## Summary

You now have complete control over:

✅ Krishna glow (intensity, position)  
✅ Flute parallax (intensity, rotation)  
✅ Peacock feather (scroll tracking, mouse reaction)  
✅ Custom animations and timelines  
✅ Mobile optimization  
✅ Performance tuning  
✅ Color and styling customization  

All components are production-ready and fully documented!

