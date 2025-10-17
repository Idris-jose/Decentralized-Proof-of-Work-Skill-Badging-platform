"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import { ConnectWallet } from '@/components/connect-wallet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SidebarNav } from './sidebar-nav';

const pathToTitle: { [key: string]: string } = {
  '/': 'Dashboard',
  '/my-badges': 'My Badges',
  '/verify': 'Verify Badge',
  '/settings': 'Settings',
};

export function Header() {
  const pathname = usePathname();
  const title = pathToTitle[pathname] || 'Douguken';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <SidebarNav />
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
         <h1 className="text-xl font-semibold hidden md:block">{title}</h1>
        <div className="ml-auto">
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
}
