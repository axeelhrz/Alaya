import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
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
    return {
      title: post.meta.title,
      description: post.meta.excerpt,
    };
  } catch {
    return { title: "Artículo" };
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const all = getAllPosts();
  if (!all.some((p) => p.slug === slug)) notFound();

  const post = getPostBySlug(slug);

  return (
    <article>
      {post.meta.cover ? (
        <div className="relative h-[45vh] min-h-[280px] w-full bg-alaya-black">
          <Image
            src={post.meta.cover}
            alt={post.meta.title}
            fill
            priority
            className="object-cover opacity-90"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>
      ) : null}

      <div className="mx-auto max-w-2xl px-4 py-16 md:px-6 md:py-20">
        <p className="section-label">
          {post.meta.date
            ? new Date(post.meta.date).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : ""}
        </p>
        <h1 className="mt-4 font-display text-4xl uppercase tracking-wide md:text-6xl">
          {post.meta.title}
        </h1>
        <div className="prose-alaya mt-10 space-y-4 text-base leading-relaxed text-alaya-muted [&_a]:text-alaya-black [&_a]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:text-alaya-black [&_strong]:text-alaya-black">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </article>
  );
}
