import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

/**
 * SlideWrapper Component
 * Handles full-page slide transitions with Framer Motion
 * Supports enter/exit animations and respects prefers-reduced-motion
 */
export default function SlideWrapper({ children, index, currentSlide }) {
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  const isActive = index === currentSlide;

  // Animation variants
  const slideVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : -100,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.section
          key={`slide-${index}`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={slideVariants}
          className="min-h-screen w-full flex items-center justify-center overflow-hidden"
        >
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
