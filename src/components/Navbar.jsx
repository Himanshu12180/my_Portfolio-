import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const navLinks = ["Home", "About", "Projects", "Services", "Contact"];

  const navVariants = {
    hidden: { y: -40, opacity: 0, backdropFilter: "blur(0px)" },
    visible: {
      y: 0,
      opacity: 1,
      backdropFilter: "blur(10px)",
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const logoVariants = {
    hover: {
      rotate: 360,
      scale: 1.1,
      boxShadow: "0px 0px 15px rgba(99,102,241,0.8)",
      transition: { duration: 1 }
    }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 bg-dark-900 bg-opacity-80 backdrop-blur-md z-50 border-b border-indigo-500 border-opacity-20 will-change-transform"
      style={{ transform: "translate3d(0, 0, 0)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* LOGO */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          variants={logoVariants}
          whileHover="hover"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center"
            animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <span className="text-white font-bold text-lg">P</span>
          </motion.div>

          <span className="text-white font-semibold hidden sm:inline text-lg tracking-wide">
            Portfolio
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((label, idx) => (
            <motion.a
              key={idx}
              href={`#${label.toLowerCase()}`}
              className="relative text-sm font-medium text-gray-300 hover:text-white transition"
              whileHover={{ scale: 1.08 }}
            >
              {label}
            </motion.a>
          ))}
        </div>

        {/* Contact button (desktop) */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          className="hidden md:block px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Contact
        </motion.a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-dark-800 border-t border-indigo-400 border-opacity-20 px-6 py-4 space-y-4"
        >
          {navLinks.map((label, idx) => (
            <motion.a
              key={idx}
              href={`#${label.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="block w-full text-left text-base font-medium text-gray-300 hover:text-white"
              whileHover={{ x: 6 }}
            >
              {label}
            </motion.a>
          ))}

          <motion.a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            whileHover={{ x: 6 }}
            className="block w-full text-left text-base font-medium text-indigo-400"
          >
            Contact →
          </motion.a>
        </motion.div>
      )}
    </motion.nav>
  );
}
