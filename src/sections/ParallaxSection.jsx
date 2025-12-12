import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ParallaxSection: Showcase parallax layers moving at different speeds
 * Creates a depth illusion with multiple background layers
 * Uses will-change for GPU acceleration
 */
export default function ParallaxSection() {
  const sectionRef = useRef(null)
  const bgLayer1 = useRef(null)
  const bgLayer2 = useRef(null)
  const bgLayer3 = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Layer 1: moves slowest (parallax value = 100)
    gsap.to(bgLayer1.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1.5,
        markers: false,
      },
      y: 100,
      ease: 'none',
    })

    // Layer 2: medium speed (parallax value = 60)
    gsap.to(bgLayer2.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1.5,
        markers: false,
      },
      y: 60,
      ease: 'none',
    })

    // Layer 3: fastest (parallax value = 30)
    gsap.to(bgLayer3.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1.5,
        markers: false,
      },
      y: 30,
      ease: 'none',
    })

    // Content fade in
    gsap.from(contentRef.current, {
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      },
      opacity: 0,
      y: 60,
      duration: 1,
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '200vh',
        overflow: 'hidden',
        background: '#0f0f1e',
      }}
    >
      {/* Parallax Background Layers */}
      <div
        ref={bgLayer1}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          zIndex: 1,
        }}
      />

      <div
        ref={bgLayer2}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          zIndex: 2,
        }}
      />

      <div
        ref={bgLayer3}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          zIndex: 3,
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center',
          padding: '60px 40px',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 900,
            margin: '0 0 20px 0',
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Parallax Magic
        </h2>
        <p
          style={{
            fontSize: '1.25rem',
            color: '#b4b4cc',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}
        >
          Multiple layers move at different speeds creating depth and visual interest. This parallax effect is GPU-accelerated using transform3d.
        </p>
      </div>

      {/* Featured Image */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 40px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '800px',
            height: '500px',
            background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
            borderRadius: '20px',
            boxShadow: '0 40px 80px rgba(99, 102, 241, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem',
            fontWeight: 900,
            color: '#fff',
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
          }}
        >
          📸 Parallax
        </div>
      </div>
    </div>
  )
}
