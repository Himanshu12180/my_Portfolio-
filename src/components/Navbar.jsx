import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollUp, setScrollUp] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const navLinks = ["Home", "About", "Projects", "Services", "Contact"];

  // Navbar hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrollUp(current < lastScroll || current < 10);
      setLastScroll(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const navVariants = {
    hidden: { y: -60, opacity: 0 },
    scrollHide: { y: -80, opacity: 0, transition: { duration: 0.4, ease: "easeOut" }},
    scrollShow: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" }}
  };

 const logoVariants = {
  hover: {
    scale: 1.18,
    rotate: [0, 10, -10, 0],
    boxShadow: [
      "0 0 20px rgba(99,102,241,0.6)",
      "0 0 30px rgba(139,92,246,0.8)",
      "0 0 25px rgba(6,182,212,0.7)"
    ],
    filter: "drop-shadow(0 0 12px rgba(138,43,226,0.8))",
    transition: {
      duration: 0.9,
      ease: "easeInOut",
    }
  }
};
  

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate={scrollUp ? "scrollShow" : "scrollHide"}
      className="
        fixed top-0 left-0 right-0 
        bg-dark-900/50 
        backdrop-blur-xl
        border-b border-indigo-500/20
        shadow-[0_0_25px_rgba(99,102,241,0.35)]
        z-50
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* LOGO — HL + EMOJI ICON */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer select-none"
          variants={logoVariants}
          whileHover="hover"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <motion.div
            className="
              w-12 h-12 
              bg-gradient-to-br from-indigo-500 to-purple-700 
              rounded-2xl 
              flex items-center justify-center
              shadow-[0_0_25px_rgba(99,102,241,0.7)]
              border border-indigo-400/30
            "
            animate={{
              rotate: [0, 3, -3, 0],
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 18px rgba(99,102,241,0.5)",
                "0 0 25px rgba(139,92,246,0.6)",
                "0 0 20px rgba(99,102,241,0.7)"
              ]
            }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            {/* HL logo + emoji */}
            <span className="text-white font-extrabold text-xl tracking-tight flex items-center gap-1">
              HL <span className="text-yellow-300 text-lg">⚡</span>
            </span>
          </motion.div>

          <span className="text-white font-semibold hidden sm:inline text-lg tracking-wide">
            Himanshu Lakhatriya
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((label, idx) => (
            <motion.a
              key={idx}
              href={`#${label.toLowerCase()}`}
              className="
                relative text-sm font-medium text-gray-300 hover:text-white 
                transition-all
              "
              whileHover={{
                scale: 1.14,
                textShadow: "0 0 12px rgba(255,255,255,0.7)"
              }}
            >
              {label}

              {/* Underline animation */}
              <motion.span
                className="absolute left-0 -bottom-1 h-[2px] bg-indigo-400 rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.25 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Desktop Contact Button */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.08 }}
          className="
            hidden md:block px-6 py-2 
            bg-gradient-to-r from-indigo-600 to-cyan-500
            text-white rounded-lg font-medium 
            shadow-[0_0_12px_rgba(99,102,241,0.6)]
            hover:shadow-[0_0_22px_rgba(99,102,241,1)]
            transition-all
          "
        >
          Contact
        </motion.a>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          className="md:hidden text-white text-3xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </motion.button>
      </div>

      {/* Mobile Dropdown */}
      <motion.div
        id="mobile-menu"
        initial={{ height: 0, opacity: 0 }}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="
          md:hidden bg-dark-800/90 backdrop-blur-xl 
          border-t border-indigo-400/20 
          px-6 py-4 space-y-4 overflow-hidden
        "
      >
        {navLinks.map((label, idx) => (
          <motion.a
            key={idx}
            href={`#${label.toLowerCase()}`}
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-gray-300 hover:text-white"
            whileHover={{ x: 8 }}
          >
            {label}
          </motion.a>
        ))}

        <motion.a
          href="#contact"
          onClick={() => setMobileOpen(false)}
          whileHover={{ x: 8 }}
          className="block text-base font-medium text-indigo-400"
        >
          Contact →
        </motion.a>
      </motion.div>
    </motion.nav>
  );
}
