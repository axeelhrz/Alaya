import { alayaProcess } from "../../../content/differentiators";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function AlayaProcess({ light = false }: { light?: boolean }) {
  return (
    <section
      className={
        light
          ? "bg-alaya-black text-white"
          : "border-y border-alaya-border bg-alaya-white"
      }
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-20 md:px-6 md:py-28">
        <Reveal>
          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              light={light}
              label="Proceso Alaya"
              title="Blank to"
              titleDisplay="Wave"
              description="Lo que te diferencia de comprar una tabla online sin cara: ves cada etapa y hablas con quien la hace."
            />
            <Button
              href="/pide-cita"
              variant={light ? "secondary" : "outline"}
              className="w-full shrink-0 sm:w-auto"
            >
              Empezar proceso
            </Button>
          </div>
        </Reveal>
        <ol className="mt-10 grid gap-1 sm:mt-14 sm:grid-cols-2 lg:grid-cols-5">
          {alayaProcess.map((item, i) => (
            <Reveal
              key={item.step}
              as="li"
              delay={i * 100}
              className={`border p-5 sm:p-6 md:p-7 ${
                light
                  ? "border-white/20 bg-white/5"
                  : "border-alaya-border bg-alaya-surface"
              }`}
            >
              <p
                className={`font-display text-2xl sm:text-3xl ${
                  light ? "text-white/40" : "text-alaya-muted"
                }`}
              >
                {item.step}
              </p>
              <h3 className="mt-3 font-display text-xl uppercase tracking-wide sm:mt-4 sm:text-2xl">
                {item.title}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed sm:mt-3 ${
                  light ? "text-white/70" : "text-alaya-muted"
                }`}
              >
                {item.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
