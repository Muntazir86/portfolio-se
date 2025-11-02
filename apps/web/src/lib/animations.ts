import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const typewriter: Variants = {
  hidden: {
    width: 0,
  },
  visible: {
    width: 'auto',
    transition: {
      duration: 2,
      ease: 'linear',
    },
  },
};

export const terminalWindow: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
  expanded: {
    scale: 1.2,
    transition: {
      duration: 1.2,
      ease: 'easeInOut',
    },
  },
};

export const matrixRain: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 2,
      ease: 'easeIn',
    },
  },
};

export const codeTransform: Variants = {
  code: {
    fontFamily: 'monospace',
    color: '#50fa7b',
    backgroundColor: '#282a36',
    padding: '1rem',
    borderRadius: '0.5rem',
  },
  text: {
    fontFamily: 'system-ui',
    color: '#f8f8f2',
    backgroundColor: 'transparent',
    padding: '1rem',
    borderRadius: '0',
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

export const skillNode: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
  hover: {
    scale: 1.2,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

export const projectCard: Variants = {
  hidden: {
    opacity: 0,
    rotateY: -90,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
  hover: {
    rotateY: 5,
    scale: 1.05,
    transition: {
      duration: 0.3,
    },
  },
};

export const stackPush: Variants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: index * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export const apiResponse: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const commandPalette: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};
