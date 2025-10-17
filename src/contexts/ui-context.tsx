"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';

type UIState = {
  isMintModalOpen: boolean;
  openMintModal: () => void;
  closeMintModal: () => void;
};

const UIContext = createContext<UIState | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);

  const openMintModal = () => setIsMintModalOpen(true);
  const closeMintModal = () => setIsMintModalOpen(false);

  const value = { isMintModalOpen, openMintModal, closeMintModal };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
