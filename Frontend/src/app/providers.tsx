"use client";

import { WalletProvider } from '@/contexts/wallet-context';
import { UIProvider } from '@/contexts/ui-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
        <WalletProvider>
            {children}
        </WalletProvider>
    </UIProvider>
  );
}
