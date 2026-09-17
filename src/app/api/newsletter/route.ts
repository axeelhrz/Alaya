import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: "Email no válido." }, { status: 400 });
    }

    const { email } = parsed.data;
    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    const to = process.env.RESEND_TO;
    const from =
      process.env.RESEND_FROM || "Alaya Division <onboarding@resend.dev>";

    if (!apiKey) {
      console.info("[newsletter] (dev fallback — Resend no configurado)", email);
      return Response.json({
        ok: true,
        message: "Suscripción registrada (modo desarrollo).",
      });
    }

    const resend = new Resend(apiKey);

    if (audienceId) {
      await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
    } else if (to) {
      await resend.emails.send({
        from,
        to,
        subject: `Nueva suscripción newsletter — ${email}`,
        text: `Nuevo suscriptor: ${email}`,
      });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[newsletter]", error);
    return Response.json(
      { error: "No se pudo completar la suscripción." },
      { status: 500 },
    );
  }
}
