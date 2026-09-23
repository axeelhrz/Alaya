import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getShaper, shapers } from "../../../../../content/shapers";
import { boards } from "../../../../../content/boards";
import { ShaperDetailView } from "@/components/surf/ShaperDetailView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return shapers.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const shaper = getShaper(slug);
  if (!shaper) return { title: "Shaper" };
  return { title: shaper.name, description: shaper.bio };
}

export default async function ShaperDetailPage({ params }: Props) {
  const { slug } = await params;
  const shaper = getShaper(slug);
  if (!shaper) notFound();
  const related = boards.filter((b) => b.shaper === shaper.name).slice(0, 4);
  return <ShaperDetailView shaper={shaper} related={related} />;
}
