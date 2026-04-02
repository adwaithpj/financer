'use client';

import { usePathname } from 'next/navigation';
import { SidebarNav } from '../components/Sidebar';
import { ThemeSync } from '@/components/providers/theme-sync';
import React, { useEffect } from 'react';
import { useCommonStore } from '@/store';
import { List } from '@phosphor-icons/react';
import { Button } from '@cloudflare/kumo';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const isMainPage = pathName === '/';
  const hideSidebar = isMainPage;

  const mobileNavOpen = useCommonStore((s) => s.mobileNavOpen);
  const setMobileNavOpen = useCommonStore((s) => s.setMobileNavOpen);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathName, setMobileNavOpen]);

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  return (
    <>
      <ThemeSync />
      {hideSidebar ? (
        <div className="min-h-screen bg-gray-50 text-black transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-white">
          {children}
        </div>
      ) : (
        <div className="app-layout flex h-screen min-h-0 w-full flex-col bg-gray-50 text-black transition-colors duration-300 lg:flex-row dark:bg-[#0a0a0a] dark:text-white">
          <header className="h-21 fixed left-0 right-0 top-0 z-50 flex shrink-0 items-center gap-3 border-b border-neutral-200 bg-white px-4 lg:hidden dark:border-neutral-800 dark:bg-[#111111]">
            <Button
              type="button"
              variant="ghost"
              shape="square"
              aria-label="Open menu"
              className="shrink-0"
              onClick={() => setMobileNavOpen(true)}
            >
              <List size={26} weight="bold" />
            </Button>
            <span className="text-lg font-black uppercase tracking-widest">
              Financer
            </span>
          </header>

          {mobileNavOpen && (
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileNavOpen(false)}
            />
          )}

          <SidebarNav />

          <main className="flex min-h-0 flex-1 flex-col" id="main-area">
            <div className="mx-auto flex min-h-0 w-full flex-1 flex-col px-4 py-4 sm:px-8 sm:py-4 lg:px-16 lg:pb-2 lg:pt-10">
              {children}
            </div>
          </main>
        </div>
      )}
    </>
  );
}
