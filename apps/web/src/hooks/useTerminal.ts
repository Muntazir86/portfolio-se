'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { TERMINAL_COMMANDS, BOOT_SEQUENCE } from '@/lib/constants';

interface TerminalLine {
  id: string;
  text: string;
  type: 'command' | 'output' | 'prompt';
  timestamp: number;
}

export const useTerminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
  const effectRan = useRef(false);

  const addLine = useCallback((text: string, type: TerminalLine['type'] = 'output') => {
    const newLine: TerminalLine = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      type,
      timestamp: Date.now(),
    };
    setLines(prev => [...prev, newLine]);
  }, []);

  const typeText = useCallback(async (text: string, speed: number = 50) => {
    setIsTyping(true);
    setCurrentCommand('');
    
    for (let i = 0; i <= text.length; i++) {
      setCurrentCommand(text.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    
    setIsTyping(false);
  }, []);

  const executeBootSequence = useCallback(async () => {
    for (const step of BOOT_SEQUENCE) {
      addLine(step, 'output');
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    // Add welcome message
    await new Promise(resolve => setTimeout(resolve, 500));
    addLine('Welcome to Ghulam Shabbir\'s Portfolio', 'output');
    addLine('Type "help" for available commands', 'output');
    
    setBootComplete(true);
  }, [addLine]);

  const executeCommand = useCallback(async (command: string) => {
    addLine(`$ ${command}`, 'command');
    
    // Simulate command execution
    await new Promise(resolve => setTimeout(resolve, 300));
    
    switch (command.toLowerCase()) {
      case 'help':
        addLine('Available commands:', 'output');
        addLine('  about    - Show about information', 'output');
        addLine('  skills   - List technical skills', 'output');
        addLine('  projects - Show project portfolio', 'output');
        addLine('  contact  - Display contact information', 'output');
        addLine('  clear    - Clear terminal', 'output');
        break;
      case 'about':
        addLine('Full Stack Developer with 5+ years of experience', 'output');
        addLine('Passionate about creating innovative web solutions', 'output');
        break;
      case 'skills':
        addLine('Frontend: React, TypeScript, Next.js, Three.js', 'output');
        addLine('Backend: Node.js, Python, MongoDB, PostgreSQL', 'output');
        addLine('Cloud: AWS, Docker, Kubernetes', 'output');
        break;
      case 'projects':
        addLine('Loading project portfolio...', 'output');
        addLine('✓ E-Commerce Platform', 'output');
        addLine('✓ Task Management App', 'output');
        addLine('✓ AI Chat Application', 'output');
        break;
      case 'contact':
        addLine('Email: ghulam.shabbir@example.com', 'output');
        addLine('LinkedIn: /in/ghulam-shabbir', 'output');
        addLine('GitHub: /ghulam-shabbir', 'output');
        break;
      case 'clear':
        setLines([]);
        break;
      default:
        addLine(`Command not found: ${command}`, 'output');
        addLine('Type "help" for available commands', 'output');
    }
  }, [addLine]);

  useEffect(() => {
    if(effectRan.current === false) {
      executeBootSequence();
      effectRan.current = true;
    }
  }, []);

  return {
    lines,
    currentCommand,
    isTyping,
    bootComplete,
    addLine,
    typeText,
    executeCommand,
  };
};
