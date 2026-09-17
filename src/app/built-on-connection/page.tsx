import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Built on Connection",
  description:
    "Espacio editorial Alaya: marca, surf, skate, shapers, cultura y comunidad.",
};

export default function BuiltOnConnectionPage() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="border-b border-alaya-border bg-alaya-black px-4 py-20 text-white md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            light
            label="Editorial"
            title="Built on"
            titleDisplay="Connection"
            description="Contenidos sobre marca, surf, skate, shapers, cultura, procesos y comunidad."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/built-on-connection/${post.slug}`}
              className="group block"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-alaya-surface">
                {post.cover ? (
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : null}
              </div>
              <p className="section-label mt-5">
                {post.date
                  ? new Date(post.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </p>
              <h2 className="mt-2 font-display text-3xl uppercase tracking-wide md:text-4xl">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-alaya-muted">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
