import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BoardMatch } from "@/components/surf/BoardMatch";
import { AlayaProcess } from "@/components/home/AlayaProcess";

export const metadata: Metadata = {
  title: "Encuentra tu tabla",
  description:
    "Herramienta Alaya: encuentra el modelo y shaper según tu nivel, olas y estilo. Luego pide cita.",
};

export default function EncuentraTuTablaPage() {
  return (
    <div>
      <section className="border-b border-alaya-border bg-alaya-black px-4 py-16 text-white md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            light
            label="Herramienta exclusiva"
            title="Match"
            titleDisplay="Alaya"
            description="Tres preguntas. Una recomendación de tabla + shaper. La forma Alaya de comprar: primero claridad, después cita — no un carrito a ciegas."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <BoardMatch />
      </section>

      <AlayaProcess />
    </div>
  );
}
