'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface MatrixRainProps {
  opacity?: number;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ opacity = 0.3 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters (code snippets and symbols)
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`'.split('');
    const codeSnippets = [
      'const', 'function', 'return', 'import', 'export', 'class', 'interface',
      'useState', 'useEffect', 'React', 'Node.js', 'TypeScript', 'async', 'await',
      '{}', '[]', '()', '=>', '===', '!==', '&&', '||', '??', '?.', '...', 
    ];
    
    const allChars = [...chars, ...codeSnippets];
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = `rgba(40, 42, 54, 0.05)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Matrix text
      ctx.fillStyle = '#50fa7b';
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = allChars[Math.floor(Math.random() * allChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Add glow effect for some characters
        if (Math.random() > 0.98) {
          ctx.shadowColor = '#50fa7b';
          ctx.shadowBlur = 10;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, y);

        // Reset drop to top when it reaches bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 2, ease: 'easeIn' }}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
    />
  );
};
