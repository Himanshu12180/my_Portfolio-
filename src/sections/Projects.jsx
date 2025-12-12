import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { fetchRepos } from "../utils/github";

// ---------------------------------------------
// GLOBAL GITHUB USERNAME (Fix for your error)
// ---------------------------------------------
const GITHUB_USERNAME = "Himanshu12180";

/**
 * Manual fallback projects
 */
const MANUAL_PROJECTS = [
  {
    id: "p1",
    name: "Interactive Portfolio",
    description: "Personal portfolio with 3D hero section, smooth animations, and GitHub integration.",
    tech: ["React", "Tailwind CSS", "Three.js", "Framer Motion"],
    demo: "#",
    repo: "https://github.com/Himanshu12180",
  },
  {
    id: "p2",
    name: "E-Commerce Platform",
    description: "Full-stack e-commerce with payment integration and admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    demo: "#",
    repo: "https://github.com/Himanshu12180",
  },
  {
    id: "p3",
    name: "Real-time Chat Application",
    description: "WebSocket-based messaging app with authentication and notifications.",
    tech: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    demo: "#",
    repo: "https://github.com/Himanshu12180",
  },
  {
    id: "p4",
    name: "WhatsApp Auto Sender",
    description: "Automation system to send templated WhatsApp messages via API.",
    tech: ["Node.js", "Express", "WhatsApp API"],
    demo: "#",
    repo: "https://github.com/Himanshu12180",
  },
  {
    id: "p5",
    name: "AI Content Generator",
    description: "App for generating content using OpenAI API with real-time streaming.",
    tech: ["React", "Node.js", "OpenAI API", "TypeScript"],
    demo: "#",
    repo: "https://github.com/Himanshu12180",
  },
  {
    id: "p6",
    name: "Analytics Dashboard",
    description: "Dashboard with charts, analytics, and real-time data.",
    tech: ["React", "D3.js", "Node.js", "PostgreSQL"],
    demo: "#",
    repo: "https://github.com/Himanshu12180",
  },
];

// ----------------------------------------------------
// PROJECTS SECTION COMPONENT
// ----------------------------------------------------
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);

      const repos = await fetchRepos(GITHUB_USERNAME, 6);

      if (!repos || !Array.isArray(repos)) {
        // GitHub API failed → use manual projects
        setProjects(MANUAL_PROJECTS);
        setError("GitHub API unavailable. Showing featured projects instead.");
      } else {
        setProjects(repos);
        setError(null);
      }

      setLoading(false);
    };

    loadProjects();
  }, []);

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

  return (
    <section className="min-h-screen w-full bg-dark-900 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-400 mb-12">
            A selection of my recent work and open-source contributions
          </p>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 p-4 bg-amber-900 bg-opacity-20 border border-amber-700 text-amber-300 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-dark-800 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            // Projects Grid
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id || project.name}
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>
          )}

          {/* View More CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <motion.a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-block px-8 py-3 border-2 border-indigo-400 text-indigo-400 rounded-lg font-semibold hover:bg-indigo-950 transition-colors"
            >
              View All Projects on GitHub →
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Export fallback for testing/debug
export { MANUAL_PROJECTS };
