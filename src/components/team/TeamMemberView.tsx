"use client";

import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "../../../content/team";
import { team, teamCopy } from "../../../content/team";
import { useLocale } from "@/components/i18n/LocaleContext";

export function TeamMemberView({ member }: { member: TeamMember }) {
  const { locale, t } = useLocale();
  const copy = teamCopy(member, locale);
  const others = team.filter((m) => m.slug !== member.slug);

  return (
    <article className="lg:flex">
      <div className="hero-full relative -mt-14 bg-alaya-black sm:-mt-16 lg:mt-0 lg:h-[calc(100svh-3.5rem)] lg:min-h-0 lg:sticky lg:top-14 lg:w-[46%]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          priority
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 46vw"
        />
      </div>
      <div className="lg:w-[54%]">
        <div className="mx-auto max-w-xl px-5 py-12 sm:px-10 sm:py-16">
          <p className="page-kicker">
            {t.team.title} · {copy.role} · {copy.location}
          </p>
          <h1 className="mt-4 text-4xl font-light uppercase tracking-[0.14em] sm:text-5xl">
            {member.name}
          </h1>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-alaya-muted">
            {copy.body.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>

          <section className="mt-16">
            <p className="page-kicker">{t.team.title}</p>
            <div className="mt-5 flex flex-wrap gap-4">
              {others.map((item) => (
                <Link
                  key={item.slug}
                  href={`/team/${item.slug}`}
                  className="text-[0.7rem] uppercase tracking-[0.14em] underline-offset-4 hover:underline"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
