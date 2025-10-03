import { useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return storage.get(STORAGE_KEYS.THEME, 'black');
  });

  useEffect(() => {
    storage.set(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  return [theme, setTheme];
};