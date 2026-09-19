import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "New",
  description: "Novedades, lanzamientos y próximos proyectos de Alaya Division.",
};

const filters = [
  { href: "/new", label: "All" },
  { href: "/new?cat=apparel", label: "Apparel" },
  { href: "/new?cat=surf", label: "Surf" },
  { href: "/new?cat=skate", label: "Skate" },
  { href: "/new?cat=snow", label: "Snow" },
];

type Props = { searchParams: Promise<{ cat?: string }> };

export default async function NewPage({ searchParams }: Props) {
  const { cat } = await searchParams;
  const posts = getAllPosts().filter((p) => !cat || p.category === cat);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-8 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h1 className="text-6xl font-light uppercase tracking-[0.16em] sm:text-8xl">
            New
          </h1>
          <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[0.7rem] uppercase tracking-[0.18em]">
            {filters.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={
                  (cat || "all") ===
                  (item.href.includes("cat=") ? item.href.split("cat=")[1] : "all")
                    ? "text-alaya-black"
                    : "text-alaya-muted hover:text-alaya-black"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-14">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="grid items-center gap-8 md:grid-cols-2"
            >
              <div>
                <p className="page-kicker">{post.category}</p>
                <h2 className="mt-3 text-2xl font-light uppercase tracking-[0.12em] sm:text-3xl">
                  <Link href={`/new/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-alaya-muted">
                  {post.excerpt}
                </p>
              </div>
              <Link
                href={`/new/${post.slug}`}
                className="relative block aspect-[4/5] overflow-hidden bg-alaya-surface"
              >
                {post.cover ? (
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                ) : null}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
