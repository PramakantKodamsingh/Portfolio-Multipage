import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Theme {
  id: string;
  name: string;
  background: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  card: string;
  gradient: string;
  animation: string;
}

export const themes: Theme[] = [
  {
    id: 'blue-grey',
    name: 'Blue & Grey',
    background: 'from-slate-50 via-blue-50 to-gray-100',
    primary: 'from-blue-600 to-gray-700',
    secondary: 'from-gray-700 to-blue-600',
    accent: 'blue-600',
    text: 'gray-800',
    card: 'white/80',
    gradient: 'from-blue-500 to-gray-700',
    animation: 'bounce'
  },
  {
    id: 'purple-pink',
    name: 'Purple & Pink',
    background: 'from-purple-50 via-pink-50 to-indigo-100',
    primary: 'from-purple-600 to-pink-600',
    secondary: 'from-pink-600 to-purple-600',
    accent: 'purple-600',
    text: 'purple-900',
    card: 'white/80',
    gradient: 'from-purple-500 to-pink-500',
    animation: 'pulse'
  },
  {
    id: 'green-teal',
    name: 'Green & Teal',
    background: 'from-green-50 via-teal-50 to-emerald-100',
    primary: 'from-green-600 to-teal-600',
    secondary: 'from-teal-600 to-green-600',
    accent: 'green-600',
    text: 'green-900',
    card: 'white/80',
    gradient: 'from-green-500 to-teal-500',
    animation: 'bounce'
  },
  {
    id: 'orange-red',
    name: 'Orange & Red',
    background: 'from-orange-50 via-red-50 to-rose-100',
    primary: 'from-orange-600 to-red-600',
    secondary: 'from-red-600 to-orange-600',
    accent: 'orange-600',
    text: 'red-900',
    card: 'white/80',
    gradient: 'from-orange-500 to-red-500',
    animation: 'pulse'
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    background: 'from-gray-900 via-slate-900 to-black',
    primary: 'from-cyan-400 to-blue-500',
    secondary: 'from-blue-500 to-cyan-400',
    accent: 'cyan-400',
    text: 'white',
    card: 'gray-800/80',
    gradient: 'from-cyan-400 to-blue-500',
    animation: 'bounce'
  }
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      const theme = themes.find(t => t.id === savedTheme);
      if (theme) {
        setCurrentTheme(theme);
      }
    }
  }, []);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('portfolio-theme', themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};