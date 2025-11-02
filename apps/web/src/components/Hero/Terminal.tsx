'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useTerminal } from '@/hooks/useTerminal';
import { terminalWindow } from '@/lib/animations';

interface TerminalProps {
  onBootComplete?: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onBootComplete }) => {
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const {
    lines,
    currentCommand,
    isTyping,
    bootComplete,
    executeCommand,
  } = useTerminal();

  useEffect(() => {
    if (bootComplete && onBootComplete) {
      onBootComplete();
    }
  }, [bootComplete, onBootComplete]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentCommand]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      executeCommand(input.trim());
      setInput('');
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    // Could implement close functionality
  };

  return (
    <motion.div
      variants={terminalWindow}
      initial="hidden"
      animate="visible"
      className={`
        relative bg-[var(--color-terminal-background)] rounded-lg shadow-2xl border border-[var(--color-surface)]
        ${isMaximized ? 'fixed inset-4 z-50' : 'w-full max-w-4xl mx-auto'}
        ${isMinimized ? 'h-12' : 'h-96 md:h-[500px]'}
        transition-all duration-300 ease-in-out
      `}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-surface)] rounded-t-lg border-b border-[var(--color-text-muted)]">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <button
              onClick={handleClose}
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              aria-label="Close terminal"
            />
            <button
              onClick={handleMinimize}
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
              aria-label="Minimize terminal"
            />
            <button
              onClick={handleMaximize}
              className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
              aria-label="Maximize terminal"
            />
          </div>
          <span className="text-sm text-[var(--color-text-secondary)] ml-4 font-mono">
            portfolio@terminal:~$
          </span>
        </div>
        <div className="text-sm text-[var(--color-text-secondary)]">
          Terminal
        </div>
      </div>

      {/* Terminal Content */}
      {!isMinimized && (
        <div
          ref={terminalRef}
          className="p-4 h-full overflow-y-auto font-mono text-sm leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal Lines */}
          <div className="space-y-1">
            {lines.map((line) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`
                  ${line.type === 'command' ? 'text-[var(--color-terminal-prompt)]' : ''}
                  ${line.type === 'output' ? 'text-[var(--color-terminal-text)]' : ''}
                  ${line.type === 'prompt' ? 'text-[var(--color-accent)]' : ''}
                `}
              >
                {line.text}
              </motion.div>
            ))}
            
            {/* Current typing command */}
            {isTyping && currentCommand && (
              <div className="text-[var(--color-terminal-text)]">
                $ {currentCommand}
                <span className="cursor-blink">|</span>
              </div>
            )}
          </div>

          {/* Input Line */}
          {bootComplete && !isTyping && (
            <form onSubmit={handleSubmit} className="flex items-center mt-2">
              <span className="text-[var(--color-terminal-prompt)] mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-[var(--color-terminal-text)] outline-none"
                placeholder="Type a command..."
                autoFocus
              />
              {/* <span className="cursor-blink text-[var(--color-terminal-cursor)]">|</span> */}
            </form>
          )}
        </div>
      )}
    </motion.div>
  );
};
