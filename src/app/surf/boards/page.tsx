import type { Metadata } from "next";
import { BoardsHub } from "@/components/surf/BoardsHub";

export const metadata: Metadata = {
  title: "Boards",
  description: "Alaya board catalogue: promodels and custom.",
};

type Props = { searchParams: Promise<{ cat?: string; page?: string }> };

export default async function BoardsPage({ searchParams }: Props) {
  const { cat, page } = await searchParams;
  return <BoardsHub cat={cat} pageParam={page} />;
}
