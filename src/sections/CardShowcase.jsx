import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * FloatingCard: Individual card with hover float effect
 * Responds to scroll and hovers smoothly
 */
function FloatingCard({ title, description, icon, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    if (!cardRef.current) return

    // Stagger entrance animations
    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        end: 'top 50%',
        scrub: 1,
      },
      opacity: 0,
      y: 80,
      duration: 0.8,
      delay: index * 0.15,
    })

    // Gentle floating animation
    gsap.to(cardRef.current, {
      y: -20,
      duration: 3 + index * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [index])

  return (
    <div
      ref={cardRef}
      style={{
        padding: '40px 30px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, {
          boxShadow: '0 30px 60px rgba(99, 102, 241, 0.4)',
          borderColor: 'rgba(99, 102, 241, 0.5)',
          duration: 0.3,
        })
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, {
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          borderColor: 'rgba(99, 102, 241, 0.2)',
          duration: 0.3,
        })
      }}
    >
      <div
        style={{
          fontSize: '2.5rem',
          marginBottom: '15px',
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          margin: '0 0 10px 0',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#fff',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: '0.95rem',
          color: '#b4b4cc',
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
    </div>
  )
}

/**
 * CardShowcase: Full section with floating cards
 * Cards animate in staggered and float gently while scrolling
 */
export default function CardShowcase() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  const cards = [
    {
      icon: '⚡',
      title: 'Performance',
      description: 'GPU-accelerated transforms and smooth 60fps animations.',
    },
    {
      icon: '🎨',
      title: 'Design',
      description: 'Beautiful gradients, glassmorphism, and modern aesthetics.',
    },
    {
      icon: '✨',
      title: 'Smooth Motion',
      description: 'Buttery-smooth scroll with GSAP ScrollSmoother.',
    },
    {
      icon: '🚀',
      title: 'Responsive',
      description: 'Works perfectly on mobile, tablet, and desktop.',
    },
    {
      icon: '🎯',
      title: 'Engaging',
      description: 'Capture attention with scroll-triggered animations.',
    },
    {
      icon: '💎',
      title: 'Premium Feel',
      description: 'Professional touches that impress your audience.',
    },
  ]

  useEffect(() => {
    if (!titleRef.current) return

    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      },
      opacity: 0,
      y: 60,
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
        background: 'linear-gradient(180deg, #0f0f1e 0%, #1a1a2e 100%)',
        color: '#fff',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Title */}
        <div
          ref={titleRef}
          style={{
            textAlign: 'center',
            marginBottom: '80px',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: 900,
              margin: '0 0 20px 0',
            }}
          >
            Features & Effects
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: '#b4b4cc',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Smooth scroll animations with floating cards, parallax effects, and GPU-accelerated transforms.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
          }}
        >
          {cards.map((card, index) => (
            <FloatingCard key={index} {...card} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
