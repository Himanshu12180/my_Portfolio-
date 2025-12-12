import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import { Suspense } from "react";

/**
 * FloatingOrb Component
 * Simple 3D floating sphere for service cards
 */
function FloatingOrb({ color = "#6366f1" }) {
  return (
    <Float floatIntensity={1.5} speed={2}>
      <Sphere args={[0.6, 32, 32]}>
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          shininess={50}
        />
      </Sphere>
    </Float>
  );
}

/**
 * Services Section
 * Cards with 3D accents and micro-interactions
 */
export default function Services() {
  const services = [
    {
      id: 1,
      title: "Frontend Development",
      description: "Modern, responsive web applications built with React, Vue, and Tailwind CSS. Performance-optimized and fully accessible.",
      icon: "🎨",
      color: "#6366f1",
    },
    {
      id: 2,
      title: "3D Web Graphics",
      description: "Interactive 3D experiences using Three.js and WebGL. From procedural meshes to complex visualizations and games.",
      icon: "🌐",
      color: "#a855f7",
    },
    {
      id: 3,
      title: "Full-Stack Development",
      description: "Complete web solutions with Node.js backends, databases, and APIs. Scalable architectures for modern applications.",
      icon: "⚙️",
      color: "#06b6d4",
    },
    {
      id: 4,
      title: "Animation & Motion",
      description: "Smooth, performant animations with Framer Motion. Micro-interactions that delight users and enhance UX.",
      icon: "✨",
      color: "#ec4899",
    },
    {
      id: 5,
      title: "Optimization & Performance",
      description: "Code splitting, lazy loading, and performance monitoring. Achieving 90+ Lighthouse scores consistently.",
      icon: "⚡",
      color: "#f59e0b",
    },
    {
      id: 6,
      title: "Consulting & Mentoring",
      description: "Technical guidance for startups and teams. Best practices, architecture reviews, and developer training.",
      icon: "💡",
      color: "#10b981",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="services" className="min-h-screen w-full bg-dark-900 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-white mb-4">Services</h2>
          <p className="text-xl text-gray-400 mb-12">
            What I can help you build
          </p>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group relative"
              >
                {/* Card */}
                <motion.div
                  className="relative h-full bg-dark-800 rounded-xl p-6 border border-dark-600 hover:border-indigo-500 transition-colors overflow-hidden"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated background glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-0 -z-10"
                    animate={{
                      opacity: 0,
                    }}
                    whileGroupHover={{ opacity: 0.1 }}
                  />

                  {/* 3D Orb - only render on desktop for performance */}
                  {typeof window !== "undefined" &&
                    window.innerWidth > 768 && (
                      <div className="absolute top-2 right-2 w-20 h-20 opacity-20 group-hover:opacity-40 transition-opacity">
                        <Suspense fallback={null}>
                          <Canvas
                            camera={{ position: [0, 0, 3], fov: 45 }}
                            className="!absolute inset-0"
                          >
                            <color attach="background" args={["transparent"]} />
                            <ambientLight intensity={0.5} />
                            <pointLight position={[5, 5, 5]} intensity={0.8} />
                            <FloatingOrb color={service.color} />
                          </Canvas>
                        </Suspense>
                      </div>
                    )}

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{service.icon}</div>

                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 w-0 group-hover:w-full transition-all"
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-gray-400 mb-6">
              Have a project in mind? Let's build something amazing together.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Start Your Project
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}