'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimationTrigger } from '@/hooks/useAnimationTrigger';
import { fadeInUp, projectCard, staggerContainer } from '@/lib/animations';
import projectsData from '@/data/projects.json';

interface ProjectModalProps {
  project: typeof projectsData[0];
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-[var(--color-surface)] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
              {project.title}
            </h3>
            <button
              onClick={onClose}
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg bg-[var(--color-background)]"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDQ0NzVhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2Y4ZjhmMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
                }}
              />
              
              <div className="mt-4">
                <h4 className="font-semibold text-[var(--color-accent)] mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[var(--color-primary)] bg-opacity-20 text-white rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[var(--color-text-primary)]">{project.description}</p>
              
              <div>
                <h4 className="font-semibold text-[var(--color-accent)] mb-2">Key Features</h4>
                <ul className="space-y-1">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="text-[var(--color-text-secondary)] flex items-start">
                      <span className="text-[var(--color-accent)] mr-2">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-4">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-secondary)] transition-colors"
                >
                  Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                >
                  View Code
                </a>
              </div>
            </div>
          </div>

          {/* Git History */}
          <div className="mt-8">
            <h4 className="font-semibold text-[var(--color-accent)] mb-4">Development Timeline</h4>
            <div className="space-y-3">
              {project.commits.map((commit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-3 bg-[var(--color-background)] rounded"
                >
                  <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-mono text-sm text-[var(--color-primary)]">
                      {commit.hash}
                    </div>
                    <div className="text-[var(--color-text-primary)]">{commit.message}</div>
                    <div className="text-xs text-[var(--color-text-secondary)]">{commit.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
  const { ref, shouldAnimate } = useAnimationTrigger({ threshold: 0.2 });

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] mb-8">
            A showcase of my recent work and contributions
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              variants={projectCard}
              whileHover="hover"
              className="bg-[var(--color-surface)] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDQ0NzVhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2Y4ZjhmMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
                  }}
                />
                <div className="absolute inset-0 bg-transparent bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="text-[var(--color-text-primary)] font-semibold"
                  >
                    View Details
                  </motion.div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                  {project.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-[var(--color-primary)] bg-opacity-20 text-white rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 bg-[var(--color-surface)] text-[var(--color-text-secondary)] rounded text-xs">
                      +{project.techStack.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                      🔗 Demo
                    </a>
                  )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                      📁 Code
                    </a>
                  )}
                  </div>
                  <span className="text-xs text-[var(--color-text-secondary)]">
                    {project.commits.length} commits
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub Stats */}
        <motion.div
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={fadeInUp}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { label: 'Public Repos', value: '25+' },
              { label: 'Total Commits', value: '80+' },
              { label: 'Pull Requests', value: '15+' },
              { label: 'Code Reviews', value: '300+' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-[var(--color-surface)] rounded-lg p-4"
              >
                <div className="text-2xl font-bold text-[var(--color-accent)]">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
