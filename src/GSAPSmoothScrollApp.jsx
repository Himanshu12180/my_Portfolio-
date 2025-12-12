import React from 'react'
import SmoothScroll from './components/SmoothScroll'
import HeroSectionGSAP from './sections/HeroSectionGSAP'
import ParallaxSection from './sections/ParallaxSection'
import AboutSectionGSAP from './sections/AboutSectionGSAP'
import CardShowcase from './sections/CardShowcase'
import './animations.css'

/**
 * Complete GSAP Smooth Scroll Demo App
 * Features:
 * - ScrollSmoother for buttery-smooth scrolling
 * - Hero section with text reveal animations
 * - Parallax layers with depth effects
 * - 3D transforms with perspective
 * - Floating cards with staggered animations
 * - Full mobile responsiveness
 * - GPU-accelerated transforms
 * - Accessibility support (prefers-reduced-motion)
 */
export default function GSAPSmoothScrollApp() {
  return (
    <SmoothScroll smoothAmount={2}>
      <div style={{ width: '100%' }}>
        {/* Hero Section */}
        <HeroSectionGSAP />

        {/* About Section with 3D Effects */}
        <AboutSectionGSAP />

        {/* Parallax Section */}
        <ParallaxSection />

        {/* Card Showcase */}
        <CardShowcase />

        {/* Footer */}
        <footer
          style={{
            padding: '60px 40px',
            textAlign: 'center',
            background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
            borderTop: '1px solid rgba(99, 102, 241, 0.1)',
            color: '#b4b4cc',
          }}
        >
          <h3 style={{ margin: '0 0 20px 0', color: '#fff' }}>
            Built with GSAP & React
          </h3>
          <p style={{ margin: '0 0 30px 0' }}>
            Smooth scroll animations, parallax effects, and 3D transforms for the web.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', fontSize: '0.9rem' }}>
            <a href="#" style={{ color: '#6366f1', textDecoration: 'none' }}>
              GitHub
            </a>
            <a href="#" style={{ color: '#6366f1', textDecoration: 'none' }}>
              Documentation
            </a>
            <a href="#" style={{ color: '#6366f1', textDecoration: 'none' }}>
              GSAP Docs
            </a>
          </div>
          <p style={{ margin: '30px 0 0 0', fontSize: '0.85rem' }}>
            © 2024 Smooth Scroll Experience. All rights reserved.
          </p>
        </footer>
      </div>
    </SmoothScroll>
  )
}
