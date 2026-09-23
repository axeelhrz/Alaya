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
    <article>
      <div className="lg:flex">
        <div className="relative flex min-h-[70vh] items-end bg-alaya-black text-white lg:min-h-[calc(100svh-3.5rem)] lg:w-[46%]">
          {cover ? (
            <Image
              src={cover}
              alt=""
              fill
              priority
              className="object-cover opacity-80"
              sizes="(max-width: 1024px) 100vw, 46vw"
            />
          ) : null}
          <div className="absolute inset-0 bg-black/35" />
          <h1 className="relative z-10 max-w-md px-6 py-14 text-4xl font-light uppercase leading-[1.05] tracking-[0.16em] sm:px-12 sm:text-5xl">
            {title}
          </h1>
        </div>

        <div className="bg-alaya-white lg:w-[54%]">
          <div className="mx-auto max-w-xl px-5 py-14 sm:px-12 sm:py-20">
            <div className="prose-alaya space-y-5 text-sm leading-relaxed text-alaya-muted [&_a]:text-alaya-black [&_a]:underline [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-normal [&_h2]:uppercase [&_h2]:tracking-[0.12em] [&_h2]:text-alaya-black [&_strong]:text-alaya-black">
              <MDXRemote source={content} />
            </div>
          </div>
        </div>
      </div>

      {related.length ? (
        <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8">
          <p className="page-kicker">Artículos relacionados</p>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {related.map((item) => (
              <Link key={item.slug} href={`/new/${item.slug}`} className="group">
                <div className="relative aspect-square overflow-hidden bg-alaya-surface">
                  {item.cover ? (
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      className="object-cover transition group-hover:scale-105"
                      sizes="240px"
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
    </article>
  );
}
