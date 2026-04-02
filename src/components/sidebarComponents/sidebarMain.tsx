'use client';

import { House, MoneyWavy, Lightbulb } from '@phosphor-icons/react';
import Link from 'next/link';
import React from 'react';

interface NavLink {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_LINKS: NavLink[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/home',
    icon: <House size={24} weight="bold" />,
  },
  {
    id: 'transactions',
    label: 'Transactions',
    href: '/transactions',
    icon: <MoneyWavy size={24} weight="bold" />,
  },
  {
    id: 'insights',
    label: 'Insights',
    href: '/insights',
    icon: <Lightbulb size={24} weight="bold" />,
  },
];

interface SidebarMainProps {
  currentSection: string;
  onLinkClick?: () => void;
  /** When false (desktop collapsed), hide nav labels. */
  showLabels?: boolean;
}

export function SidebarMain({
  currentSection,
  onLinkClick,
  showLabels = true,
}: SidebarMainProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith('#')) return;
    onLinkClick?.();
  }

  return (
    <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
      {NAV_LINKS.map((link) => {
        const isActive = currentSection === link.id;
        return (
          <Link
            key={link.id}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className={`flex items-center space-x-4 px-4 py-6 pl-8 text-lg font-normal transition-colors ${
              isActive
                ? 'bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white'
                : 'text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900'
            }`}
          >
            <span className="flex-shrink-0">{link.icon}</span>
            {showLabels && <span>{link.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
