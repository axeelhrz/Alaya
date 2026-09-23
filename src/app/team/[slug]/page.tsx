import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeamMember, team } from "../../../../content/team";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return { title: "Team" };
  return { title: member.name, description: member.excerpt };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();
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
            Team · {member.role} · {member.location}
          </p>
          <h1 className="mt-4 text-4xl font-light uppercase tracking-[0.14em] sm:text-5xl">
            {member.name}
          </h1>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-alaya-muted">
            {member.body.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>

          <section className="mt-16">
            <p className="page-kicker">Team</p>
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
