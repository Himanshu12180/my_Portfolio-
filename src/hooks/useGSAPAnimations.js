import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollAnimation - Scroll-triggered animation hook
 * Automatically handles setup and cleanup
 *
 * Usage:
 * useScrollAnimation(elementRef, {
 *   from: { opacity: 0, y: 50 },
 *   to: { opacity: 1, y: 0 },
 *   triggerOptions: { start: 'top 80%', end: 'top 50%' }
 * })
 */
export function useScrollAnimation(elementRef, config = {}) {
  const { from, to, duration = 0.8, ease = 'power2.out', triggerOptions = {} } = config

  useLayoutEffect(() => {
    if (!elementRef?.current) return

    const defaultTriggerOptions = {
      trigger: elementRef.current,
      start: 'top 85%',
      end: 'top 50%',
      markers: false,
    }

    gsap.fromTo(
      elementRef.current,
      from,
      {
        ...to,
        duration,
        ease,
        scrollTrigger: {
          ...defaultTriggerOptions,
          ...triggerOptions,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [elementRef, from, to, duration, ease, triggerOptions])
}

/**
 * useParallax - Parallax scroll effect hook
 *
 * Usage:
 * useParallax(elementRef, { speed: 50 })
 * speed: parallax intensity (positive = slower, negative = faster)
 */
export function useParallax(elementRef, config = {}) {
  const { speed = 50, trigger = null } = config

  useLayoutEffect(() => {
    if (!elementRef?.current) return

    gsap.to(elementRef.current, {
      scrollTrigger: {
        trigger: trigger || elementRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1.2,
        markers: false,
      },
      yPercent: speed,
      ease: 'none',
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [elementRef, speed, trigger])
}

/**
 * usePinSection - Pin section during scroll
 *
 * Usage:
 * usePinSection(sectionRef, { duration: 3 })
 */
export function usePinSection(sectionRef, config = {}) {
  const { duration = 3, end = null } = config

  useLayoutEffect(() => {
    if (!sectionRef?.current) return

    gsap.to(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'center center',
        end: end || `+=${window.innerHeight * duration}`,
        pin: true,
        pinSpacing: false,
        scrub: true,
        markers: false,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [sectionRef, duration, end])
}

/**
 * useScrollProgress - Get scroll progress 0..1 and update elements
 *
 * Returns ref that updates on scroll
 */
export function useScrollProgress(onUpdate = null) {
  const progressRef = useRef(0)

  useLayoutEffect(() => {
    const handleScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      progressRef.current = progress

      if (onUpdate) {
        onUpdate(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [onUpdate])

  return progressRef
}

/**
 * useStaggerAnimation - Staggered animation for multiple elements
 *
 * Usage:
 * useStaggerAnimation(containerRef, {
 *   from: { opacity: 0, y: 50 },
 *   stagger: 0.1,
 * })
 */
export function useStaggerAnimation(containerRef, config = {}) {
  const {
    from = { opacity: 0, y: 50 },
    to = { opacity: 1, y: 0 },
    stagger = 0.1,
    duration = 0.8,
    ease = 'power2.out',
  } = config

  useLayoutEffect(() => {
    if (!containerRef?.current) return

    const children = containerRef.current.querySelectorAll('[data-stagger]')

    gsap.fromTo(
      children,
      from,
      {
        ...to,
        duration,
        ease,
        stagger: {
          amount: stagger,
          from: 'start',
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'top 50%',
          markers: false,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [containerRef, from, to, stagger, duration, ease])
}

/**
 * useMouseParallax - Mouse-driven parallax on element
 *
 * Usage:
 * useMouseParallax(imageRef, { intensity: 20 })
 */
export function useMouseParallax(elementRef, config = {}) {
  const { intensity = 20 } = config

  useLayoutEffect(() => {
    if (!elementRef?.current) return

    const handleMouseMove = (e) => {
      const rect = elementRef.current.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const mouseX = e.clientX - rect.left - centerX
      const mouseY = e.clientY - rect.top - centerY

      const rotateX = (mouseY / centerY) * intensity
      const rotateY = (mouseX / centerX) * intensity

      gsap.to(elementRef.current, {
        rotateX: rotateX * -1,
        rotateY: rotateY,
        duration: 0.5,
        overwrite: 'auto',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(elementRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
      })
    }

    const element = elementRef.current
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [elementRef, intensity])
}

/**
 * useScrollTrigger - Generic scroll trigger hook
 *
 * Usage:
 * useScrollTrigger(elementRef, {
 *   onEnter: () => console.log('entered'),
 *   onLeave: () => console.log('left'),
 * })
 */
export function useScrollTriggerCallback(elementRef, callbacks = {}) {
  useLayoutEffect(() => {
    if (!elementRef?.current) return

    ScrollTrigger.create({
      trigger: elementRef.current,
      onEnter: callbacks.onEnter,
      onLeave: callbacks.onLeave,
      onEnterBack: callbacks.onEnterBack,
      onLeaveBack: callbacks.onLeaveBack,
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [elementRef, callbacks])
}
