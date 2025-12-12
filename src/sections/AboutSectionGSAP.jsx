import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * AboutSection: 3D-like depth effects with rotateX/Y and translateZ
 * Creates an immersive scrolling experience with transform3d
 */
export default function AboutSection() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // 3D perspective effect on scroll
    gsap.to(contentRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1.5,
      },
      rotateX: 5,
      rotateY: -3,
      z: 100, // translateZ
      ease: 'none',
    })

    // Image counter-rotate for depth
    gsap.to(imageRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1.5,
      },
      rotateX: -5,
      rotateY: 3,
      z: 50,
      ease: 'none',
    })

    // Stats fade and slide up
    gsap.from(statsRef.current?.children || [], {
      scrollTrigger: {
        trigger: statsRef.current,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '120px 40px',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#fff',
        perspective: '1200px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
      >
        {/* Left content with 3D effect */}
        <div
          ref={contentRef}
          style={{
            perspective: '1000px',
            willChange: 'transform',
            transformStyle: 'preserve-3d',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: 900,
              margin: '0 0 30px 0',
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            About This Experience
          </h2>

          <p
            style={{
              fontSize: '1.1rem',
              color: '#b4b4cc',
              lineHeight: 1.8,
              marginBottom: '20px',
            }}
          >
            Discover how GSAP ScrollTrigger and GPU-accelerated transforms create smooth, mesmerizing scroll animations. Every pixel is optimized for performance.
          </p>

          <p
            style={{
              fontSize: '1.1rem',
              color: '#b4b4cc',
              lineHeight: 1.8,
            }}
          >
            With ScrollSmoother, your scroll becomes butter-smooth. Combined with parallax layers and 3D depth effects, you get a premium feel that captures attention.
          </p>
        </div>

        {/* Right image with 3D effect */}
        <div
          ref={imageRef}
          style={{
            perspective: '1000px',
            willChange: 'transform',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '500px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              fontWeight: 900,
              color: '#fff',
              boxShadow: '0 30px 80px rgba(99, 102, 241, 0.4)',
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            🎬 3D Depth
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div
        ref={statsRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginTop: '120px',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '120px auto 0',
        }}
      >
        {[
          { number: '60fps', label: 'Smooth Performance' },
          { number: '100%', label: 'GPU Accelerated' },
          { number: '∞', label: 'Customizable' },
          { number: '📱', label: 'Responsive' },
        ].map((stat, i) => (
          <div key={i} style={{ willChange: 'transform' }}>
            <div
              style={{
                fontSize: '3rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px',
              }}
            >
              {stat.number}
            </div>
            <div style={{ color: '#b4b4cc', fontSize: '1rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
