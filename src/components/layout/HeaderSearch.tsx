"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleContext";
import { CloseIcon, SearchIcon } from "@/components/ui/SearchIcons";
import { searchBoards } from "@/lib/boardSearch";

const RESULT_LIMIT = 6;

type Props = {
  onOpenChange?: (open: boolean) => void;
};

export function HeaderSearch({ onOpenChange }: Props) {
  const { t } = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return searchBoards(q).slice(0, RESULT_LIMIT);
  }, [query]);

  const setSearchOpen = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
    if (!next) setQuery("");
  };

  const close = () => setSearchOpen(false);

  const goToAll = () => {
    const q = query.trim();
    close();
    router.push(q ? `/surf/boards?q=${encodeURIComponent(q)}` : "/surf/boards");
  };

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="header-link inline-flex min-h-11 shrink-0 items-center justify-center text-white/70 transition hover:text-white"
        aria-label={t.boards.openSearch}
        aria-expanded={open}
        onClick={() => setSearchOpen(true)}
      >
        <SearchIcon />
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="header-search__backdrop fixed inset-0 z-[58] bg-black/40"
            aria-label={t.boards.closeSearch}
            onClick={close}
          />
          <div
            ref={panelRef}
            className="header-search__panel fixed inset-x-0 top-14 z-[59] max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-white/10 bg-alaya-black text-white sm:top-16 sm:max-h-[calc(100dvh-4rem)]"
            role="dialog"
            aria-modal="true"
            aria-label={t.boards.searchPlaceholder}
          >
            <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-4 sm:px-8">
              <SearchIcon className="shrink-0 text-white/50" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    goToAll();
                  }
                }}
                placeholder={t.boards.searchPlaceholder}
                className="header-search__input min-w-0 flex-1"
                aria-label={t.boards.searchPlaceholder}
                autoComplete="off"
              />
              <button
                type="button"
                className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center text-white/70 transition hover:text-white"
                aria-label={t.boards.closeSearch}
                onClick={close}
              >
                <CloseIcon />
              </button>
            </div>

            {query.trim() ? (
              <div className="mx-auto max-w-[1400px] border-t border-white/10 px-4 pb-6 sm:px-8">
                {results.length > 0 ? (
                  <ul className="divide-y divide-white/10">
                    {results.map((board) => (
                      <li key={board.slug}>
                        <Link
                          href={`/surf/boards/${board.slug}`}
                          className="flex items-baseline justify-between gap-4 py-3 text-[0.7rem] uppercase tracking-[0.14em] transition hover:text-white/70"
                          onClick={close}
                        >
                          <span>{board.name}</span>
                          <span className="shrink-0 text-[0.62rem] tracking-[0.12em] text-white/45">
                            {board.shaper}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="py-4 text-sm text-white/50">
                    {t.boards.searchEmpty}
                  </p>
                )}
                {results.length > 0 ? (
                  <button
                    type="button"
                    className="mt-2 text-[0.65rem] uppercase tracking-[0.16em] text-white/60 transition hover:text-white"
                    onClick={goToAll}
                  >
                    {t.boards.searchViewAll} →
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
}
