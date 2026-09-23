import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "New",
  description: "Novedades, lanzamientos y próximos proyectos de Alaya Division.",
};

const filters = [
  { href: "/new", label: "All", cat: "" },
  { href: "/new?cat=apparel", label: "Apparel", cat: "apparel" },
  { href: "/new?cat=surf", label: "Surf", cat: "surf" },
  { href: "/new?cat=skate", label: "Skate", cat: "skate" },
  { href: "/new?cat=snow", label: "Snow", cat: "snow" },
];

type Props = { searchParams: Promise<{ cat?: string }> };

export default async function NewPage({ searchParams }: Props) {
  const { cat } = await searchParams;
  const posts = getAllPosts().filter((p) => !cat || p.category === cat);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8 sm:py-24">
      <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="lg:sticky lg:top-24">
          <h1 className="text-7xl font-light uppercase tracking-[0.2em] sm:text-8xl lg:text-[7.5rem]">
            New
          </h1>
          <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.7rem] uppercase tracking-[0.2em]">
            {filters.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={
                  (item.cat ? cat === item.cat : !cat)
                    ? "text-alaya-black"
                    : "text-alaya-muted hover:text-alaya-black"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-20">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="grid items-center gap-10 md:grid-cols-2"
            >
              <div>
                <h2 className="text-2xl font-light uppercase leading-tight tracking-[0.14em] sm:text-3xl">
                  <Link href={`/new/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-alaya-muted">
                  {post.excerpt}
                </p>
              </div>
              <Link
                href={`/new/${post.slug}`}
                className="relative block aspect-[4/5] overflow-hidden bg-alaya-black"
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
