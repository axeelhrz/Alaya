"use client";

import { SubscribeProvider } from "@/components/subscribe/SubscribeContext";
import { SubscribeModal } from "@/components/subscribe/SubscribeModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SubscribeProvider>
      {children}
      <SubscribeModal />
    </SubscribeProvider>
  );
}
