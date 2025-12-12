import React, { useRef, useLayoutEffect, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * KrishnaGlow - Spiritual glowing Krishna silhouette
 * Features:
 * - Gentle pulsing glow (opacity + scale breathing)
 * - Blue + golden aura
 * - Hover interaction
 * - Scroll fade in/out
 * - Reusable component
 */
export default function KrishnaGlow({ position = 'left', intensity = 1 }) {
  const glowRef = useRef(null)
  const silhouetteRef = useRef(null)

  /* Pulsing glow animation on mount */
  useLayoutEffect(() => {
    if (!glowRef.current) return

    const pulseTl = gsap.timeline({ repeat: -1 })

    // Outer glow pulse (opacity wave)
    pulseTl.to(
      glowRef.current,
      {
        opacity: 0.8,
        duration: 2.5,
        ease: 'sine.inOut',
      },
      0
    )

    pulseTl.to(
      glowRef.current,
      {
        opacity: 0.4,
        duration: 2.5,
        ease: 'sine.inOut',
      },
      2.5
    )

    // Inner silhouette breathing (scale)
    gsap.to(silhouetteRef.current, {
      scale: 1.08,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    return () => {
      pulseTl.kill()
    }
  }, [])

  /* Scroll fade in/out */
  useLayoutEffect(() => {
    if (!glowRef.current) return

    gsap.to(glowRef.current, {
      scrollTrigger: {
        trigger: glowRef.current,
        start: 'top 100%',
        end: 'top 0%',
        scrub: 1,
        markers: false,
      },
      opacity: (i, target) => {
        return gsap.getProperty(target, 'opacity')
      },
      ease: 'power2.inOut',
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className={`krishna-glow-container absolute ${
        position === 'left' ? '-left-32' : '-right-32'
      } top-1/2 -translate-y-1/2 pointer-events-none`}
      style={{
        width: '600px',
        height: '600px',
        filter: 'drop-shadow(0 0 80px rgba(99, 102, 241, 0.6))',
        willChange: 'transform, opacity',
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      {/* Outer glow aura (blue + golden) */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(217, 119, 6, 0.2) 40%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'auraFloat 6s ease-in-out infinite',
        }}
      />

      {/* Inner silhouette (Krishna profile) */}
      <div
        ref={silhouetteRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        {/* SVG Krishna silhouette */}
        <svg
          viewBox="0 0 200 300"
          className="w-64 h-96"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(99, 102, 241, 0.8))',
          }}
        >
          {/* Head with crown */}
          <circle cx="100" cy="50" r="35" fill="#1f2937" opacity="0.9" />
          <path
            d="M 70 35 Q 80 15 100 10 Q 120 15 130 35"
            fill="#f59e0b"
            opacity="0.8"
          />

          {/* Peacock feather in hair */}
          <path
            d="M 100 10 Q 110 -10 115 -20 Q 112 0 108 15"
            stroke="#06b6d4"
            strokeWidth="3"
            fill="none"
            opacity="0.7"
          />

          {/* Body */}
          <ellipse cx="100" cy="130" rx="25" ry="50" fill="#1f2937" opacity="0.85" />

          {/* Flute/Bansuri in hand */}
          <path
            d="M 60 120 Q 70 130 85 125"
            stroke="#f59e0b"
            strokeWidth="4"
            fill="none"
            opacity="0.8"
            strokeLinecap="round"
          />

          {/* Arm with flute holes indication */}
          <circle cx="75" cy="128" r="2" fill="#f59e0b" opacity="0.7" />
          <circle cx="82" cy="126" r="2" fill="#f59e0b" opacity="0.7" />

          {/* Aura lines */}
          <circle cx="100" cy="130" r="80" fill="none" stroke="#6366f1" strokeWidth="1" opacity="0.3" />
          <circle cx="100" cy="130" r="95" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.2" />
        </svg>
      </div>

      {/* Animated glow particles */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 30% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
          animation: 'glowFloat 5s ease-in-out infinite reverse',
        }}
      />
    </div>
  )
}
