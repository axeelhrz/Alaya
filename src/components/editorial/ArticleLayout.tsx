import { MDXRemote } from "next-mdx-remote/rsc";
import type { PostMeta } from "@/lib/posts";
import { ArticleView } from "@/components/editorial/ArticleView";

export function ArticleLayout({
  title,
  titleEn,
  cover,
  content,
  contentEn,
  related,
}: {
  title: string;
  titleEn: string;
  cover?: string;
  content: string;
  contentEn: string;
  related: PostMeta[];
}) {
  return (
    <ArticleView
      title={title}
      titleEn={titleEn}
      cover={cover}
      related={related}
      content={<MDXRemote source={content} />}
      contentEn={<MDXRemote source={contentEn} />}
    />
  );
}
