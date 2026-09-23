import type { Metadata } from "next";
import { NewHub } from "@/components/editorial/NewHub";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "New",
  description: "News, drops and upcoming projects from Alaya Division.",
};

type Props = { searchParams: Promise<{ cat?: string }> };

export default async function NewPage({ searchParams }: Props) {
  const { cat } = await searchParams;
  const posts = getAllPosts().filter((p) => !cat || p.category === cat);
  return <NewHub posts={posts} cat={cat} />;
}
