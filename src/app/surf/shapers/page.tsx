import type { Metadata } from "next";
import { ShapersHub } from "@/components/surf/ShapersHub";

export const metadata: Metadata = {
  title: "Shapers",
  description:
    "Alaya shapers: Patterson, Arakawa, Mark Phipps, Roberds and Dylan.",
};

export default function ShapersPage() {
  return <ShapersHub />;
}
