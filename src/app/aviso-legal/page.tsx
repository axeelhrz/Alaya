import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: "Aviso legal de Alaya Division.",
};

export default function AvisoLegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading label="Customer Service" title="Aviso" titleDisplay="Legal" />
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-alaya-muted">
        <section>
          <h2 className="font-display text-2xl uppercase tracking-wide text-alaya-black">
            Titular
          </h2>
          <p className="mt-3">
            Alaya Division. Datos identificativos y domicilio social se
            actualizarán en esta página con la información fiscal definitiva
            antes del lanzamiento público.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl uppercase tracking-wide text-alaya-black">
            Objeto
          </h2>
          <p className="mt-3">
            Este sitio web tiene carácter informativo y de captación de contactos
            (citas y newsletter). No constituye una oferta de comercio
            electrónico en la Fase 1 (apparel coming soon).
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl uppercase tracking-wide text-alaya-black">
            Datos personales
          </h2>
          <p className="mt-3">
            Los datos facilitados en formularios (Pide Cita, newsletter) se
            utilizan exclusivamente para gestionar tu solicitud o suscripción y
            comunicaciones relacionadas con Alaya Division. Puedes ejercer tus
            derechos escribiendo a hola@alayadivision.com.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl uppercase tracking-wide text-alaya-black">
            Propiedad intelectual
          </h2>
          <p className="mt-3">
            Marca, contenidos y diseño de este sitio son propiedad de Alaya
            Division o se usan con licencia. Queda prohibida su reproducción sin
            autorización.
          </p>
        </section>
      </div>
    </div>
  );
}
