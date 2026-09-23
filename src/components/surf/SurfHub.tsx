"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleContext";

export function SurfHub() {
  const { t } = useLocale();
  const items = [
    { href: "/surf/boards", label: t.nav.boards, text: t.surf.boardsText },
    { href: "/surf/shapers", label: t.nav.shapers, text: t.surf.shapersText },
    { href: "/pide-cita", label: t.nav.book, text: t.surf.bookText },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8 sm:py-24">
      <h1 className="text-6xl font-light uppercase tracking-[0.16em] sm:text-8xl">
        {t.surf.title}
      </h1>
      <div className="mt-14 grid gap-10 sm:grid-cols-3">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="group">
            <p className="text-xl uppercase tracking-[0.16em]">{item.label}</p>
            <p className="mt-2 text-sm text-alaya-muted">{item.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
