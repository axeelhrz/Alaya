import type { Metadata } from "next";
import Link from "next/link";
import { boardCategories, filterBoards } from "../../../../content/boards";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BoardPhoto } from "@/components/surf/BoardPhoto";

export const metadata: Metadata = {
  title: "Boards",
  description: "Catálogo de tablas Alaya: promodels y custom.",
};

const PAGE_SIZE = 16;

type Props = { searchParams: Promise<{ cat?: string; page?: string }> };

export default async function BoardsPage({ searchParams }: Props) {
  const { cat, page: pageParam } = await searchParams;
  const active = cat && cat !== "all" ? cat : "all";
  const current = boardCategories.find((c) => c.slug === active);
  const list = filterBoards(active);
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const page = Math.min(totalPages, Math.max(1, Number(pageParam) || 1));
  const shown = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const hrefFor = (nextPage: number) => {
    const params = new URLSearchParams();
    if (active !== "all") params.set("cat", active);
    if (nextPage > 1) params.set("page", String(nextPage));
    const q = params.toString();
    return q ? `/surf/boards?${q}` : "/surf/boards";
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-8 sm:py-14">
      <h1 className="text-sm font-medium uppercase tracking-[0.2em]">Boards</h1>
      <div className="mt-3">
        <Breadcrumb
          items={[
            { href: "/surf/boards", label: "All Boards" },
            ...(current && current.slug !== "all"
              ? [{ label: current.label }]
              : []),
          ]}
        />
      </div>

      <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[0.7rem] uppercase tracking-[0.16em] text-alaya-muted">
        {boardCategories.map((item) => (
          <Link
            key={item.slug}
            href={item.slug === "all" ? "/surf/boards" : `/surf/boards?cat=${item.slug}`}
            className={
              active === item.slug ? "text-alaya-black" : "hover:text-alaya-black"
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((board) => (
          <Link
            key={board.slug}
            href={`/surf/boards/${board.slug}`}
            className="group text-center"
          >
            <BoardPhoto
              src={board.image}
              alt={board.name}
              className="h-56 transition duration-500 group-hover:scale-[1.03] sm:h-72"
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
          aria-label="Paginación"
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
            <Link href={hrefFor(page + 1)} aria-label="Siguiente">
              →
            </Link>
          ) : null}
        </nav>
      ) : null}
    </div>
  );
}
