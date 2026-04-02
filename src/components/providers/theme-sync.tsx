'use client';

import { useLayoutEffect } from 'react';
import { useThemeStore } from '@/store';

/** Applies persisted theme to the document root for Kumo `data-mode` + Tailwind `dark:` (class). */
export function ThemeSync() {
  const theme = useThemeStore((s) => s.theme);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-mode', theme);
    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return null;
}
