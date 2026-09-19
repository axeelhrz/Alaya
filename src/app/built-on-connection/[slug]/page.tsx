import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function LegacyPostPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/new/${slug}`);
}
