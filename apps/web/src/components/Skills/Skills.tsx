'use client';

import { useState, Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SkillsGraph } from './SkillsGraph';
import { useAnimationTrigger } from '@/hooks/useAnimationTrigger';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Skill } from '@/types/skill';
import skillsData from '@/data/skills.json';

export const Skills: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { ref, shouldAnimate } = useAnimationTrigger({ threshold: 0.3 });

  const categories = ['all', 'frontend', 'backend', 'tools', 'cloud'];
  
  const filteredSkills = useMemo(() => {
    return selectedCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === selectedCategory);

  }, [selectedCategory]);
  
  const skillsByLevel = {
    expert: filteredSkills.filter(skill => skill.level === 'expert'),
    proficient: filteredSkills.filter(skill => skill.level === 'proficient'),
    learning: filteredSkills.filter(skill => skill.level === 'learning'),
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] mb-8">
            Interactive 3D visualization of my technical expertise
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 3D Skills Graph */}
          <motion.div
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            variants={fadeInUp}
            className="lg:col-span-2"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                Dependency Graph
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Hover over nodes to see connections between technologies
              </p>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* <Suspense fallback={
              <div className="w-full h-[600px] bg-[var(--color-surface)] rounded-lg flex items-center justify-center">
                <div className="text-[var(--color-text-secondary)]">Loading 3D visualization...</div>
              </div>
            }> */}
              <SkillsGraph 
                skillsData={filteredSkills}
                hoveredSkill={hoveredSkill}
                onSkillHover={setHoveredSkill}
              />
            {/* </Suspense> */}

            <div className="mt-12 text-center text-sm text-[var(--color-text-secondary)]">
            {/* Legend */}
            <motion.div
              variants={fadeInUp}
              className="bg-[var(--color-surface)] rounded-lg p-6 h-150px w-650px"
            >
              <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Legend</h4>
              <div className="space-y-2 text-sm flex justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[var(--color-accent)] rounded-full"></div>
                  <span className="text-[var(--color-text-primary)]">Expert Level</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[var(--color-primary)] rounded-full"></div>
                  <span className="text-[var(--color-text-primary)]">Proficient Level</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[var(--color-secondary)] rounded-full"></div>
                  <span className="text-[var(--color-text-primary)]">Learning Level</span>
                </div>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-4">
                Node size represents proficiency level. Lines show technology relationships.
              </p>
            </motion.div>
            </div>
          </motion.div>

          {/* Skills Details Panel */}
          <motion.div
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-6"
          >
            {/* Hovered Skill Details */}
            {hoveredSkill && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[var(--color-surface)] rounded-lg p-6"
              >
                <h4 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                  {hoveredSkill.name}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Level:</span>
                    <span className={`font-medium ${
                      hoveredSkill.level === 'expert' ? 'text-[var(--color-accent)]' :
                      hoveredSkill.level === 'proficient' ? 'text-[var(--color-primary)]' :
                      'text-[var(--color-secondary)]'
                    }`}>
                      {hoveredSkill.level.charAt(0).toUpperCase() + hoveredSkill.level.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Experience:</span>
                    <span className="text-[var(--color-text-primary)]">{hoveredSkill.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Category:</span>
                    <span className="text-[var(--color-text-primary)]">{hoveredSkill.category}</span>
                  </div>
                </div>
                
                {hoveredSkill.connections.length > 0 && (
                  <div className="mt-4">
                    <span className="text-[var(--color-text-secondary)] text-sm">Connected to:</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {hoveredSkill.connections.map(connectionId => {
                        const connectedSkill = skillsData.find(s => s.id === connectionId);
                        return connectedSkill ? (
                          <span
                            key={connectionId}
                            className="px-2 py-1 bg-[var(--color-primary)] bg-opacity-20 text-white rounded text-xs"
                          >
                            {connectedSkill.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Skills by Level */}
            {Object.entries(skillsByLevel).map(([level, skills]) => (
              skills.length > 0 && (
                <motion.div
                  key={level}
                  variants={fadeInUp}
                  className="bg-[var(--color-surface)] rounded-lg p-6 max-h-65 overflow-y-auto"
                >
                  <h4 className={`text-lg font-bold mb-4 ${
                    level === 'expert' ? 'text-[var(--color-accent)]' :
                    level === 'proficient' ? 'text-[var(--color-primary)]' :
                    'text-[var(--color-secondary)]'
                  }`}>
                    {level.charAt(0).toUpperCase() + level.slice(1)} ({skills.length})
                  </h4>
                  <div className="space-y-2">
                    {skills.map(skill => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between p-2 rounded hover:bg-[var(--color-background)] transition-colors cursor-pointer"
                        // onMouseEnter={() => setHoveredSkill(skill)}
                        // onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <span className="text-[var(--color-text-primary)]">{skill.name}</span>
                        <span className="text-xs text-[var(--color-text-secondary)]">
                          {skill.experience}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            ))}

          </motion.div>
        </div>

      </div>
    </section>
  );
};
