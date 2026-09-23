import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Surf",
  description: "Boards, shapers y pide cita en Alaya Division.",
};

const items = [
  { href: "/surf/boards", label: "Boards", text: "Todos los modelos y filtros." },
  { href: "/surf/shapers", label: "Shapers", text: "Promodels y líneas de cada shaper." },
  { href: "/pide-cita", label: "Pide Cita", text: "Empieza tu tabla." },
];

export default function SurfPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8 sm:py-24">
      <h1 className="text-6xl font-light uppercase tracking-[0.16em] sm:text-8xl">
        Surf
      </h1>
      <div className="mt-14 grid gap-10 sm:grid-cols-3">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="group">
            <p className="text-xl uppercase tracking-[0.16em]">{item.label}</p>
            <p className="mt-2 text-sm text-alaya-muted">{item.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
