import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contacta con Alaya Division.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        label="Customer Service"
        title="Contact"
        titleDisplay="Us"
        description="Para proyectos de tabla usa Pide Cita. Para el resto de consultas, escríbenos."
      />
      <div className="mt-12 space-y-6 border border-alaya-border p-8">
        <div>
          <p className="section-label">Email</p>
          <a
            href="mailto:hola@alayadivision.com"
            className="mt-2 block font-display text-2xl uppercase tracking-wide"
          >
            hola@alayadivision.com
          </a>
        </div>
        <div>
          <p className="section-label">Proyectos de tabla</p>
          <p className="mt-2 text-sm text-alaya-muted">
            El canal principal es el formulario de cita — presencial en fábrica u
            online.
          </p>
          <Button href="/pide-cita" variant="outline" className="mt-4">
            Pide Cita
          </Button>
        </div>
      </div>
    </div>
  );
}
