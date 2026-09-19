"use client";

import { createContext, useContext, useState } from "react";

type SubscribeContextValue = {
  open: (source?: string) => void;
  close: () => void;
  isOpen: boolean;
  source: string;
};

const SubscribeContext = createContext<SubscribeContextValue | null>(null);

export function SubscribeProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("general");

  return (
    <SubscribeContext.Provider
      value={{
        isOpen,
        source,
        open: (next = "general") => {
          setSource(next);
          setIsOpen(true);
        },
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </SubscribeContext.Provider>
  );
}

export function useSubscribe() {
  const ctx = useContext(SubscribeContext);
  if (!ctx) {
    throw new Error("useSubscribe must be used within SubscribeProvider");
  }
  return ctx;
}
