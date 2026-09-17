import { differentiators } from "../../../content/differentiators";
import { Reveal } from "@/components/ui/Reveal";

export function Differentiators() {
  return (
    <section className="border-b border-alaya-border bg-alaya-white">
      <div className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
        {differentiators.map((item, i) => (
          <Reveal
            key={item.code}
            delay={i * 90}
            className="border-b border-alaya-border px-4 py-8 last:border-b-0 sm:odd:border-r sm:[&:nth-child(n+3)]:border-b-0 lg:border-b-0 lg:border-r lg:border-alaya-border lg:px-6 lg:py-12 lg:last:border-r-0"
          >
            <p className="font-display text-xl text-alaya-muted sm:text-2xl">
              {item.code}
            </p>
            <h2 className="mt-3 font-display text-xl uppercase tracking-wide sm:text-2xl md:text-3xl">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-alaya-muted">
              {item.text}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
