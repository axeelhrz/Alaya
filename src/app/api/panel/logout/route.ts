import { cookies } from "next/headers";
import { PANEL_COOKIE } from "@/lib/panel-auth";

export async function POST() {
  const store = await cookies();
  store.delete(PANEL_COOKIE);
  return Response.json({ ok: true });
}
