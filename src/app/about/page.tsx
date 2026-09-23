import type { Metadata } from "next";
import { about } from "../../../content/about";
import { AboutView } from "@/components/about/AboutView";

export const metadata: Metadata = {
  title: "About Alaya Division",
  description: about.excerpt,
};

export default function AboutPage() {
  return <AboutView />;
}
