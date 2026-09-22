import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const PANEL_COOKIE = "alaya_panel";

export function panelPassword() {
  if (process.env.PANEL_PASSWORD) return process.env.PANEL_PASSWORD;
  if (process.env.NODE_ENV !== "production") return "alaya";
  return "";
}

export function panelToken(password = panelPassword()) {
  if (!password) return "";
  return createHmac("sha256", password).update("alaya-panel").digest("hex");
}

export function passwordsMatch(input: string) {
  const expected = panelPassword();
  if (!expected || !input) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function cookieMatches(value?: string) {
  const expected = panelToken();
  if (!expected || !value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isPanelAuthed() {
  const store = await cookies();
  return cookieMatches(store.get(PANEL_COOKIE)?.value);
}
