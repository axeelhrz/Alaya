import type { Metadata } from "next";
import { Suspense } from "react";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Pide Cita",
  description:
    "Solicita una cita sin registrarte para iniciar tu proyecto de tabla con Alaya o un shaper.",
};

export default function PideCitaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16 md:px-6 md:py-24">
      <SectionHeading
        label="Pide Cita"
        title="Start"
        titleDisplay="Here"
        description="Sin registro. Cuéntanos tu proyecto: shaper o Alaya, presencial en fábrica u online. Te confirmaremos fecha y hora."
      />
      <div className="mt-8 border border-alaya-border p-4 sm:mt-12 sm:p-6 md:p-10">
        <Suspense
          fallback={<p className="text-sm text-alaya-muted">Cargando formulario…</p>}
        >
          <AppointmentForm />
        </Suspense>
      </div>
    </div>
  );
}
