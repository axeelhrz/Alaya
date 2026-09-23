"use client";

import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { useLocale } from "@/components/i18n/LocaleContext";

export function NewHub({
  posts,
  cat,
}: {
  posts: PostMeta[];
  cat?: string;
}) {
  const { locale, t } = useLocale();
  const filters = [
    { href: "/new", label: t.news.all, cat: "" },
    { href: "/new?cat=apparel", label: t.news.apparel, cat: "apparel" },
    { href: "/new?cat=surf", label: t.news.surf, cat: "surf" },
    { href: "/new?cat=skate", label: t.news.skate, cat: "skate" },
    { href: "/new?cat=snow", label: t.news.snow, cat: "snow" },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8 sm:py-24">
      <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="lg:sticky lg:top-24">
          <h1 className="text-7xl font-light uppercase tracking-[0.2em] sm:text-8xl lg:text-[7.5rem]">
            {t.news.title}
          </h1>
          <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.7rem] uppercase tracking-[0.2em]">
            {filters.map((item) => (
              <Link
                key={item.href}
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
          {posts.map((post) => {
            const title = locale === "en" ? post.titleEn || post.title : post.title;
            const excerpt =
              locale === "en" ? post.excerptEn || post.excerpt : post.excerpt;
            return (
              <article
                key={post.slug}
                className="grid items-center gap-10 md:grid-cols-2"
              >
                <div>
                  <h2 className="text-2xl font-light uppercase leading-tight tracking-[0.14em] sm:text-3xl">
                    <Link href={`/new/${post.slug}`}>{title}</Link>
                  </h2>
                  <p className="mt-5 max-w-sm text-sm leading-relaxed text-alaya-muted">
                    {excerpt}
                  </p>
                </div>
                <Link
                  href={`/new/${post.slug}`}
                  className="relative block aspect-[4/5] overflow-hidden bg-alaya-black"
                >
                  {post.cover ? (
                    <Image
                      src={post.cover}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  ) : null}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
