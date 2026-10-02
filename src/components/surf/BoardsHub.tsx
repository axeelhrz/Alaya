"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useMemo } from "react";
import { boardCategories } from "../../../content/boards";
import { searchBoards } from "@/lib/boardSearch";
import { useLocale } from "@/components/i18n/LocaleContext";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BoardPhoto } from "@/components/surf/BoardPhoto";
import { CloseIcon, SearchIcon } from "@/components/ui/SearchIcons";

const PAGE_SIZE = 16;

export function BoardsHub({
  cat,
  pageParam,
  initialQuery,
}: {
  cat?: string;
  pageParam?: string;
  initialQuery?: string;
}) {
  const { t } = useLocale();
  const [query, setQuery] = useState(initialQuery ?? "");
  const [searchOpen, setSearchOpen] = useState(Boolean(initialQuery?.trim()));
  const inputRef = useRef<HTMLInputElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const active = cat && cat !== "all" ? cat : "all";
  const current = boardCategories.find((c) => c.slug === active);
  const list = useMemo(
    () => searchBoards(query, active),
    [active, query],
  );
  const searching = query.trim().length > 0;
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const page = searching
    ? 1
    : Math.min(totalPages, Math.max(1, Number(pageParam) || 1));
  const shown = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const hrefFor = (nextPage: number) => {
    const params = new URLSearchParams();
    if (active !== "all") params.set("cat", active);
    if (searching) params.set("q", query.trim());
    if (nextPage > 1) params.set("page", String(nextPage));
    const built = params.toString();
    return built ? `/surf/boards?${built}` : "/surf/boards";
  };

  const openSearch = () => setSearchOpen(true);

  const closeSearch = () => {
    setQuery("");
    setSearchOpen(false);
  };

  useEffect(() => {
    if (initialQuery?.trim()) {
      setQuery(initialQuery);
      setSearchOpen(true);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!searchWrapRef.current?.contains(event.target as Node)) {
        if (!query.trim()) setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [searchOpen, query]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-8 sm:py-14">
      <h1 className="text-sm font-medium uppercase tracking-[0.2em]">
        {t.nav.boards}
      </h1>
      <div className="mt-3">
        <Breadcrumb
          items={[
            { href: "/surf/boards", label: t.boards.all },
            ...(current && current.slug !== "all"
              ? [{ label: current.label }]
              : []),
          ]}
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6">
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-[0.65rem] uppercase tracking-[0.14em] text-alaya-muted sm:gap-x-5 sm:text-[0.7rem] sm:tracking-[0.16em]">
          {boardCategories.map((item) => (
            <Link
              key={item.slug}
              href={
                item.slug === "all"
                  ? "/surf/boards"
                  : `/surf/boards?cat=${item.slug}`
              }
              className={
                active === item.slug
                  ? "text-alaya-black"
                  : "hover:text-alaya-black"
              }
            >
              {item.slug === "all" ? t.boards.all : item.label}
            </Link>
          ))}
        </nav>

        <div
          ref={searchWrapRef}
          className={`boards-search self-end sm:self-auto ${searchOpen ? "is-open w-full sm:w-auto" : ""}`}
        >
          <div className="boards-search__field" aria-hidden={!searchOpen}>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.boards.searchPlaceholder}
              className="input-block is-plain boards-search__input"
              aria-label={t.boards.searchPlaceholder}
              tabIndex={searchOpen ? 0 : -1}
            />
            <button
              type="button"
              className="boards-search__toggle"
              aria-label={t.boards.closeSearch}
              tabIndex={searchOpen ? 0 : -1}
              onClick={closeSearch}
            >
              <CloseIcon />
            </button>
          </div>
          {!searchOpen ? (
            <button
              type="button"
              className="boards-search__toggle"
              aria-label={t.boards.openSearch}
              aria-expanded={false}
              onClick={openSearch}
            >
              <SearchIcon />
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 sm:mt-14 sm:gap-x-8 sm:gap-y-16 sm:grid-cols-3 lg:grid-cols-4">
        {shown.length === 0 ? (
          <p className="col-span-full text-sm text-alaya-muted">
            {t.boards.searchEmpty}
          </p>
        ) : null}
        {shown.map((board) => (
          <Link
            key={board.slug}
            href={`/surf/boards/${board.slug}`}
            className="group min-w-0 text-center"
          >
            <BoardPhoto
              src={board.image}
              alt={board.name}
              className="h-44 transition duration-500 group-hover:scale-[1.03] sm:h-56 md:h-72"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            <p className="mt-5 text-[0.7rem] uppercase tracking-[0.14em]">
              {board.name}
            </p>
            <p className="mt-1 text-[0.65rem] text-alaya-muted">
              {board.shaper} · {board.dimensions}
            </p>
          </Link>
        ))}
      </div>

      {totalPages > 1 ? (
        <nav
          className="mt-16 flex items-center justify-center gap-4 text-sm uppercase tracking-[0.16em]"
          aria-label="Pagination"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={hrefFor(n)}
              className={n === page ? "text-alaya-black" : "text-alaya-muted"}
              aria-current={n === page ? "page" : undefined}
            >
              {n}
            </Link>
          ))}
          {page < totalPages ? (
            <Link href={hrefFor(page + 1)} aria-label="→">
              →
            </Link>
          ) : null}
        </nav>
      ) : null}
    </div>
  );
}
