import { Suspense, lazy, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Contact from "./sections/Contact";
import "./gsap-animations.css";
import "./spiritual-animations.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Lazy load heavy sections
const LazyAbout = lazy(() => Promise.resolve({ default: About }));
const LazyProjects = lazy(() => Promise.resolve({ default: Projects }));
const LazyServices = lazy(() => Promise.resolve({ default: Services }));
const LazyContact = lazy(() => Promise.resolve({ default: Contact }));

/**
 * Main App Component with GSAP ScrollSmoother
 * Premium smooth scrolling experience matching GSAP.com/pricing
 */
export default function App() {
  useEffect(() => {
    // Initialize ScrollSmoother for buttery smooth scrolling
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2.5, // Smoothing amount (higher = smoother but slower response)
      effects: true, // Enable scroll-triggered effects
      onUpdate: (self) => {
        // Update scroll progress for reactive animations
        document.documentElement.style.setProperty(
          "--scroll-progress",
          self.getVelocity() / 300
        );
      },
    });

    return () => {
      smoother?.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Navbar - stays on top with fixed positioning */}
      <Navbar />

      {/* ScrollSmoother Wrapper - contains the entire scrollable content */}
      <div id="smooth-wrapper" className="relative w-full h-screen overflow-hidden bg-slate-950">
        {/* ScrollSmoother Content - actual content inside */}
        <div id="smooth-content" className="relative w-full">
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <Suspense fallback={<div className="w-full min-h-screen bg-slate-950" />}>
            <LazyAbout />
          </Suspense>

          {/* Projects Section */}
          <Suspense fallback={<div className="w-full min-h-screen bg-slate-950" />}>
            <LazyProjects />
          </Suspense>

          {/* Services Section */}
          <Suspense fallback={<div className="w-full min-h-screen bg-slate-950" />}>
            <LazyServices />
          </Suspense>

          {/* Contact Section */}
          <Suspense fallback={<div className="w-full min-h-screen bg-slate-950" />}>
            <LazyContact />
          </Suspense>
        </div>
      </div>
    </>
  );
}
