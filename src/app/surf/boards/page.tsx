import type { Metadata } from "next";
import Link from "next/link";
import { boardCategories, boards } from "../../../../content/boards";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BoardSilhouette } from "@/components/surf/BoardSilhouette";

export const metadata: Metadata = {
  title: "Boards",
  description: "Catálogo de tablas Alaya: promodels y custom.",
};

type Props = { searchParams: Promise<{ cat?: string }> };

export default async function BoardsPage({ searchParams }: Props) {
  const { cat } = await searchParams;
  const active = cat && cat !== "all" ? cat : "all";
  const current = boardCategories.find((c) => c.slug === active);
  const list =
    active === "all" ? boards : boards.filter((b) => b.categorySlug === active);

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

      <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((board) => (
          <Link
            key={board.slug}
            href={`/surf/boards/${board.slug}`}
            className="group text-center"
          >
            <BoardSilhouette className="mx-auto h-40 w-auto text-alaya-black/75 transition group-hover:scale-[1.03] sm:h-48" />
            <p className="mt-4 text-[0.7rem] uppercase tracking-[0.14em]">
              {board.name}
            </p>
            <p className="mt-1 text-[0.65rem] text-alaya-muted">
              {board.shaper} · {board.dimensions}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
