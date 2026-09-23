import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { boards, getBoard, getRelatedBoards } from "../../../../../content/boards";
import { BoardDetailView } from "@/components/surf/BoardDetailView";

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
  return <BoardDetailView board={board} related={related} />;
}
