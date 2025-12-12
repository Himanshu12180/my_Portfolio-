// src/sections/Hero.jsx
import React, { Suspense, useRef, useLayoutEffect, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls, Preload } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import KrishnaGlow from "../components/KrishnaGlow";
import FluteParallax from "../components/FluteParallax";
import { PeacockFeatherCanvas } from "../components/PeacockFeather3D";
import "../spiritual-animations.css";

gsap.registerPlugin(ScrollTrigger);

/* ======================================================================
   Responsive helper
====================================================================== */
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

/* ======================================================================
   Aurora Blob
====================================================================== */
function AuroraBlob({ scrollProgressRef }) {
  const mesh = useRef();
  const time = useRef(0);

  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(1.8, 20);
  }, []);

  useFrame(({ mouse }) => {
    if (!mesh.current) return;

    time.current += 0.01;
    const scrollProgress = scrollProgressRef.current || 0;

    const s = 1 + Math.sin(time.current * 1.2) * 0.05 + scrollProgress * 0.4;
    mesh.current.scale.set(s, s, s);

    mesh.current.rotation.y += 0.004 + scrollProgress * 0.03;
    mesh.current.rotation.x = mouse.y * 0.2 + scrollProgress * 0.3;

    const hue = (0.65 + Math.sin(time.current * 0.5) * 0.1 + scrollProgress * 0.15) % 1;
    mesh.current.material.color.setHSL(hue, 0.7, 0.6);
    mesh.current.material.emissive.setHSL(hue, 0.7, 0.4);
  });

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshStandardMaterial
        metalness={0.9}
        roughness={0.15}
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

/* ======================================================================
   Particle Swirl
====================================================================== */
function ParticleSwirl({ count = 240, scrollProgressRef }) {
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
    const scrollProgress = scrollProgressRef.current || 0;

    if (ref.current) {
      ref.current.rotation.y = t * 0.25 + scrollProgress * 0.5;
      ref.current.rotation.x = Math.sin(t * 0.4) * 0.08 + scrollProgress * 0.2;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={"#a8c7ff"}
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}

/* ======================================================================
   Interactive Camera
====================================================================== */
function InteractiveCamera({ baseZ = 6, scrollProgressRef }) {
  const { camera } = useThree();

  useFrame(({ mouse, clock }) => {
    const mx = mouse.x * 0.6;
    const my = mouse.y * 0.5;
    const scrollProgress = scrollProgressRef.current || 0;

    camera.position.x += (mx - camera.position.x) * 0.05;
    camera.position.y += (my - camera.position.y) * 0.05;

    const targetZ = baseZ + Math.sin(clock.getElapsedTime() * 0.3) * 0.1 + scrollProgress * 1.5;
    camera.position.z += (targetZ - camera.position.z) * 0.05;

    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ======================================================================
   MAIN HERO SECTION with Spiritual Elements
====================================================================== */
export default function Hero() {
  const isMobile = useIsMobile();
  const scrollProgressRef = useRef(0);

  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const heroBoxRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const parallaxBgRef = useRef(null);
  const parallaxMidRef = useRef(null);

  // Track scroll progress
  useEffect(() => {
    const updateScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollProgressRef.current = max > 0 ? window.scrollY / max : 0;
      // Update CSS variable for progress indicator
      document.documentElement.style.setProperty(
        "--scroll-progress",
        scrollProgressRef.current
      );
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  /* GSAP Hero Animations */
  useLayoutEffect(() => {
    if (isMobile) return;

    const tl = gsap.timeline();

    tl.from(
      heroTitleRef.current,
      {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power2.out",
      },
      0
    );

    tl.from(
      heroSubtitleRef.current,
      {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power2.out",
      },
      0.2
    );

    tl.from(
      heroButtonsRef.current,
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "back.out",
      },
      0.35
    );

    tl.from(
      heroBoxRef.current,
      {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: "power2.out",
      },
      0.3
    );

    return () => {
      tl.kill();
    };
  }, [isMobile]);

  /* Parallax layers on scroll */
  useLayoutEffect(() => {
    if (isMobile) return;

    gsap.to(parallaxBgRef.current, {
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "bottom center",
        scrub: 1.2,
        markers: false,
      },
      yPercent: 60,
      ease: "none",
    });

    gsap.to(parallaxMidRef.current, {
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "bottom center",
        scrub: 1.2,
        markers: false,
      },
      yPercent: 35,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile]);

  return (
    <section id="hero-section" className="hero-section relative overflow-hidden w-full min-h-screen lg:min-h-[120vh]">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-indicator" />

      {/* Parallax Background Layers */}
      <div
        ref={parallaxBgRef}
        className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-transparent pointer-events-none"
        style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
      />
      <div
        ref={parallaxMidRef}
        className="absolute inset-0 bg-radial-gradient from-cyan-500/10 via-transparent to-transparent pointer-events-none"
        style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
      />

      {/* Krishna Glow - Left Side */}
      <KrishnaGlow position="left" intensity={0.9} />

      {/* Flute Parallax - Behind text */}
      <FluteParallax intensity={1} />

      {/* 3D Canvas with Aurora Blob + Peacock Feather */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform" }}
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 35 }} gl={{ antialias: true }}>
          <color attach="background" args={["#050014"]} />

          <ambientLight intensity={0.8} />
          <directionalLight intensity={1.2} position={[4, 4, 4]} />

          <Suspense fallback={null}>
            {/* Swirling particles */}
            <ParticleSwirl count={isMobile ? 140 : 260} scrollProgressRef={scrollProgressRef} />

            {/* Glowing Aurora blob */}
            <Float speed={1.2} floatIntensity={0.4}>
              <AuroraBlob scrollProgressRef={scrollProgressRef} />
            </Float>

            {/* Peacock Feather 3D - Right side of canvas */}
            <group position={[2, 0, -1]}>
              <PeacockFeatherCanvas scrollRef={scrollProgressRef} />
            </group>

            {/* Accent orb */}
            <mesh position={[2.4, 1.2, -1.6]} scale={0.6}>
              <sphereGeometry args={[0.35, 32, 32]} />
              <meshStandardMaterial color="#06d6e0" metalness={0.9} roughness={0.2} />
            </mesh>

            <Preload all />
          </Suspense>

          {!isMobile && <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.4} />}

          <InteractiveCamera baseZ={6} scrollProgressRef={scrollProgressRef} />
        </Canvas>
      </div>

      {/* HERO OVERLAY TEXT with scroll animations */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="max-w-6xl px-6 w-full">
          <div className="grid md:grid-cols-2 items-center gap-6">
            {/* Left Text - animated */}
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

            {/* Right Info Box - animated */}
            <div className="pointer-events-auto hidden md:block" ref={heroBoxRef}>
              <div className="hero-info-box bg-black/40 backdrop-blur-md border border-gray-800 p-6 rounded-xl will-change-transform">
                <h3 className="text-lg font-semibold mb-3 spiritual-text">Spiritual Creative</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>🎨 3D spiritual narratives</li>
                  <li>✨ Cinematic UI animations</li>
                  <li>🔮 GSAP + Three.js mastery</li>
                  <li>🕉️ Award-winning motion design</li>
                </ul>
                <p className="mt-4 text-xs text-gray-400">
                  Hover over elements to see the glow dance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile hint */}
      {isMobile && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 text-gray-300 px-3 py-1 rounded text-xs">
          For best experience, view on desktop.
        </div>
      )}
    </section>
  );
}
