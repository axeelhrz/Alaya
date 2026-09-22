import { Resend } from "resend";
import { shapers } from "../../../../content/shapers";
import {
  appointmentTypes,
  appointmentChoices,
} from "../../../../content/appointment-slots";
import { appointmentSchema } from "@/lib/appointment-schema";
import { createReserva } from "@/lib/reservas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = appointmentSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: "Revisa los campos del formulario." },
        { status: 400 },
      );
    }

    const data = parsed.data;

    if (data.choice === "shaper" && !data.shaperSlug) {
      return Response.json(
        { error: "Selecciona un shaper." },
        { status: 400 },
      );
    }

    const shaperName =
      data.choice === "shaper"
        ? shapers.find((s) => s.slug === data.shaperSlug)?.name || data.shaperSlug
        : "Alaya";

    const choiceLabel =
      appointmentChoices.find((c) => c.value === data.choice)?.label ||
      data.choice;
    const typeLabel =
      appointmentTypes.find((t) => t.value === data.appointmentType)?.label ||
      data.appointmentType;

    await createReserva(data, shaperName);

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.RESEND_TO;
    const from = process.env.RESEND_FROM || "Alaya Division <onboarding@resend.dev>";

    if (!apiKey || !to) {
      console.info("[appointment] (dev fallback — Resend no configurado)", data);
      return Response.json({
        ok: true,
        message: "Solicitud recibida (modo desarrollo).",
      });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Nueva cita — ${data.name} · ${choiceLabel}`,
      text: [
        `Nombre: ${data.name}`,
        `Email: ${data.email}`,
        `Teléfono: ${data.phone}`,
        `Elección: ${choiceLabel}${data.choice === "shaper" ? ` (${shaperName})` : ""}`,
        `Tipo: ${typeLabel}`,
        `Fecha: ${data.date}`,
        `Hora: ${data.time}`,
        "",
        "Info tabla:",
        data.boardInfo,
      ].join("\n"),
    });

    await resend.emails.send({
      from,
      to: data.email,
      subject: "Hemos recibido tu solicitud de cita — Alaya Division",
      text: [
        `Hola ${data.name},`,
        "",
        "Gracias por contactar con Alaya Division. Hemos recibido tu solicitud de cita y te confirmaremos fecha y hora lo antes posible.",
        "",
        `Resumen: ${typeLabel} · ${data.date} ${data.time} · ${choiceLabel}`,
        "",
        "Built on Connection,",
        "Alaya Division",
      ].join("\n"),
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[appointment]", error);
    return Response.json(
      { error: "No se pudo enviar la solicitud. Inténtalo de nuevo." },
      { status: 500 },
    );
  }
}
