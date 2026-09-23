"use client";

import Image from "next/image";
import Link from "next/link";
import type { Shaper } from "../../../content/shapers";
import { shaperCopy } from "../../../content/catalog-i18n";
import { useLocale } from "@/components/i18n/LocaleContext";

export function ShaperCard({ shaper }: { shaper: Shaper }) {
  const { locale } = useLocale();
  const copy = shaperCopy(shaper, locale);
  return (
    <Link
      href={`/surf/shapers/${shaper.slug}`}
      className="group block overflow-hidden"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-alaya-surface">
        <Image
          src={shaper.image}
          alt={shaper.name}
          fill
          className="img-zoom object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h3 className="font-display text-3xl uppercase tracking-wide">
            {shaper.name}
          </h3>
          <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-white/75">
            {copy.role} · {copy.location}
          </p>
        </div>
      </div>
    </Link>
  );
}
