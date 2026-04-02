'use client';

import { useCommonStore } from '@/store';
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react';

export function SidebarHeader() {
  const collapsed = useCommonStore((state) => state.collapsed);

  return (
    <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 border-zinc-800 px-6 py-6 pl-6 transition-colors duration-300 dark:border-neutral-800">
      {!collapsed ? (
        <h2 className="pl-2 text-3xl font-black uppercase tracking-widest">
          Financer
        </h2>
      ) : (
        <h1 className="text- pl-4 text-2xl font-bold">F</h1>
      )}
    </div>
  );
}
