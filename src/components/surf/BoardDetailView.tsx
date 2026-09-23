"use client";

import Link from "next/link";
import type { Board } from "../../../content/boards";
import { boardCitaHref } from "../../../content/boards";
import { boardCopy } from "../../../content/catalog-i18n";
import { useLocale } from "@/components/i18n/LocaleContext";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BoardPhoto } from "@/components/surf/BoardPhoto";
import { BoardGallery } from "@/components/surf/BoardGallery";
import { BoardSpecs } from "@/components/surf/BoardSpecs";

export function BoardDetailView({
  board,
  related,
}: {
  board: Board;
  related: Board[];
}) {
  const { locale, t } = useLocale();
  const copy = boardCopy(board, locale);

  return (
    <div className="lg:flex">
      <div className="relative flex min-h-[70vh] items-center justify-center bg-alaya-white lg:sticky lg:top-14 lg:h-[calc(100svh-3.5rem)] lg:w-[48%]">
        <BoardGallery
          name={board.name}
          image={board.image}
          back={board.back}
          composite={board.composite}
        />
      </div>

      <div className="lg:w-[52%]">
        <div className="mx-auto max-w-lg px-5 py-12 sm:px-10 sm:py-16">
          <Breadcrumb
            items={[
              { href: "/surf/boards", label: t.nav.boards },
              {
                href: `/surf/boards?cat=${board.categorySlug}`,
                label: copy.category,
              },
              { label: board.name },
            ]}
          />
          <h1 className="mt-8 text-3xl font-light uppercase tracking-[0.14em] sm:text-4xl">
            {board.name}
          </h1>
          <p className="mt-2 text-[0.7rem] uppercase tracking-[0.16em] text-alaya-muted">
            {board.shaper} · {copy.dimensions}
            {board.volume ? ` · ${board.volume}` : ""}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-alaya-muted">
            {copy.description}
          </p>
          <BoardSpecs board={board} />
          <Link href={boardCitaHref(board)} className="btn-pill mt-10 inline-flex min-w-40">
            {t.boards.book}
          </Link>

          <section className="mt-16">
            <p className="page-kicker">{t.boards.related}</p>
            <div className="mt-6 grid grid-cols-2 gap-5">
              {related.map((item) => (
                <Link key={item.slug} href={`/surf/boards/${item.slug}`} className="text-center">
                  <div className="relative flex aspect-square items-center justify-center bg-alaya-white">
                    <BoardPhoto
                      src={item.image}
                      alt={item.name}
                      className="h-[78%] w-[78%]"
                      sizes="160px"
                    />
                  </div>
                  <p className="mt-3 text-[0.65rem] uppercase tracking-[0.14em]">
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
