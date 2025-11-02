'use client';

import { motion } from 'framer-motion';
import { useAnimationTrigger } from '@/hooks/useAnimationTrigger';
import { fadeInUp, stackPush, staggerContainer } from '@/lib/animations';
import experienceData from '@/data/experience.json';

export const Experience: React.FC = () => {
  const { ref, shouldAnimate } = useAnimationTrigger({ threshold: 0.2 });

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] mb-8">
            My journey through the tech industry
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={staggerContainer}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[var(--color-surface)] hidden md:block" />

          <div className="space-y-8">
            {experienceData.map((job, index) => (
              <motion.div
                key={job.id}
                custom={index}
                variants={stackPush}
                whileHover={{ scale: 1.02 }}
                className="relative bg-[var(--color-surface)] rounded-lg p-6 md:ml-16 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-20 top-8 w-4 h-4 bg-[var(--color-accent)] rounded-full border-4 border-[var(--color-background)] hidden md:block" />
                
                {/* Company Logo */}
                <div className="flex items-start space-x-4 mb-4">
                    <img src={job.logo} alt={job.company} className="w-12 h-12 object-contain rounded-lg" />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                      {job.role}
                    </h3>
                    <p className="text-[var(--color-primary)] font-semibold">
                      {job.company}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-secondary)] mt-1">
                      <span>📅 {job.duration}</span>
                      <span>📍 {job.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-[var(--color-text-primary)] mb-4">
                  {job.description}
                </p>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[var(--color-accent)] mb-2">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-[var(--color-primary)] bg-opacity-20 text-white rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-accent)] mb-2">
                    Key Achievements:
                  </h4>
                  <ul className="space-y-2">
                    {job.achievements.map((achievement, achievementIndex) => (
                      <motion.li
                        key={achievementIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: achievementIndex * 0.1 }}
                        className="flex items-start text-[var(--color-text-secondary)]"
                      >
                        <span className="text-[var(--color-accent)] mr-2 mt-1">•</span>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Career Stats */}
        <motion.div
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={fadeInUp}
          className="mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Years Experience', value: '3+', icon: '⏱️' },
              { label: 'Companies', value: '2', icon: '🏢' },
              { label: 'Team Members Led', value: '10+', icon: '👥' },
              { label: 'Projects Delivered', value: '50+', icon: '🚀' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-[var(--color-surface)] rounded-lg"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
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
    </section>
  );
};
