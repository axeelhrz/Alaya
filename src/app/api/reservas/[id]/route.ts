import { z } from "zod";
import { isPanelAuthed } from "@/lib/panel-auth";
import { updateReserva } from "@/lib/reservas";

const schema = z
  .object({
    status: z.enum(["pendiente", "confirmada", "cancelada"]).optional(),
    notes: z.string().max(2000).optional(),
  })
  .refine((data) => data.status !== undefined || data.notes !== undefined);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isPanelAuthed())) {
    return Response.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Datos no válidos." }, { status: 400 });
  }

  const reserva = await updateReserva(id, parsed.data);
  if (!reserva) {
    return Response.json({ error: "Reserva no encontrada." }, { status: 404 });
  }
  return Response.json({ reserva });
}
