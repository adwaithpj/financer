'use client';

import { useCommonStore } from '@/store';
import {
  Crown,
  User,
  Moon,
  Sun,
  ArrowRight,
  ArrowLeft,
} from '@phosphor-icons/react';
import { useThemeStore } from '@/store';

type SidebarFooterProps = {
  /** Full role + theme UI; when false, icon-only strip (desktop collapsed). */
  showExpanded?: boolean;
};

export function SidebarFooter({ showExpanded }: SidebarFooterProps) {
  const collapsed = useCommonStore((state) => state.collapsed);
  const setCollapsed = useCommonStore((state) => state.setCollapsed);
  const expanded = showExpanded ?? !collapsed;

  const role = useCommonStore((state) => state.role);
  const setRole = useCommonStore((state) => state.setRole);
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const setMobileNavOpen = useCommonStore((state) => state.setMobileNavOpen);
  const mobileNavOpen = useCommonStore((state) => state.mobileNavOpen);

  const handleCloseMobile = () => {
    setMobileNavOpen(false);
  };

  return (
    <div className="mt-auto flex shrink-0 flex-col border-t border-neutral-200 bg-white text-black transition-colors duration-300 dark:border-neutral-800 dark:bg-[#111111] dark:text-white">
      {expanded ? (
        <>
          <div className="flex border-b border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setRole('viewer')}
              className={`flex flex-1 items-center justify-center gap-2 border-r border-neutral-200 py-4 text-lg font-black uppercase transition-colors dark:border-neutral-800 ${
                role === 'viewer'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-white text-black hover:bg-gray-100 dark:bg-[#111111] dark:text-white dark:hover:bg-neutral-900'
              }`}
            >
              <User size={24} weight="bold" /> User
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex flex-1 items-center justify-center gap-2 py-4 text-lg font-black uppercase transition-colors ${
                role === 'admin'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-white text-black hover:bg-gray-100 dark:bg-[#111111] dark:text-white dark:hover:bg-neutral-900'
              }`}
            >
              <Crown size={24} weight="bold" /> Admin
            </button>
          </div>

          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={`flex w-full items-center justify-center gap-2 bg-white py-5 text-lg font-black uppercase text-black transition-colors hover:bg-black hover:text-white dark:bg-[#111111] dark:text-white dark:hover:bg-white dark:hover:text-black ${
              !collapsed
                ? 'border-b border-neutral-200 lg:border-none dark:border-neutral-800'
                : ''
            }`}
          >
            {theme === 'light' ? (
              <Moon size={24} weight="bold" />
            ) : (
              <Sun size={24} weight="bold" />
            )}
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>

          <button
            type="button"
            onClick={mobileNavOpen ? handleCloseMobile : () => setCollapsed(!collapsed)}
            className={`flex w-full items-center justify-center gap-2 bg-white py-5 text-lg font-black uppercase text-black transition-colors hover:bg-black hover:text-white dark:bg-[#111111] dark:text-white dark:hover:bg-white dark:hover:text-black ${
              !collapsed
                ? 'border-b border-neutral-200 lg:border-none dark:border-neutral-800'
                : ''
            }`}
          >
            {collapsed ? (
              <ArrowRight size={24} weight="bold" />
            ) : (
              <ArrowLeft size={24} weight="bold" />
            )}
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setRole(role === 'viewer' ? 'admin' : 'viewer')}
            className={`flex items-center justify-center border-b border-neutral-200 py-5 transition-colors dark:border-neutral-800 ${
              role === 'admin'
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-white text-black hover:bg-gray-100 dark:bg-[#111111] dark:text-white dark:hover:bg-neutral-900'
            }`}
            title={`Role: ${role}`}
          >
            {role === 'admin' ? (
              <Crown size={28} weight="bold" />
            ) : (
              <User size={28} weight="bold" />
            )}
          </button>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="flex items-center justify-center border-b border-neutral-200 bg-white py-5 text-black transition-colors hover:bg-black hover:text-white lg:border-none dark:border-neutral-800 dark:bg-[#111111] dark:text-white dark:hover:bg-white dark:hover:text-black"
            title="Toggle Theme"
          >
            {theme === 'light' ? (
              <Moon size={28} weight="bold" />
            ) : (
              <Sun size={28} weight="bold" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="flex justify-center p-2 py-8 transition-colors hover:bg-black hover:text-white max-lg:hidden dark:hover:bg-white dark:hover:text-black"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ArrowRight size={24} weight="bold" />
            ) : (
              <ArrowLeft size={24} weight="bold" />
            )}
          </button>
        </>
      )}
    </div>
  );
}
