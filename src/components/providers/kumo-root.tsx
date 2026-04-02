'use client';

import { TooltipProvider } from '@cloudflare/kumo';
// import { ThemeSync } from "@/components/providers/theme-sync";

export function KumoRoot({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      {/* <ThemeSync /> */}
      {children}
    </TooltipProvider>
  );
}
