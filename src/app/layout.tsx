import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';
import { MintBadgeModal } from '@/components/dashboard/mint-badge-modal';

export const metadata: Metadata = {
  title: 'Douguken Dashboard',
  description: 'Decentralized Proof of Work (Skill Badging) Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <Providers>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <SidebarNav />
              <div className="flex flex-1 flex-col">
                <Header />
                <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
              </div>
            </div>
            <MintBadgeModal />
            <Toaster />
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
