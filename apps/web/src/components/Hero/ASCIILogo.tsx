'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ASCIILogoProps {
  onComplete?: () => void;
}

export const ASCIILogo: React.FC<ASCIILogoProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const asciiSteps = [
    '',
    `
 ██████╗ ██╗  ██╗██╗   ██╗██╗      █████╗ ███╗   ███╗
██╔════╝ ██║  ██║██║   ██║██║     ██╔══██╗████╗ ████║
██║  ███╗███████║██║   ██║██║     ███████║██╔████╔██║
██║   ██║██╔══██║██║   ██║██║     ██╔══██║██║╚██╔╝██║
╚██████╔╝██║  ██║╚██████╔╝███████╗██║  ██║██║ ╚═╝ ██║
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝
    `,
    `
 ██████╗ ██╗  ██╗██╗   ██╗██╗      █████╗ ███╗   ███╗
██╔════╝ ██║  ██║██║   ██║██║     ██╔══██╗████╗ ████║
██║  ███╗███████║██║   ██║██║     ███████║██╔████╔██║
██║   ██║██╔══██║██║   ██║██║     ██╔══██║██║╚██╔╝██║
╚██████╔╝██║  ██║╚██████╔╝███████╗██║  ██║██║ ╚═╝ ██║
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝

███████╗██╗  ██╗ █████╗ ██████╗ ██████╗ ██╗██████╗ 
██╔════╝██║  ██║██╔══██╗██╔══██╗██╔══██╗██║██╔══██╗
███████╗███████║███████║██████╔╝██████╔╝██║██████╔╝
╚════██║██╔══██║██╔══██║██╔══██╗██╔══██╗██║██╔══██╗
███████║██║  ██║██║  ██║██████╔╝██████╔╝██║██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═════╝ ╚═╝╚═╝  ╚═╝
    `
  ];

  const modernText = "GHULAM SHABBIR";
  const subtitle = "Full Stack Developer";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < asciiSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else if (onComplete) {
        setTimeout(onComplete, 1000);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentStep, asciiSteps.length, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      {/* ASCII Art */}
      <motion.pre
        key={currentStep}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-[var(--color-accent)] font-mono text-xs sm:text-sm md:text-base lg:text-lg leading-tight mb-8"
        style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
      >
        {asciiSteps[currentStep]}
      </motion.pre>

      {/* Modern Typography Transformation */}
      {currentStep === asciiSteps.length - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="space-y-4"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text-primary)] tracking-tight"
          >
            {modernText}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-xl md:text-2xl text-[var(--color-primary)] font-light"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 2, duration: 1 }}
            className="h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] rounded-full max-w-md mx-auto"
          />
        </motion.div>
      )}
    </div>
  );
};
