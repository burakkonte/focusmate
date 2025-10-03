import { Moon, Sun, Heart } from 'lucide-react';

export const THEMES = {
  black: {
    name: 'Dark',
    icon: Moon,
    bg: '#0a0a0a',
    surface: '#1a1a1a',
    surfaceHover: '#252525',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    accent: '#6366f1',
    accentHover: '#4f46e5',
    border: '#333333',
    success: '#10b981',
    danger: '#ef4444'
  },
  white: {
    name: 'Light',
    icon: Sun,
    bg: '#ffffff',
    surface: '#f8f9fa',
    surfaceHover: '#e9ecef',
    text: '#1a1a1a',
    textSecondary: '#6c757d',
    accent: '#6366f1',
    accentHover: '#4f46e5',
    border: '#dee2e6',
    success: '#10b981',
    danger: '#ef4444'
  },
  pink: {
    name: 'Soft Pink',
    icon: Heart,
    bg: '#fff5f7',
    surface: '#ffe4e9',
    surfaceHover: '#ffd1da',
    text: '#2d1b1f',
    textSecondary: '#8b6b73',
    accent: '#ec4899',
    accentHover: '#db2777',
    border: '#ffc0cb',
    success: '#10b981',
    danger: '#ef4444'
  }
};

export const TIMER_MODES = {
  WORK: { duration: 25 * 60, label: 'Focus Time' },
  SHORT_BREAK: { duration: 5 * 60, label: 'Short Break' },
  LONG_BREAK: { duration: 15 * 60, label: 'Long Break' }
};