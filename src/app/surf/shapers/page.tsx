import type { Metadata } from "next";
import { shapers } from "../../../../content/shapers";
import { ShaperCard } from "@/components/surf/ShaperCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Shapers",
  description:
    "Shapers Alaya: Patterson, Arakawa, Mark Phipps, Roberds y Dylan.",
};

export default function ShapersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        label="Surf · Shapers"
        title="The"
        titleDisplay="Shapers"
        description="Conoce a los shapers y sus promodels. Elige con quién quieres iniciar tu proyecto."
      />
      <div className="mt-14 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {shapers.map((shaper) => (
          <ShaperCard key={shaper.slug} shaper={shaper} />
        ))}
      </div>
    </div>
  );
}
