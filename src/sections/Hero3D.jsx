import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Icosahedron, Float } from "@react-three/drei";
import { motion } from "framer-motion";

/**
 * ParticleField Component
 * Low-poly procedural particle system for hero background
 */
function ParticleField() {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={500}
          array={new Float32Array(
            Array.from({ length: 500 * 3 }, () => (Math.random() - 0.5) * 20)
          )}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} sizeAttenuation color="#6366f1" />
    </points>
  );
}

/**
 * AnimatedMesh Component
 * Wobbling icosahedron with interactive rotation
 * Performance: uses native Three.js for smooth 60fps
 */
function AnimatedMesh() {
  return (
    <Float floatIntensity={2} speed={1.5}>
      <Icosahedron args={[1, 4]} castShadow>
        <meshPhongMaterial
          color="#6366f1"
          wireframe={false}
          emissive="#4f46e5"
          shininess={100}
        />
      </Icosahedron>
    </Float>
  );
}

/**
 * Scene Component
 * Three.js scene setup with lights and environment
 */
function Scene() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      <color attach="background" args={["#0a0e27"]} />
      
      {/* Lighting setup for dramatic effect */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#a855f7" />

      {/* Particle field background */}
      <ParticleField />

      {/* Main 3D mesh */}
      <AnimatedMesh />

      {/* Only use OrbitControls on desktop (better performance on mobile) */}
      {!isMobile && (
        <OrbitControls
          autoRotate
          autoRotateSpeed={4}
          enableZoom={false}
          enablePan={false}
        />
      )}
    </>
  );
}

/**
 * Hero3D Section
 * Full-screen hero with interactive 3D scene and overlay text
 */
export default function Hero3D({ onNavigateDown }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="relative w-full h-screen bg-dark-900 overflow-hidden">
      {/* 3D Canvas - memoized to prevent unnecessary re-renders */}
      <Suspense fallback={<div className="w-full h-full bg-dark-800" />}>
        <Canvas
          camera={{ position: [0, 0, 3], fov: 45 }}
          performance={{ min: 0.5 }}
          dpr={isMobile ? 1 : 2} // Lower DPI on mobile
          className="!absolute inset-0"
        >
          <Scene />
        </Canvas>
      </Suspense>

      {/* Overlay Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10"
      >
        <div className="max-w-2xl">
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">Developer</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Building beautiful, interactive web experiences with React, Three.js, and modern JavaScript
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              onClick={onNavigateDown}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              View My Work
            </motion.button>

            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigateDown();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-indigo-400 text-indigo-400 rounded-lg font-semibold hover:bg-indigo-950 transition-colors"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-400">Scroll or press arrow keys</span>
          <svg
            className="w-6 h-6 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
