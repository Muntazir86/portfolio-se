export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    terminal: {
      background: string;
      text: string;
      cursor: string;
      prompt: string;
    };
    syntax: {
      keyword: string;
      string: string;
      number: string;
      comment: string;
      function: string;
      variable: string;
    };
  };
}

export const dracula: Theme = {
  name: 'Dracula',
  colors: {
    primary: '#bd93f9',
    secondary: '#ff79c6',
    accent: '#50fa7b',
    background: '#282a36',
    surface: '#44475a',
    text: {
      primary: '#f8f8f2',
      secondary: '#6272a4',
      muted: '#44475a',
    },
    terminal: {
      background: '#282a36',
      text: '#f8f8f2',
      cursor: '#50fa7b',
      prompt: '#bd93f9',
    },
    syntax: {
      keyword: '#ff79c6',
      string: '#f1fa8c',
      number: '#bd93f9',
      comment: '#6272a4',
      function: '#50fa7b',
      variable: '#8be9fd',
    },
  },
};

export const monokai: Theme = {
  name: 'Monokai',
  colors: {
    primary: '#f92672',
    secondary: '#ae81ff',
    accent: '#a6e22e',
    background: '#272822',
    surface: '#3e3d32',
    text: {
      primary: '#f8f8f2',
      secondary: '#75715e',
      muted: '#49483e',
    },
    terminal: {
      background: '#272822',
      text: '#f8f8f2',
      cursor: '#a6e22e',
      prompt: '#f92672',
    },
    syntax: {
      keyword: '#f92672',
      string: '#e6db74',
      number: '#ae81ff',
      comment: '#75715e',
      function: '#a6e22e',
      variable: '#66d9ef',
    },
  },
};

export const solarized: Theme = {
  name: 'Solarized Dark',
  colors: {
    primary: '#268bd2',
    secondary: '#d33682',
    accent: '#859900',
    background: '#002b36',
    surface: '#073642',
    text: {
      primary: '#839496',
      secondary: '#586e75',
      muted: '#073642',
    },
    terminal: {
      background: '#002b36',
      text: '#839496',
      cursor: '#859900',
      prompt: '#268bd2',
    },
    syntax: {
      keyword: '#859900',
      string: '#2aa198',
      number: '#d33682',
      comment: '#586e75',
      function: '#268bd2',
      variable: '#b58900',
    },
  },
};

export const githubDark: Theme = {
  name: 'GitHub Dark',
  colors: {
    primary: '#58a6ff',
    secondary: '#f85149',
    accent: '#56d364',
    background: '#0d1117',
    surface: '#161b22',
    text: {
      primary: '#f0f6fc',
      secondary: '#8b949e',
      muted: '#30363d',
    },
    terminal: {
      background: '#0d1117',
      text: '#f0f6fc',
      cursor: '#56d364',
      prompt: '#58a6ff',
    },
    syntax: {
      keyword: '#ff7b72',
      string: '#a5d6ff',
      number: '#79c0ff',
      comment: '#8b949e',
      function: '#d2a8ff',
      variable: '#ffa657',
    },
  },
};

export const vscodeDark: Theme = {
  name: 'VS Code Dark',
  colors: {
    primary: '#007acc',
    secondary: '#c586c0',
    accent: '#4ec9b0',
    background: '#1e1e1e',
    surface: '#252526',
    text: {
      primary: '#cccccc',
      secondary: '#6a9955',
      muted: '#3c3c3c',
    },
    terminal: {
      background: '#1e1e1e',
      text: '#cccccc',
      cursor: '#4ec9b0',
      prompt: '#007acc',
    },
    syntax: {
      keyword: '#569cd6',
      string: '#ce9178',
      number: '#b5cea8',
      comment: '#6a9955',
      function: '#dcdcaa',
      variable: '#9cdcfe',
    },
  },
};

export const themes = {
  dracula,
  monokai,
  solarized,
  githubDark,
  vscodeDark,
};

export type ThemeName = keyof typeof themes;
