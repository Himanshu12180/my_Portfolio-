import { motion } from "framer-motion";
import { useState } from "react";

/**
 * ProjectCard Component
 * Individual project card with hover animations
 * Supports both manual projects and GitHub repos
 */
export default function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
      },
    },
  };

  const isGitHub = !!project.url;
  const projectUrl = project.url || project.repo || "#";
  const demoUrl = project.demo || project.homepage;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
    >
      <motion.div
        className="relative h-full bg-dark-800 rounded-xl p-6 border border-dark-600 hover:border-indigo-500 transition-colors overflow-hidden"
        whileHover={{ y: -8 }}
      >
        {/* Animated background glow on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-0 -z-10"
          animate={{ opacity: isHovered ? 0.1 : 0 }}
        />

        {/* Tech Stack Badge */}
        {isGitHub && project.language && (
          <div className="inline-block px-2 py-1 bg-indigo-900 text-indigo-300 text-xs rounded-lg mb-3">
            {project.language}
          </div>
        )}

        {/* Tech Tags */}
        {!isGitHub && project.tech && (
          <div className="flex gap-2 flex-wrap mb-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 bg-dark-700 text-indigo-300 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Project Title */}
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* GitHub Stats */}
        {isGitHub && project.stars && (
          <div className="text-xs text-gray-500 mb-4">
            ⭐ {project.stars} stars
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3 flex-wrap">
          <motion.a
            href={projectUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            whileHover={{ x: 4 }}
          >
            View {isGitHub ? "Repository" : "Project"} →
          </motion.a>
          {demoUrl && (
            <motion.a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
              whileHover={{ x: 4 }}
            >
              Demo →
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
