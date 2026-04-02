import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { KumoRoot } from '@/components/providers/kumo-root';

import './globals.css';
import { AppShell } from '@/layout/AppShell';

const myFont = localFont({
  src: '../../public/fonts/SFPro.otf',
  variable: '--font-my-font',
});

export const metadata: Metadata = {
  title: 'Financer',
  description: 'Financer is a platform for managing your finances',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, intial-class=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body
        className={`${myFont.variable} antialiased`}
        suppressHydrationWarning
      >
        <KumoRoot>
          <AppShell>{children}</AppShell>
        </KumoRoot>
      </body>
    </html>
  );
}
