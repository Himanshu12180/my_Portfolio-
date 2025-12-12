import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * FluteParallax - Horizontal flute with scroll parallax
 * Features:
 * - GSAP ScrollTrigger parallax (moves left/right on scroll)
 * - Subtle rotation and glow on hover
 * - Positioned behind hero text for depth
 * - Reusable with adjustable intensity
 */
export default function FluteParallax({ intensity = 1 }) {
  const fluteRef = useRef(null)
  const containerRef = useRef(null)

  /* Scroll parallax animation */
  useLayoutEffect(() => {
    if (!fluteRef.current) return

    // Parallax left/right movement on scroll
    gsap.to(fluteRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1.2,
        markers: false,
      },
      x: 120 * intensity,
      rotation: 8 * intensity,
      ease: 'none',
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [intensity])

  return (
    <div
      ref={containerRef}
      className="flute-parallax absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        perspective: '1000px',
      }}
    >
      <div
        ref={fluteRef}
        className="flute-element absolute top-1/3 left-1/4 opacity-60 hover:opacity-100 transition-opacity"
        style={{
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          filter: 'drop-shadow(0 0 20px rgba(217, 119, 6, 0.5))',
        }}
        onMouseEnter={() => {
          gsap.to(fluteRef.current, {
            scale: 1.1,
            filter: 'drop-shadow(0 0 40px rgba(217, 119, 6, 0.8))',
            duration: 0.3,
          })
        }}
        onMouseLeave={() => {
          gsap.to(fluteRef.current, {
            scale: 1,
            filter: 'drop-shadow(0 0 20px rgba(217, 119, 6, 0.5))',
            duration: 0.3,
          })
        }}
      >
        {/* SVG Flute (Bansuri) */}
        <svg
          viewBox="0 0 400 100"
          className="w-96 h-24"
          style={{
            filter: 'drop-shadow(0 0 15px rgba(217, 119, 6, 0.6))',
          }}
        >
          {/* Main flute body */}
          <rect
            x="20"
            y="40"
            width="360"
            height="20"
            rx="10"
            fill="#d4a574"
            opacity="0.9"
          />

          {/* Flute holes (chakras) */}
          {[60, 110, 160, 210, 260, 310].map((x, i) => (
            <g key={i}>
              {/* Hole shadow */}
              <circle cx={x} cy="50" r="6" fill="#8b6f47" opacity="0.6" />
              {/* Hole glow */}
              <circle cx={x} cy="50" r="5" fill="#fbbf24" opacity="0.4" />
              <circle cx={x} cy="50" r="3.5" fill="#fcd34d" />
            </g>
          ))}

          {/* Decorative end curves */}
          <path
            d="M 20 45 Q 10 50 20 55"
            stroke="#d4a574"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 380 45 Q 390 50 380 55"
            stroke="#d4a574"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* Spiritual aura lines */}
          <path
            d="M 15 50 L 385 50"
            stroke="#06b6d4"
            strokeWidth="1"
            opacity="0.3"
            strokeDasharray="5,5"
          />
        </svg>

        {/* Glow aura behind flute */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 300px 80px at center, rgba(217, 119, 6, 0.2) 0%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}
