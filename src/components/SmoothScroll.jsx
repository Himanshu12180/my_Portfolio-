import React, { useEffect } from 'react'
import { useGSAPSetup } from '../hooks/useGSAPSetup'

/**
 * SmoothScroll: Wrapper component that enables GSAP ScrollSmoother
 * Provides buttery-smooth scrolling for the entire page
 * Usage: Wrap your app content with this component
 */
export default function SmoothScroll({ children, smoothAmount = 2 }) {
  useGSAPSetup()

  return (
    <div
      className="smooth-scroll-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* ScrollSmoother will look for this div with data-smooth attribute */}
      <div
        data-smooth-container
        style={{
          width: '100%',
        }}
      >
        <div data-smooth>{children}</div>
      </div>
    </div>
  )
}
