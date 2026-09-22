import { isPanelAuthed, panelPassword } from "@/lib/panel-auth";
import { listReservas } from "@/lib/reservas";
import { PanelLogin } from "@/components/panel/PanelLogin";
import { ReservasPanel } from "@/components/panel/ReservasPanel";

export const dynamic = "force-dynamic";

export default async function PanelPage() {
  if (!panelPassword()) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-alaya-black px-6 text-center text-white">
        <p className="max-w-sm text-sm leading-relaxed text-white/70">
          Configura <span className="text-white">PANEL_PASSWORD</span> para abrir
          el panel de reservas.
        </p>
      </div>
    );
  }

  if (!(await isPanelAuthed())) {
    return <PanelLogin />;
  }

  try {
    return <ReservasPanel initial={await listReservas()} />;
  } catch {
    return (
      <div className="flex min-h-svh items-center justify-center bg-alaya-white px-6 text-center">
        <p className="max-w-sm text-sm leading-relaxed text-alaya-muted">
          Las reservas se guardan en Vercel Blob, no en este equipo. Falta{" "}
          <span className="text-alaya-black">BLOB_READ_WRITE_TOKEN</span> en
          producción.
        </p>
      </div>
    );
  }
}
