import { isPanelAuthed } from "@/lib/panel-auth";
import { listReservas } from "@/lib/reservas";

export async function GET() {
  if (!(await isPanelAuthed())) {
    return Response.json({ error: "No autorizado." }, { status: 401 });
  }
  return Response.json({ reservas: await listReservas() });
}
