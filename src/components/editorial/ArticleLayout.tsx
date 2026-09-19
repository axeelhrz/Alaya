import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { PostMeta } from "@/lib/posts";

export function ArticleLayout({
  title,
  cover,
  content,
  related,
}: {
  title: string;
  cover?: string;
  content: string;
  related: PostMeta[];
}) {
  return (
    <article className="lg:flex">
      <div className="relative -mt-14 h-[100svh] bg-alaya-surface sm:-mt-16 lg:mt-0 lg:sticky lg:top-14 lg:h-[calc(100svh-3.5rem)] lg:w-[46%] lg:min-h-0">
        {cover ? (
          <Image
            src={cover}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 46vw"
          />
        ) : null}
      </div>

      <div className="lg:w-[54%] lg:overflow-y-auto">
        <div className="mx-auto max-w-xl px-5 py-12 sm:px-10 sm:py-16">
          <h1 className="text-3xl font-light uppercase leading-tight tracking-[0.12em] sm:text-4xl">
            {title}
          </h1>
          <div className="prose-alaya mt-8 space-y-4 text-sm leading-relaxed text-alaya-muted [&_a]:text-alaya-black [&_a]:underline [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-normal [&_h2]:uppercase [&_h2]:tracking-[0.12em] [&_h2]:text-alaya-black [&_strong]:text-alaya-black">
            <MDXRemote source={content} />
          </div>

          {related.length ? (
            <section className="mt-16">
              <p className="page-kicker">Artículos relacionados</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {related.map((item) => (
                  <Link key={item.slug} href={`/new/${item.slug}`} className="group">
                    <div className="relative aspect-square overflow-hidden bg-alaya-surface">
                      {item.cover ? (
                        <Image
                          src={item.cover}
                          alt={item.title}
                          fill
                          className="object-cover transition group-hover:scale-105"
                          sizes="200px"
                        />
                      ) : null}
                    </div>
                    <p className="mt-3 text-[0.7rem] uppercase tracking-[0.12em]">
                      {item.title}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
