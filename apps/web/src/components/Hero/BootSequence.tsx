'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BOOT_SEQUENCE } from '@/lib/constants';

interface BootSequenceProps {
  onComplete?: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentStep < BOOT_SEQUENCE.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setProgress(((currentStep + 1) / BOOT_SEQUENCE.length) * 100);
      }, 800);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      setTimeout(() => {
        onComplete?.();
      }, 1000);
    }
  }, [currentStep, isComplete, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      {/* Boot Messages */}
      <div className="space-y-2 text-center max-w-2xl">
        {BOOT_SEQUENCE.slice(0, currentStep).map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[var(--color-accent)] font-mono text-sm md:text-base"
          >
            <span className="text-[var(--color-text-secondary)]">[{String(index + 1).padStart(2, '0')}]</span> {step}
          </motion.div>
        ))}
        
        {currentStep < BOOT_SEQUENCE.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[var(--color-accent)] font-mono text-sm md:text-base flex items-center justify-center space-x-2"
          >
            <span className="text-[var(--color-text-secondary)]">[{String(currentStep + 1).padStart(2, '0')}]</span>
            <span>{BOOT_SEQUENCE[currentStep]}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-[var(--color-terminal-cursor)]"
            >
              |
            </motion.span>
          </motion.div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md">
        <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-2">
          <span>Loading...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-[var(--color-surface)] rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] h-2 rounded-full"
          />
        </div>
      </div>

      {/* Spinner */}
      {!isComplete && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-[var(--color-surface)] border-t-[var(--color-accent)] rounded-full"
        />
      )}

      {/* Success Message */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[var(--color-accent)] font-mono text-lg flex items-center space-x-2"
        >
          <span>✓</span>
          <span>System initialized successfully!</span>
        </motion.div>
      )}
    </div>
  );
};
