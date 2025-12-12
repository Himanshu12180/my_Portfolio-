import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

/**
 * useGSAPSetup: Initialize ScrollSmoother and ScrollTrigger on mount
 * Returns { smoother, ScrollTrigger } for use in components
 * Call once at app root level
 */
export function useGSAPSetup() {
  const smootherRef = useRef(null)

  useEffect(() => {
    // Only initialize on client
    if (typeof window === 'undefined') return

    // Create ScrollSmoother for buttery smooth scrolling
    // matcher: ".smooth-scroll" applies smooth scroll to that wrapper
    smootherRef.current = ScrollSmoother.create({
      smooth: 2, // smoothing amount (1-3 is typical)
      effects: true, // enables effects like opacity/translateZ
      onUpdate: (self) => {
        // Optional: track scroll progress
      },
    })

    return () => {
      // Cleanup: kill all ScrollTriggers and smoother
      if (smootherRef.current) {
        smootherRef.current.kill()
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return smootherRef.current
}

/**
 * useScrollTrigger: Helper to create and manage a ScrollTrigger animation
 * Automatically cleans up on unmount
 */
export function useScrollTrigger(callback, dependencies = []) {
  const triggerRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    triggerRef.current = gsap.to(document.documentElement, {
      // Dummy tween to attach ScrollTrigger
      scrollTrigger: {
        trigger: document.documentElement,
        onUpdate: callback,
      },
    })

    return () => {
      if (triggerRef.current?.scrollTrigger) {
        triggerRef.current.scrollTrigger.kill()
      }
    }
  }, dependencies)
}

/**
 * Common animation presets
 */
export const ANIMATIONS = {
  // Text reveal: slide up + fade in
  textReveal: {
    fromVars: { y: 100, opacity: 0, duration: 1 },
    toVars: { y: 0, opacity: 1 },
  },
  // Fade up: simple fade + small scale
  fadeUp: {
    fromVars: { y: 60, opacity: 0, scale: 0.95, duration: 0.8 },
    toVars: { y: 0, opacity: 1, scale: 1 },
  },
  // Parallax offset
  parallax: {
    fromVars: { yPercent: 0, duration: 1 },
    toVars: { yPercent: -30 }, // moves 30% slower
  },
  // Float effect
  float: {
    fromVars: { y: 0, duration: 2, ease: 'sine.inOut' },
    toVars: { y: 20, repeat: -1, yoyo: true },
  },
}
