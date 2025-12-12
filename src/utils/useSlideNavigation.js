import { useState, useCallback, useEffect } from "react";

/**
 * Custom hook for managing slide navigation
 * Handles keyboard, wheel, and touch navigation
 */
export const useSlideNavigation = (totalSlides) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Debounce timer for wheel events
  const debounceTimer = typeof window !== "undefined" ? { current: null } : null;

  const goToSlide = useCallback((slideIndex) => {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      setIsTransitioning(true);
      setCurrentSlide(slideIndex);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    goToSlide(Math.min(currentSlide + 1, totalSlides - 1));
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(Math.max(currentSlide - 1, 0));
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (e) => {
      if (isTransitioning) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, isTransitioning]);

  // Wheel navigation (debounced for smooth transitions)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleWheel = (e) => {
      if (isTransitioning) return;

      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      debounceTimer.current = setTimeout(() => {
        if (e.deltaY > 0) {
          nextSlide();
        } else if (e.deltaY < 0) {
          prevSlide();
        }
      }, 50);
    };

    // Use passive listener for better scroll performance
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [nextSlide, prevSlide, isTransitioning]);

  return {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    isTransitioning,
  };
};

export default useSlideNavigation;
