// src/sections/Hero.jsx
import React, { Suspense, useRef, useEffect, useLayoutEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls, Preload } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import "../spiritual-animations.css"; // optional file with glow utilities (you can keep or remove)

gsap.registerPlugin(ScrollTrigger);

/* -------------------------
   Helper: isMobile
--------------------------*/
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return isMobile;
}

/* =========================
   KrishnaGlow Component
   small SVG + pulsing glow (GSAP)
   reusable: <KrishnaGlow position="left" intensity={0.9} />
   ========================= */
function KrishnaGlow({ position = "left", intensity = 0.9 }) {
  const wrapRef = useRef();

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // subtle pulse
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 2, ease: "sine.inOut" } });
    tl.to(el, { scale: 1.02, opacity: 1 * intensity });

    // fade-in on enter
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom-=20%",
      toggleActions: "play none none reverse",
    });

    return () => {
      tl.kill();
      st && st.kill();
    };
  }, [intensity]);

  const sideClass = position === "left" ? "left-6 md:left-12" : "right-6 md:right-12";

  return (
    <div
      ref={wrapRef}
      className={`absolute top-1/4 ${sideClass} pointer-events-none z-10`}
      style={{ transformOrigin: "center", opacity: 0.85 }}
      aria-hidden
    >
      <div className="krishna-glow p-2 rounded-full">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Krishna glow">
          <path d="M36 8 C28 18, 20 28, 36 40 C52 28, 44 18, 36 8 Z" fill="rgba(255,240,200,0.06)"/>
          <path d="M36 16 C32 22, 30 26, 36 32 C42 26, 40 22, 36 16 Z" fill="#ffd88a"/>
          <circle cx="36" cy="18" r="2.2" fill="#9be7ff"/>
        </svg>
      </div>
    </div>
  );
}

/* =========================
   FluteParallax Component
   simple SVG that parallax moves on scroll
   ========================= */
function FluteParallax({ intensity = 1 }) {
  const ref = useRef();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const st = gsap.to(el, {
      x: () => 60 * intensity,
      rotate: 2.8,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "bottom center",
        scrub: 1.2,
      },
    });

    const onEnter = () => gsap.to(el, { scale: 1.02, duration: 0.35, ease: "power2.out" });
    const onLeave = () => gsap.to(el, { scale: 1, duration: 0.35, ease: "power2.out" });

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      st.kill();
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [intensity]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <div ref={ref} className="flute-parallax opacity-40" style={{ willChange: "transform" }}>
        <svg width="420" height="80" viewBox="0 0 420 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="6" y="34" width="408" height="12" rx="6" fill="#dbeafe" opacity="0.06"/>
          <g transform="translate(30, 10)">
            <rect x="0" y="18" width="320" height="6" rx="3" fill="#ffd88a" />
            <circle cx="340" cy="21" r="8" fill="#9be7ff" />
            <circle cx="360" cy="21" r="4" fill="#6ee7b7" />
          </g>
        </svg>
      </div>
    </div>
  );
}

/* =========================
   PeacockFeather3D (procedural feather)
   exported as inline component for Canvas usage
   Props: scrollRef (useRef({ value: 0 }))
   ========================= */
function PeacockFeather3D({ scrollRef }) {
  const group = useRef();

  const blades = useMemo(() => {
    const arr = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const x = Math.sin(t * Math.PI) * 1.6;
      const y = (t - 0.5) * 2.6;
      const z = (t - 0.5) * -0.6;
      arr.push({ x, y, z, rot: (t - 0.5) * 0.6, scale: 0.35 + t * 0.9 });
    }
    return arr;
  }, []);

  useFrame(({ mouse, clock }) => {
    const s = scrollRef?.current?.value ?? 0;
    if (!group.current) return;
    group.current.rotation.y += 0.002 + s * 0.02;
    group.current.rotation.x = (mouse.y * 0.15) - s * 0.1;
    group.current.position.y = -s * 3;
    group.current.position.z = -1 - s * 2;
  });

  return (
    <group ref={group} scale={[0.95, 0.95, 0.95]}>
      {blades.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, b.z]} rotation={[0, b.rot, (i / 36) * 0.2]} scale={[b.scale, 0.06, 1]}>
          <planeGeometry args={[1.2, 0.28]} />
          <meshStandardMaterial
            color={new THREE.Color().setHSL(0.56 + (i / 100) * 0.12, 0.7, 0.45)}
            emissive={new THREE.Color().setHSL(0.56 + (i / 100) * 0.12, 0.6, 0.12)}
            metalness={0.3}
            roughness={0.25}
            transparent
            opacity={0.95}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      <mesh position={[0, 1.3, -0.3]} rotation={[0, -0.6, 0]} scale={[0.7, 0.7, 0.7]}>
        <coneGeometry args={[0.12, 0.5, 12]} />
        <meshStandardMaterial color={"#ffd88a"} emissive={"#ffcc66"} metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}

/* =========================
   AuroraBlob (glowing changing blob)
   integrated with scrollRef
   ========================= */
function AuroraBlob({ scrollRef }) {
  const mesh = useRef();
  const time = useRef(0);
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.8, 20), []);

  useFrame(({ mouse }) => {
    if (!mesh.current) return;
    time.current += 0.01;
    const sProg = scrollRef?.current?.value ?? 0;

    const s = 1 + Math.sin(time.current * 1.2) * 0.05 + sProg * 0.35;
    mesh.current.scale.set(s, s, s);

    mesh.current.rotation.y += 0.004 + sProg * 0.02;
    mesh.current.rotation.x = mouse.y * 0.18 + sProg * 0.22;

    const hue = (0.65 + Math.sin(time.current * 0.5) * 0.1 + sProg * 0.12) % 1;
    mesh.current.material.color.setHSL(hue, 0.7, 0.6);
    mesh.current.material.emissive.setHSL(hue, 0.7, 0.35);
  });

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshStandardMaterial metalness={0.9} roughness={0.15} emissiveIntensity={0.45} />
    </mesh>
  );
}

/* =========================
   ParticleSwirl (cinematic particles)
   accepts scrollRef to add scroll-influence
   ========================= */
function ParticleSwirl({ count = 220, scrollRef }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = -Math.random() * 20;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.3;
    const sProg = scrollRef?.current?.value ?? 0;
    if (ref.current) {
      ref.current.rotation.y = t * 0.25 + sProg * 0.45;
      ref.current.rotation.x = Math.sin(t * 0.4) * 0.08 + sProg * 0.18;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={"#a8c7ff"} transparent opacity={0.75} depthWrite={false} />
    </points>
  );
}

/* =========================
   Camera parallax (mouse + breathing + scroll)
   ========================= */
function InteractiveCamera({ baseZ = 6, scrollRef }) {
  const { camera } = useThree();
  useFrame(({ mouse, clock }) => {
    const mx = mouse.x * 0.6;
    const my = mouse.y * 0.5;
    const sProg = scrollRef?.current?.value ?? 0;

    camera.position.x += (mx - camera.position.x) * 0.05;
    camera.position.y += (my - camera.position.y) * 0.05;

    const targetZ = baseZ + Math.sin(clock.getElapsedTime() * 0.3) * 0.08 + sProg * 1.2;
    camera.position.z += (targetZ - camera.position.z) * 0.05;

    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* =========================
   MAIN HERO COMPONENT (full file)
   ========================= */
export default function Hero() {
  const isMobile = useIsMobile();
  // IMPORTANT: use object shape so children access .current.value
  const scrollProgressRef = useRef({ value: 0 });

  // refs for GSAP text animations
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const heroBoxRef = useRef(null);
  const parallaxBgRef = useRef(null);
  const parallaxMidRef = useRef(null);

  // update scroll progress (0..1)
  useEffect(() => {
    const updateScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollProgressRef.current.value = max > 0 ? window.scrollY / max : 0;
      // optional CSS var for style bindings
      document.documentElement.style.setProperty("--scroll-progress", scrollProgressRef.current.value);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // initial GSAP intro animations (desktop only)
  useLayoutEffect(() => {
    if (isMobile) return;
    const tl = gsap.timeline();
    tl.from(heroTitleRef.current, { opacity: 0, y: 60, duration: 0.8, ease: "power2.out" }, 0);
    tl.from(heroSubtitleRef.current, { opacity: 0, y: 40, duration: 0.7, ease: "power2.out" }, 0.2);
    tl.from(heroButtonsRef.current, { opacity: 0, y: 30, duration: 0.6, ease: "back.out(1.7)" }, 0.35);
    tl.from(heroBoxRef.current, { opacity: 0, x: 40, duration: 0.8, ease: "power2.out" }, 0.3);

    return () => {
      tl.kill();
    };
  }, [isMobile]);

  // parallax layers via ScrollTrigger
  useLayoutEffect(() => {
    if (isMobile) return;

    const bgAnim = gsap.to(parallaxBgRef.current, {
      yPercent: 60,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "bottom center",
        scrub: 1.2,
      },
    });

    const midAnim = gsap.to(parallaxMidRef.current, {
      yPercent: 35,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "bottom center",
        scrub: 1.2,
      },
    });

    return () => {
      bgAnim.kill();
      midAnim.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile]);

  return (
    <section id="hero-section" className="hero-section relative overflow-hidden w-full min-h-screen lg:min-h-[120vh]">
      {/* subtle progress indicator (optional) */}
      <div className="scroll-progress-indicator pointer-events-none" aria-hidden />

      {/* background parallax layers */}
      <div ref={parallaxBgRef} className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-transparent pointer-events-none" style={{ willChange: "transform" }} />
      <div ref={parallaxMidRef} className="absolute inset-0 bg-radial-gradient from-cyan-500/10 via-transparent to-transparent pointer-events-none" style={{ willChange: "transform" }} />

      {/* Krishna Glow left */}
      <KrishnaGlow position="left" intensity={0.9} />

      {/* Flute Parallax */}
      <FluteParallax intensity={1} />

      {/* Canvas (3D) */}
      <div className="absolute inset-0 w-full h-full -z-10" style={{ willChange: "transform" }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 35 }} gl={{ antialias: true, alpha: true }}>
          <color attach="background" args={["#050014"]} />
          <ambientLight intensity={0.8} />
          <directionalLight intensity={1.2} position={[4, 4, 4]} />

          <Suspense fallback={null}>
            <ParticleSwirl count={isMobile ? 140 : 260} scrollRef={scrollProgressRef} />
            <Float speed={1.2} floatIntensity={0.4}>
              <AuroraBlob scrollRef={scrollProgressRef} />
            </Float>

            {/* Peacock feather positioned on right; using group to adjust position */}
            <group position={[2, 0, -1]}>
              <PeacockFeather3D scrollRef={scrollProgressRef} />
            </group>

            {/* small accent orb */}
            <mesh position={[2.4, 1.2, -1.6]} scale={0.6}>
              <sphereGeometry args={[0.35, 32, 32]} />
              <meshStandardMaterial color="#06d6e0" metalness={0.9} roughness={0.2} />
            </mesh>

            <Preload all />
          </Suspense>

          {!isMobile && <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.4} />}

          <InteractiveCamera baseZ={6} scrollRef={scrollProgressRef} />
        </Canvas>
      </div>

      {/* overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="max-w-6xl px-6 w-full">
          <div className="grid md:grid-cols-2 items-center gap-6">
            {/* left text (animated refs) */}
            <div className="pointer-events-auto" ref={heroTitleRef}>
              <h1 className="hero-title spiritual-text text-4xl md:text-6xl font-extrabold leading-tight">
                Hi, I'm{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-300">
                  Himanshu
                </span>
              </h1>

              <p className="hero-subtitle mt-4 text-gray-200 max-w-xl" ref={heroSubtitleRef}>
                I craft immersive, spiritual experiences using React, 3D, and motion design.
                From Krishna's tales to modern UI—transforming art into code.
              </p>

              <div className="hero-buttons mt-6 flex gap-4" ref={heroButtonsRef}>
                <a
                  href="#contact"
                  className="cta-button pointer-events-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all hover:scale-105 will-change-transform"
                >
                  Let's Create
                </a>
                <a
                  href="/resume.pdf"
                  className="pointer-events-auto px-6 py-3 border border-cyan-400 hover:border-cyan-300 rounded-lg text-cyan-300 font-semibold transition-all hover:glow-cyan"
                >
                  Portfolio
                </a>
              </div>
            </div>

            {/* right box */}
            <div className="pointer-events-auto hidden md:block" ref={heroBoxRef}>
              <div className="hero-info-box bg-black/40 backdrop-blur-md border border-gray-800 p-6 rounded-xl will-change-transform">
                <h3 className="text-lg font-semibold mb-3 spiritual-text">Spiritual Creative</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>🎨 3D spiritual narratives</li>
                  <li>✨ Cinematic UI animations</li>
                  <li>🔮 GSAP + Three.js mastery</li>
                  <li>🕉️ Motion design with soul</li>
                </ul>
                <p className="mt-4 text-xs text-gray-400">Hover over elements to see the glow dance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile hint */}
      {isMobile && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 text-gray-300 px-3 py-1 rounded text-xs">
          For best experience, view on desktop.
        </div>
      )}
    </section>
  );
}
