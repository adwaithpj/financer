'use client';

import { useCommonStore } from '@/store';
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react';

export function SidebarHeader() {
  const collapsed = useCommonStore((state) => state.collapsed);
  const setCollapsed = useCommonStore((state) => state.setCollapsed);
  const setMobileNavOpen = useCommonStore((state) => state.setMobileNavOpen);

  return (
    <div className="flex items-center justify-between border-b border-neutral-200 border-zinc-800 px-6 py-6 pl-6 transition-colors duration-300 dark:border-neutral-800">
      {!collapsed && (
        <h2 className="pl-2 text-3xl font-black uppercase tracking-widest">
          Financer
        </h2>
      )}
      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => setMobileNavOpen(false)}
          className="border border-neutral-200 p-2 transition-colors hover:bg-black hover:text-white lg:hidden dark:border-neutral-800 dark:hover:bg-white dark:hover:text-black"
          aria-label="Close menu"
        >
          <X size={24} weight="bold" />
        </button>
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={`hidden border border-neutral-200 p-2 transition-colors hover:bg-black hover:text-white lg:flex dark:border-neutral-800 dark:hover:bg-white dark:hover:text-black ${
            collapsed ? 'mx-auto mr-6' : ''
          }`}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ArrowRight size={24} weight="bold" />
          ) : (
            <ArrowLeft size={24} weight="bold" />
          )}
        </button>
      </div>
    </div>
  );
}
