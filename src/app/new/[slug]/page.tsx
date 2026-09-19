import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/editorial/ArticleLayout";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((file) => ({
    slug: file.replace(/\.mdx?$/, ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return { title: post.meta.title, description: post.meta.excerpt };
  } catch {
    return { title: "Artículo" };
  }
}

export default async function NewPostPage({ params }: Props) {
  const { slug } = await params;
  const all = getAllPosts();
  if (!all.some((p) => p.slug === slug)) notFound();
  const post = getPostBySlug(slug);
  const related = all.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <ArticleLayout
      title={post.meta.title}
      cover={post.meta.cover}
      content={post.content}
      related={related}
    />
  );
}
