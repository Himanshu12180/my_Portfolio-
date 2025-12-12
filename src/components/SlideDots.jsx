import { motion } from "framer-motion";

/**
 * SlideDots Component
 * Right-side navigation dots with animated indicators
 * Shows current slide position and allows navigation
 */
export default function SlideDots({ currentSlide, totalSlides, onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
      role="navigation"
      aria-label="Slide navigation"
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => onNavigate(index)}
          className={`w-3 h-3 rounded-full transition-all ${
            currentSlide === index
              ? "bg-indigo-500 w-8"
              : "bg-gray-500 hover:bg-gray-300"
          }`}
          whileHover={{ scale: 1.2 }}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={currentSlide === index ? "page" : undefined}
        />
      ))}
    </motion.div>
  );
}
