import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill all required fields.");
      return;
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
     const response = await fetch("https://my-portfolio-2-sdvp.onrender.com/contact", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage("Failed to send message. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Server error! Try again later.");
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="contact" className="min-h-screen w-full bg-dark-900 px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center sm:text-left"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Get in Touch
          </h2>

          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl sm:max-w-none">
            Have a project idea or need help? I’d love to collaborate with you.
          </p>
        </motion.div>

{/* Premium Dribbble-Style Contact Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">

  {/* Contact Info */}
  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="space-y-8"
  >
    {[
      {
        label: "Email",
        link: "mailto:rameshbhailakhatriyahimanshu@gmail.com",
        icon: "✉️",
      },
      {
        label: "LinkedIn",
        link: "https://linkedin.com/in/himanshu",
        icon: "💼",
      },
      {
        label: "GitHub",
        link: "https://github.com/Himanshu12180",
        icon: "🐙",
      },
    ].map((contact, i) => (
      <motion.a
        key={i}
        href={contact.link}
        target="_blank"
        rel="noreferrer"
        variants={itemVariants}
        whileHover={{ scale: 1.05, y: -4, rotate: 0.5 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 180 }}

        className="
          relative overflow-hidden rounded-2xl p-6 flex flex-col
          backdrop-blur-xl bg-[#101729]/40 
          border border-white/10 
          hover:border-indigo-500/40 
          shadow-lg hover:shadow-indigo-500/20
          transition-all duration-300 cursor-pointer
          group
        "
      >
        {/* Glow Behind Card */}
        <div className="
          absolute inset-0 opacity-0 group-hover:opacity-30
          bg-gradient-to-br from-indigo-500/40 to-purple-600/40
          blur-3xl transition-all duration-500
        "></div>

        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 10, scale: 1.2 }}
          className="
            text-5xl mb-4 relative z-10 
            drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]
          "
        >
          {contact.icon}
        </motion.div>

        {/* Label Only */}
        <div className="text-xs tracking-wider uppercase text-gray-400 relative z-10">
          {contact.label}
        </div>
      </motion.a>
    ))}
  </motion.div>

  {/* FORM */}
  <motion.form
    onSubmit={handleSubmit}
    className="
      md:col-span-2 backdrop-blur-2xl bg-[#0f1629]/50 
      p-8 rounded-2xl border border-white/10 
      shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 
      transition-all duration-300
    "
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    <div className="space-y-6">

      {/* Inputs */}
      {[
        { name: "name", label: "Name *", placeholder: "Your name" },
        { name: "email", label: "Email *", placeholder: "name@example.com" },
        { name: "subject", label: "Subject", placeholder: "What is this about?" },
      ].map((field, idx) => (
        <motion.div variants={itemVariants} key={idx}>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {field.label}
          </label>

          <input
            type={field.name === "email" ? "email" : "text"}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className="
              w-full px-4 py-3 rounded-xl bg-[#0f1629]/60 
              border border-white/10 text-white placeholder-gray-500
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600 
              outline-none transition-all
            "
            placeholder={field.placeholder}
          />
        </motion.div>
      ))}

      {/* Message */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Message *
        </label>

        <textarea
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="
            w-full px-4 py-3 rounded-xl bg-[#0f1629]/60 
            border border-white/10 text-white placeholder-gray-500
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600 
            outline-none transition-all resize-none
          "
          placeholder="Tell me more..."
        />
      </motion.div>

      {/* Success/Error */}
      {status === "success" && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-400 text-green-300">
          ✓ Message sent successfully!
        </div>
      )}

      {status === "error" && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-400 text-red-300">
          ✗ {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={status === "loading"}
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}

        className="
          w-full py-3 rounded-xl 
          bg-gradient-to-r from-indigo-500 to-purple-600
          text-white font-semibold text-lg
          hover:brightness-110 transition disabled:opacity-40
        "
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </motion.button>
    </div>
  </motion.form>

</div>


      </div>
    </section>
  );
}
