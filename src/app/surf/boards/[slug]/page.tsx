import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { boards, getBoard, getRelatedBoards } from "../../../../../content/boards";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BoardSilhouette } from "@/components/surf/BoardSilhouette";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return boards.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const board = getBoard(slug);
  if (!board) return { title: "Board" };
  return { title: board.name, description: board.description };
}

export default async function BoardPage({ params }: Props) {
  const { slug } = await params;
  const board = getBoard(slug);
  if (!board) notFound();
  const related = getRelatedBoards(slug);

  return (
    <div className="lg:flex">
      <div className="flex min-h-[42vh] items-center justify-center bg-[#f3f3f3] lg:sticky lg:top-14 lg:h-[calc(100svh-3.5rem)] lg:w-[48%]">
        <BoardSilhouette className="h-[55vh] w-auto text-alaya-black/70" />
      </div>

      <div className="lg:w-[52%]">
        <div className="mx-auto max-w-lg px-5 py-12 sm:px-10 sm:py-16">
          <Breadcrumb
            items={[
              { href: "/surf/boards", label: "Boards" },
              { href: `/surf/boards?cat=${board.categorySlug}`, label: board.category },
              { label: board.name },
            ]}
          />
          <h1 className="mt-8 text-3xl font-light uppercase tracking-[0.14em] sm:text-4xl">
            {board.name}
          </h1>
          <p className="mt-2 text-[0.7rem] uppercase tracking-[0.16em] text-alaya-muted">
            {board.shaper} · {board.dimensions}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-alaya-muted">
            {board.description}
          </p>
          <Link
            href={
              board.shaper === "Alaya"
                ? "/pide-cita?choice=alaya"
                : `/pide-cita?shaper=${
                    board.shaper === "Mark Phipps"
                      ? "mark-phipps"
                      : board.shaper.toLowerCase()
                  }`
            }
            className="btn-pill mt-8 inline-flex"
          >
            Pide cita
          </Link>

          <section className="mt-16">
            <p className="page-kicker">Artículos relacionados</p>
            <div className="mt-6 grid grid-cols-2 gap-5">
              {related.map((item) => (
                <Link key={item.slug} href={`/surf/boards/${item.slug}`} className="text-center">
                  <div className="flex aspect-square items-center justify-center bg-[#f3f3f3]">
                    <BoardSilhouette className="h-24 w-auto text-alaya-black/70" />
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
