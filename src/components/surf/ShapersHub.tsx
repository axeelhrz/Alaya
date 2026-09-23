"use client";

import Image from "next/image";
import Link from "next/link";
import { shapers } from "../../../content/shapers";
import { shaperCopy } from "../../../content/catalog-i18n";
import { useLocale } from "@/components/i18n/LocaleContext";

export function ShapersHub() {
  const { locale, t } = useLocale();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-8 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h1 className="text-5xl font-light uppercase tracking-[0.16em] sm:text-7xl">
            {t.nav.shapers}
          </h1>
          <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[0.7rem] uppercase tracking-[0.16em] text-alaya-muted">
            {shapers.map((s) => (
              <Link
                key={s.slug}
                href={`/surf/shapers/${s.slug}`}
                className="hover:text-alaya-black"
              >
                {s.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {shapers.map((shaper) => (
            <Link key={shaper.slug} href={`/surf/shapers/${shaper.slug}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-alaya-surface">
                <Image
                  src={shaper.image}
                  alt={shaper.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <p className="mt-3 text-[0.75rem] uppercase tracking-[0.16em]">
                {shaper.name}
              </p>
              <p className="text-[0.65rem] text-alaya-muted">
                {shaperCopy(shaper, locale).role}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
