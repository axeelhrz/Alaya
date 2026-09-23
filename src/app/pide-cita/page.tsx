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
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-8 sm:py-28">
      <div className="text-center">
        <h1 className="text-5xl font-light uppercase tracking-[0.28em] sm:text-7xl">
          Pide cita
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[0.7rem] uppercase leading-relaxed tracking-[0.16em] text-alaya-muted">
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
