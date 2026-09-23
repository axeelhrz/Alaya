"use client";

import { useEffect } from "react";
import { LocaleProvider } from "@/components/i18n/LocaleContext";
import type { Locale } from "@/lib/i18n";
import { SubscribeProvider } from "@/components/subscribe/SubscribeContext";
import { SubscribeModal } from "@/components/subscribe/SubscribeModal";

function ViewportHeight() {
  useEffect(() => {
    const set = () => {
      const visual = window.visualViewport?.height ?? Number.POSITIVE_INFINITY;
      const client = document.documentElement.clientHeight;
      const inner = window.innerHeight;
      const h = Math.round(Math.min(visual, client, inner));
      document.documentElement.style.setProperty("--hero-h", `${h}px`);
    };
    set();
    const vv = window.visualViewport;
    vv?.addEventListener("resize", set);
    window.addEventListener("resize", set);
    window.addEventListener("orientationchange", set);
    return () => {
      vv?.removeEventListener("resize", set);
      window.removeEventListener("resize", set);
      window.removeEventListener("orientationchange", set);
    };
  }, []);
  return null;
}

export function Providers({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  return (
    <LocaleProvider initialLocale={initialLocale}>
      <SubscribeProvider>
        <ViewportHeight />
        {children}
        <SubscribeModal />
      </SubscribeProvider>
    </LocaleProvider>
  );
}
