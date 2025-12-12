import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * HeroSection: Hero banner with animated text reveal, image scale + fade-up
 * - Main title slides up and fades in
 * - Subtitle staggered reveal
 * - Hero image scales and fades up
 * - Full-screen height
 */
export default function HeroSection() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const imageRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // GSAP timeline for hero entrance
    const tl = gsap.timeline({
      defaults: {
        duration: 1.2,
        ease: 'cubic.out',
      },
    })

    // Title reveal (text slides up)
    tl.from(
      titleRef.current,
      {
        y: 120,
        opacity: 0,
      },
      0
    )

    // Subtitle staggered reveal
    tl.from(
      subtitleRef.current,
      {
        y: 80,
        opacity: 0,
        duration: 1,
      },
      0.3
    )

    // Image scale + fade up
    tl.from(
      imageRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.85,
        duration: 1.4,
      },
      0.2
    )

    // CTA button fade in
    tl.from(
      ctaRef.current,
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
      },
      0.8
    )

    // Scroll-triggered animations: subtle parallax on scroll
    gsap.to(imageRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
      y: -80, // moves up slower than scroll (parallax)
      ease: 'none',
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="hero-section"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)',
        color: '#ffffff',
        padding: '60px 40px',
      }}
    >
      {/* Background glow effect */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '-100px',
          right: '-100px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
          maxWidth: '1200px',
          width: '100%',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left content */}
        <div>
          <h1
            ref={titleRef}
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              fontWeight: 900,
              margin: '0 0 20px 0',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Smooth Scrolling Design
          </h1>

          <p
            ref={subtitleRef}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: '#b4b4cc',
              margin: '0 0 40px 0',
              lineHeight: 1.6,
            }}
          >
            Experience buttery-smooth animations powered by GSAP ScrollTrigger. Watch how parallax, transforms, and GPU acceleration create a mesmerizing web experience.
          </p>

          <div
            ref={ctaRef}
            style={{
              display: 'flex',
              gap: '20px',
            }}
          >
            <button
              style={{
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: 600,
                background: '#6366f1',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                gsap.to(e.target, { scale: 1.05, duration: 0.3 })
              }}
              onMouseLeave={(e) => {
                gsap.to(e.target, { scale: 1, duration: 0.3 })
              }}
            >
              Explore
            </button>
            <button
              style={{
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: 600,
                background: 'transparent',
                color: '#6366f1',
                border: '2px solid #6366f1',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                gsap.to(e.target, { backgroundColor: '#6366f1', color: '#fff', duration: 0.3 })
              }}
              onMouseLeave={(e) => {
                gsap.to(e.target, { backgroundColor: 'transparent', color: '#6366f1', duration: 0.3 })
              }}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right image */}
        <div
          style={{
            position: 'relative',
            height: '500px',
          }}
        >
          <div
            ref={imageRef}
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              fontWeight: 900,
              color: '#fff',
              boxShadow: '0 20px 60px rgba(99, 102, 241, 0.3)',
              will: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            ✨ Hero Image
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'bounce 2s infinite',
        }}
      >
        <span style={{ fontSize: '0.9rem', color: '#b4b4cc', marginBottom: '10px' }}>Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
