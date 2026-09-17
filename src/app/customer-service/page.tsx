import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Customer Service",
  description: "Atención al cliente Alaya Division.",
};

export default function CustomerServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        label="Customer Service"
        title="How can"
        titleDisplay="We help"
        description="Canales de soporte para la Fase 1 del sitio Alaya Division."
      />
      <ul className="mt-12 space-y-1">
        {[
          {
            title: "Proyecto de tabla",
            text: "Usa Pide Cita — sin registro.",
            href: "/pide-cita",
            cta: "Pide Cita",
          },
          {
            title: "Consultas generales",
            text: "Escríbenos desde Contact Us.",
            href: "/contact",
            cta: "Contactar",
          },
          {
            title: "Información legal",
            text: "Consulta el Aviso Legal.",
            href: "/aviso-legal",
            cta: "Aviso Legal",
          },
        ].map((item) => (
          <li
            key={item.href}
            className="flex flex-col gap-4 border border-alaya-border p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wide">
                {item.title}
              </h2>
              <p className="mt-1 text-sm text-alaya-muted">{item.text}</p>
            </div>
            <Button href={item.href} variant="outline" className="shrink-0">
              {item.cta}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
