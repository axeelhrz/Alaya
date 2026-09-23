import type { Metadata } from "next";
import { Suspense } from "react";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { CitaHeading } from "@/components/forms/CitaHeading";

export const metadata: Metadata = {
  title: "Pide Cita",
  description:
    "Solicita una cita sin registrarte para iniciar tu proyecto de tabla con Alaya o un shaper.",
};

export default function PideCitaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-8 sm:py-28">
      <CitaHeading />
      <div className="mt-14">
        <Suspense
          fallback={<p className="text-center text-sm text-alaya-muted">Cargando…</p>}
        >
          <AppointmentForm />
        </Suspense>
      </div>
    </div>
  );
}
