import { motion } from "framer-motion";

/**
 * About Section (Updated According to Resume + AI Tools)
 */
export default function About() {
  const skills = [
    { 
      category: "Frontend", 
      items: ["React", "Next.js", "Tailwind CSS", "Bootstrap", "JavaScript", "HTML5", "CSS3"] 
    },
    { 
      category: "Backend", 
      items: ["Node.js", "Express.js", "MongoDB"] 
    },
    { 
      category: "3D & Motion", 
      items: ["Framer Motion", "Three.js", "WebGL"] 
    },
    { 
      category: "AI Tools", 
      items: ["Cursor", "ChatGPT", "GitHub Copilot", "Windsurf", "Canva"] 
    },
    { 
      category: "Tools & Platforms", 
      items: ["VS Code", "Figma", "WordPress", "Git", "Clipchamp"] 
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <section id="about" className="min-h-screen w-full bg-dark-900 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-white mb-12">About Me</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Bio Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-4">
                I am a passionate MERN Stack Developer with hands-on experience in building 
                responsive, user-friendly, and scalable web applications. With strong expertise 
                in React, Node.js, Express, and MongoDB, I enjoy converting ideas into clean, 
                maintainable, and production-ready code.
              </motion.p>

              <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-4">
                During my 6-month training at Felix IT Systems, I developed projects such as 
                e-commerce platforms, authentication systems, and real-time weather apps. 
                I focus heavily on writing secure, efficient backend APIs and modern frontend 
                interfaces that deliver smooth user experiences.
              </motion.p>

              <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-4">
                I also leverage AI tools like Cursor, ChatGPT, GitHub Copilot, Windsurf, and 
                Canva to boost creativity, speed, and workflow efficiency. These tools help me 
                collaborate better, debug faster, and bring ideas to life with greater impact.
              </motion.p>

              <motion.p variants={itemVariants} className="text-lg text-gray-300">
                Outside of coding, I explore new technologies, redesign UI concepts, and share 
                knowledge with other developers as I continue my journey of growth and learning.
              </motion.p>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { label: "Experience", value: "6+ Months" },
                { label: "Projects Completed", value: "6+" },
                { label: "Technologies Used", value: "20+" },
                { label: "AI Tools Expertise", value: "5+" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-dark-800 p-6 rounded-lg border border-dark-600 hover:border-indigo-500 transition-colors"
                >
                  <div className="text-3xl font-bold text-indigo-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Skills Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">Skills & Technologies</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skillGroup, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-dark-800 p-6 rounded-lg border border-dark-600 hover:border-indigo-500 transition-colors"
                >
                  <h4 className="text-lg font-semibold text-indigo-400 mb-4">
                    {skillGroup.category}
                  </h4>

                  <div className="flex gap-2 flex-wrap">
                    {skillGroup.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 bg-dark-700 text-gray-300 text-sm rounded-full hover:bg-indigo-900 hover:text-indigo-300 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
