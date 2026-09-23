import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  titleEn: string;
  date: string;
  excerpt: string;
  excerptEn: string;
  cover: string;
  category: string;
};

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const mdxPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const mdPath = path.join(postsDirectory, `${realSlug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: {
      slug: realSlug,
      title: String(data.title || realSlug),
      titleEn: String(data.titleEn || data.title || realSlug),
      date: String(data.date || ""),
      excerpt: String(data.excerpt || ""),
      excerptEn: String(data.excerptEn || data.excerpt || ""),
      cover: String(data.cover || ""),
      category: String(data.category || "surf"),
    } satisfies PostMeta,
    content,
    contentEn: data.contentEn ? String(data.contentEn) : content,
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
