"use client";

import Image from "next/image";
import Link from "next/link";
import { team, teamCopy } from "../../../content/team";
import { useLocale } from "@/components/i18n/LocaleContext";

export function TeamListView() {
  const { locale, t } = useLocale();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-8 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h1 className="text-5xl font-light uppercase tracking-[0.16em] sm:text-7xl">
            {t.team.title}
          </h1>
          <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[0.7rem] uppercase tracking-[0.16em] text-alaya-muted">
            {team.map((member) => (
              <Link
                key={member.slug}
                href={`/team/${member.slug}`}
                className="hover:text-alaya-black"
              >
                {member.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {team.map((member) => {
            const copy = teamCopy(member, locale);
            return (
              <Link
                key={member.slug}
                href={`/team/${member.slug}`}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-alaya-surface">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
                <p className="mt-3 text-[0.75rem] uppercase tracking-[0.16em]">
                  {member.name}
                </p>
                <p className="text-[0.65rem] text-alaya-muted">
                  {copy.role} · {copy.location}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
