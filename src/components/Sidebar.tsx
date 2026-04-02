'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { useCommonStore } from '@/store';

import { SidebarHeader, SidebarMain, SidebarFooter } from './sidebarComponents';
import { useIsMobile } from '@/hooks/useIsMobile';

interface SidebarNavProps {
  activeSection?: string;
  onLinkClick?: () => void;
}

export function SidebarNav({
  activeSection = 'home',
  onLinkClick,
}: SidebarNavProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const collapsed = useCommonStore((state) => state.collapsed);
  const mobileNavOpen = useCommonStore((state) => state.mobileNavOpen);
  const setMobileNavOpen = useCommonStore((state) => state.setMobileNavOpen);

  const currentSection =
    pathname === '/home'
      ? 'home'
      : pathname === '/transactions'
        ? 'transactions'
        : pathname === '/insights'
          ? 'insights'
          : activeSection;

  const closeMobile = () => {
    setMobileNavOpen(false);
    onLinkClick?.();
  };

  return (
    <aside
      className={`flex h-screen min-h-0 flex-shrink-0 flex-col overflow-hidden border-r border-neutral-200 bg-white text-black transition-transform duration-300 ease-out max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-50 max-lg:shadow-xl lg:static lg:z-auto lg:translate-x-0 lg:shadow-none dark:border-neutral-800 dark:bg-[#111111] dark:text-white ${
        collapsed ? 'w-80 lg:w-24' : 'w-80'
      } ${mobileNavOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}`}
    >
      <SidebarHeader />

      <SidebarMain
        currentSection={currentSection}
        onLinkClick={isMobile ? closeMobile : onLinkClick}
        showLabels={!collapsed || isMobile}
      />

      <SidebarFooter showExpanded={!collapsed || isMobile} />
    </aside>
  );
}
