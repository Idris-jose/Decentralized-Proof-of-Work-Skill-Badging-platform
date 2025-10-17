"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

type WalletState = {
  isConnected: boolean;
  address: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
};

const WalletContext = createContext<WalletState | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = () => {
    // Mock wallet connection
    const mockAddress = "0x1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7q8R9s0T";
    setIsConnected(true);
    setAddress(mockAddress);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
  };

  const value = { isConnected, address, connectWallet, disconnectWallet };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
