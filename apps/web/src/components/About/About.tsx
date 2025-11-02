'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAnimationTrigger } from '@/hooks/useAnimationTrigger';
import { codeTransform, fadeInUp } from '@/lib/animations';

export const About: React.FC = () => {
  const [isTransformed, setIsTransformed] = useState(false);
  const { ref, shouldAnimate } = useAnimationTrigger({ threshold: 0.5 });

  const developerCode = `const developer = {
  name: "Ghulam Shabbir",
  role: "Full Stack Developer",
  location: "Lahore, Pakistan", 
  experience: "3+ years",
  interests: [
    ".NET Core",
    "Angular",
    "Node.js",
    "Microservices",
    "Micro Frontends",
    "Cloud-Native Solutions",
    "Docker & Kubernetes",
    "AI Agents & Automation",
    "DevOps & CI/CD"
  ],
  bio: \`Passionate full-stack developer with expertise in modern web technologies.
        I love creating scalable applications that solve real-world problems 
        and deliver exceptional user experiences.\`,
  philosophy: "Code is poetry, and every line should tell a story"
};`;

  // expertise: {
  //   backend: [".NET Core", "Node.js", "Microservices"],
  //   frontend: ["Angular", "React", "Next.js", "Micro Frontends"],
  //   devops: ["Docker", "Kubernetes", "Azure DevOps", "Google Cloud", "AWS"],
  //   automation: ["AI Agents", "Process Automation", "CI/CD"]
  // },
  const transformedContent = {
    name: "Ghulam Shabbir",
    role: "Full Stack Developer",
    location: "Lahore, Pakistan",
    experience: "3+ years",
    interests: [
      ".NET Core",
      "Angular",
      "Node.js",
      "Microservices",
      "Micro Frontends",
      "Cloud-Native Solutions",
      "Docker & Kubernetes",
      "AI Agents & Automation",
      "DevOps & CI/CD"
    ],
    bio: `Passionate full-stack developer with expertise in modern web technologies. I love creating scalable applications that solve real-world problems and deliver exceptional user experiences.`,
    philosophy: "Code is poetry, and every line should tell a story"
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
            About Me
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Code/Text Transformation */}
          <motion.div
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            variants={fadeInUp}
            className="relative"
          >
            <div className="relative bg-[var(--color-surface)] rounded-lg overflow-hidden">
              {!isTransformed ? (
                <motion.div
                  variants={codeTransform}
                  animate="code"
                  className="p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[var(--color-text-secondary)] text-sm font-mono">
                      developer.js
                    </span>
                    <button
                      onClick={() => setIsTransformed(true)}
                      className="px-3 py-1 bg-[var(--color-primary)] text-white text-sm rounded hover:bg-[var(--color-secondary)] transition-colors"
                    >
                      Execute
                    </button>
                  </div>
                  <SyntaxHighlighter
                    language="javascript"
                    style={dracula}
                    customStyle={{
                      background: 'transparent',
                      padding: 0,
                      margin: 0,
                      fontSize: '14px',
                    }}
                  >
                    {developerCode}
                  </SyntaxHighlighter>
                </motion.div>
              ) : (
                <motion.div
                  variants={codeTransform}
                  animate="text"
                  className="p-6 space-y-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[var(--color-text-secondary)] text-sm">
                      About Ghulam Shabbir
                    </span>
                    <button
                      onClick={() => setIsTransformed(false)}
                      className="px-3 py-1 bg-[var(--color-accent)] text-black text-sm rounded hover:opacity-80 transition-opacity"
                    >
                      View Code
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                      {transformedContent.name}
                    </h3>
                    
                    <p className="text-[var(--color-primary)] font-semibold">
                      {transformedContent.role}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-secondary)]">
                      <span>📍 {transformedContent.location}</span>
                      <span>💼 {transformedContent.experience}</span>
                    </div>
                    
                    <p className="text-[var(--color-text-primary)] leading-relaxed">
                      {transformedContent.bio}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-[var(--color-accent)]">Interests:</h4>
                      <div className="flex flex-wrap gap-2">
                        {transformedContent.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[var(--color-primary)] bg-opacity-20 text-white rounded-full text-sm"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-[var(--color-surface)]">
                      <p className="text-[var(--color-text-secondary)] italic">
                        {transformedContent.philosophy}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Profile Image and Stats */}
          <motion.div
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            variants={fadeInUp}
            className="space-y-8"
          >
            {/* Profile Image */}
            <div className="relative mx-auto w-64 h-64">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full p-1"
              >
                <div className="w-full h-full bg-[var(--color-background)] rounded-full flex items-center justify-center">
                  <div className="w-56 h-56 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] rounded-full flex items-center justify-center text-6xl font-bold text-[var(--color-background)]">
                    <img
                      src="images/profile-img.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Years Experience', value: '3+' },
                { label: 'Projects Completed', value: '50+' },
                { label: 'Technologies', value: '20+' },
                { label: 'Coffee Cups', value: '∞' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 bg-[var(--color-surface)] rounded-lg"
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

            {/* Quick Links */}
            <div className="flex justify-center space-x-4">
              {[
                { label: 'Resume', href: '/resume.pdf', icon: 'images/resume.png' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ghulam-shabbir-a396bc5', icon: 'images/linkedin.png' },
                { label: 'GitHub', href: 'https://github.com/Muntazir86', icon: 'images/github.png' },
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target='_blank'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-secondary)] transition-colors"
                >
                  <img src={link.icon} alt={link.label} className="w-5 h-5" />
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
