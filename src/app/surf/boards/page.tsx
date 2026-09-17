import type { Metadata } from "next";
import { boards } from "../../../../content/boards";
import { BoardCard } from "@/components/surf/BoardCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Boards",
  description:
    "Catálogo de tablas Alaya: promodels y custom. Encuentra tu modelo o pide cita.",
};

export default function BoardsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 md:px-6 md:py-24">
      <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          label="Tienda · Boards"
          title="Models"
          titleDisplay="Line-up"
          description="Promodels de shapers y Alaya Custom. Elige del catálogo o usa el match — luego cita para cerrar medidas y glass."
        />
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          <Button
            href="/surf/encuentra-tu-tabla"
            variant="outline"
            className="w-full sm:w-auto"
          >
            Match
          </Button>
          <Button href="/pide-cita" variant="primary" className="w-full sm:w-auto">
            Pide Cita
          </Button>
        </div>
      </div>
      <div className="mt-10 grid gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
        {boards.map((board) => (
          <BoardCard key={board.slug} board={board} />
        ))}
      </div>
    </div>
  );
}
