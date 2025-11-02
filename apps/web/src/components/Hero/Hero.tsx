'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatrixRain } from './MatrixRain';
import { BootSequence } from './BootSequence';
import { ASCIILogo } from './ASCIILogo';
import { Terminal } from './Terminal';

export const Hero: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<'boot' | 'ascii' | 'terminal'>('boot');

  const handleBootComplete = () => {
    setCurrentPhase('ascii');
  };

  const handleASCIIComplete = () => {
    setCurrentPhase('terminal');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain opacity={currentPhase === 'terminal' ? 0.1 : 0.3} />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {currentPhase === 'boot' && (
            <motion.div
              key="boot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BootSequence onComplete={handleBootComplete} />
            </motion.div>
          )}

          {currentPhase === 'ascii' && (
            <motion.div
              key="ascii"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ASCIILogo onComplete={handleASCIIComplete} />
            </motion.div>
          )}

          {currentPhase === 'terminal' && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-8"
            >
              {/* Hero Text */}
              <div className="text-center space-y-4 mb-12">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text-primary)] tracking-tight"
                >
                  GHULAM SHABBIR
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl md:text-2xl text-[var(--color-primary)] font-light"
                >
                  Full Stack Developer
                </motion.p>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] rounded-full max-w-md mx-auto"
                />
              </div>

              {/* Interactive Terminal */}
              <Terminal />

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex flex-col items-center space-y-2 text-[var(--color-text-secondary)]"
                >
                  <span className="text-sm font-mono">Scroll to explore</span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
