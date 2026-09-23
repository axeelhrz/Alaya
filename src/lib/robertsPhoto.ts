const UUID_RE =
  /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;

const CATALOG = "/images/boards/roberts/catalog";

function folderFor(src: string): "front" | "back" | "composer" {
  if (src.includes("-back.")) return "back";
  if (src.includes("-composite.") || src.includes("/composer/")) return "composer";
  return "front";
}

/** Official drops: catalog/front|back|composer/{UUID}.png */
export function robertsPhotoCandidates(src: string): string[] {
  const match = src.match(UUID_RE);
  if (!match) return [src];
  const uuid = match[1].toUpperCase();
  const folder = folderFor(src);
  const official = `${CATALOG}/${folder}/${uuid}.png`;
  const loose = `${CATALOG}/${uuid}.png`;
  const out = [official];
  if (folder === "front" && loose !== official) out.push(loose);
  if (src !== official && src !== loose) out.push(src);
  return out;
}
