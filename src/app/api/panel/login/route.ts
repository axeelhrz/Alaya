import { cookies } from "next/headers";
import {
  PANEL_COOKIE,
  panelPassword,
  panelToken,
  passwordsMatch,
} from "@/lib/panel-auth";

export async function POST(request: Request) {
  if (!panelPassword()) {
    return Response.json(
      { error: "Configura PANEL_PASSWORD en el servidor." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  if (!passwordsMatch(body?.password ?? "")) {
    return Response.json({ error: "Contraseña incorrecta." }, { status: 401 });
  }

  const store = await cookies();
  store.set(PANEL_COOKIE, panelToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  return Response.json({ ok: true });
}
