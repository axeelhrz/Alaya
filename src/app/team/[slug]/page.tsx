import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTeamMember, team } from "../../../../content/team";
import { TeamMemberView } from "@/components/team/TeamMemberView";

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
  return <TeamMemberView member={member} />;
}
