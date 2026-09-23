"use client";

import Image from "next/image";
import Link from "next/link";
import type { Board } from "../../../content/boards";
import { boardCopy } from "../../../content/catalog-i18n";
import { useLocale } from "@/components/i18n/LocaleContext";

export function BoardCard({ board }: { board: Board }) {
  const { locale } = useLocale();
  const copy = boardCopy(board, locale);
  return (
    <article className="group">
      <Link href="/pide-cita" className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-alaya-surface">
          <Image
            src={board.image}
            alt={board.name}
            fill
            className="img-zoom object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="mt-4 space-y-1">
          <p className="section-label">{copy.category}</p>
          <h3 className="font-display text-2xl uppercase tracking-wide">
            {board.name}
          </h3>
          <p className="text-sm text-alaya-muted">
            {board.shaper} · {copy.dimensions}
          </p>
          <p className="pt-2 text-sm leading-relaxed text-alaya-muted">
            {copy.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
