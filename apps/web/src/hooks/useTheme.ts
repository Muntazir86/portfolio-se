'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { themes, type ThemeName, type Theme } from '@/styles/themes';

interface ThemeStore {
  currentTheme: ThemeName;
  theme: Theme;
  setTheme: (themeName: ThemeName) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      currentTheme: 'githubDark',
      theme: themes.githubDark,
      setTheme: (themeName: ThemeName) => {
        const newTheme = themes[themeName];
        set({ currentTheme: themeName, theme: newTheme });
        
        // Update CSS variables
        if (typeof window !== 'undefined') {
          const root = document.documentElement;
          Object.entries(newTheme.colors).forEach(([key, value]) => {
            if (typeof value === 'string') {
              root.style.setProperty(`--color-${key}`, value);
            } else if (typeof value === 'object') {
              Object.entries(value).forEach(([subKey, subValue]) => {
                root.style.setProperty(`--color-${key}-${subKey}`, subValue);
              });
            }
          });
        }
      },
      toggleTheme: () => {
        const { currentTheme } = get();
        const themeNames = Object.keys(themes) as ThemeName[];
        const currentIndex = themeNames.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themeNames.length;
        const nextTheme = themeNames[nextIndex];
        get().setTheme(nextTheme);
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

export const useTheme = () => {
  const { currentTheme, theme, setTheme, toggleTheme } = useThemeStore();
  
  return {
    currentTheme,
    theme,
    setTheme,
    toggleTheme,
    themes: Object.keys(themes) as ThemeName[],
  };
};
