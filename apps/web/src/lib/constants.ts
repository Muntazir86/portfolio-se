export const SECTIONS = {
  HERO: 'hero',
  ABOUT: 'about',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  EXPERIENCE: 'experience',
  CONTACT: 'contact',
} as const;

export const THEMES = {
  DRACULA: 'dracula',
  MONOKAI: 'monokai',
  SOLARIZED: 'solarized',
  GITHUB_DARK: 'githubDark',
  VSCODE_DARK: 'vscodeDark',
} as const;

export const ANIMATION_DURATION = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 1.2,
  VERY_SLOW: 2.0,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

export const TERMINAL_COMMANDS = [
  'npm install developer-skills',
  'git clone https://github.com/portfolio.git',
  'cd portfolio && npm start',
  'echo "Welcome to my portfolio!"',
  'ls -la skills/',
  'cat about.md',
  'git log --oneline',
] as const;

export const BOOT_SEQUENCE = [
  'Initializing portfolio system...',
  'Loading developer profile...',
  'Connecting to GitHub API...',
  'Fetching project data...',
  'Rendering 3D visualizations...',
  'System ready!',
] as const;

export const SKILL_CATEGORIES = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  TOOLS: 'tools',
  CLOUD: 'cloud',
} as const;

export const SKILL_LEVELS = {
  EXPERT: 'expert',
  PROFICIENT: 'proficient',
  LEARNING: 'learning',
} as const;
