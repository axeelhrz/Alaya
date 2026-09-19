import type { Metadata } from "next";
import { Suspense } from "react";
import { AppointmentForm } from "@/components/forms/AppointmentForm";

export const metadata: Metadata = {
  title: "Pide Cita",
  description:
    "Solicita una cita sin registrarte para iniciar tu proyecto de tabla con Alaya o un shaper.",
};

export default function PideCitaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-8 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-light uppercase tracking-[0.22em] sm:text-6xl">
          Pide cita
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-alaya-muted">
          Y da el primer paso para crear tu tabla a medida.
        </p>
      </div>
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
