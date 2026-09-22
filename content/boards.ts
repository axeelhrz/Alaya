export type Board = {
  slug: string;
  name: string;
  category: string;
  categorySlug: "shortboard" | "fish" | "mid" | "custom";
  shaper: string;
  dimensions: string;
  description: string;
  image: string;
  related?: string[];
};

export const boardCategories = [
  { slug: "all", label: "All Boards" },
  { slug: "roberts", label: "Roberts" },
  { slug: "shortboard", label: "Shortboard" },
  { slug: "fish", label: "Fish / Twin" },
  { slug: "mid", label: "Mid-Length" },
  { slug: "custom", label: "Custom" },
] as const;

export const boards: Board[] = [
  {
    slug: "flying-hippie",
    name: "Flying Hippie",
    category: "Fish / Twin",
    categorySlug: "fish",
    shaper: "Roberts",
    dimensions: "5'2\" – 6'6\"",
    description:
      "Retro con respuesta moderna. Speed fácil, pocket más cerrado y un five-fin que se pide en cita con Roberts.",
    image: "/images/boards/roberts/flying-hippie-studio.jpg",
    related: ["bro-fish", "army-knife", "floaty"],
  },
  {
    slug: "wd3",
    name: "WD3",
    category: "Shortboard",
    categorySlug: "shortboard",
    shaper: "Roberts",
    dimensions: "5'6\" – 6'4\"",
    description:
      "Tercera generación Diamond: outline limpio y rail sensible para beach break y paredes que piden control.",
    image: "/images/boards/roberts/wd3-studio.jpg",
    related: ["gsd", "dream-machine", "flying-hippie"],
  },
  {
    slug: "dreamcatcher",
    name: "Dreamcatcher",
    category: "Mid-Length",
    categorySlug: "mid",
    shaper: "Roberts",
    dimensions: "6'4\" – 7'6\"",
    description:
      "All-around de paddle generoso y trim largo. La diaria cuando el swell es irregular y quieres metros de línea.",
    image: "/images/boards/roberts/dreamcatcher-studio.jpg",
    related: ["modern-mid", "fun-1", "army-knife"],
  },
  {
    slug: "dream-machine",
    name: "Dream Machine",
    category: "Shortboard",
    categorySlug: "shortboard",
    shaper: "Roberts",
    dimensions: "5'4\" – 6'2\"",
    description:
      "Groveler de volumen inteligente. Entra fácil en rodilla a hombro y mantiene speed cuando la ola se cierra.",
    image: "/images/boards/roberts/dream-machine-clean.jpg",
    related: ["floaty", "flying-hippie", "wd3"],
  },
  {
    slug: "gsd",
    name: "GSD",
    category: "Shortboard",
    categorySlug: "shortboard",
    shaper: "Roberts",
    dimensions: "5'8\" – 6'4\"",
    description:
      "High performance para beach break potente. Respuesta inmediata bajo el pie trasero y salida limpia.",
    image: "/images/boards/roberts/gsd-studio.jpg",
    related: ["wd3", "modern-mid", "dream-machine"],
  },
  {
    slug: "modern-mid",
    name: "Modern Mid",
    category: "Mid-Length",
    categorySlug: "mid",
    shaper: "Roberts",
    dimensions: "6'8\" – 7'6\"",
    description:
      "Mid contemporánea: paddle extra sin sensación de longboard. Trim, recortes y un rail que todavía pide curva.",
    image: "/images/boards/roberts/modern-mid-studio.jpg",
    related: ["dreamcatcher", "fun-1", "gsd"],
  },
  {
    slug: "army-knife",
    name: "Army Knife",
    category: "Fish / Twin",
    categorySlug: "fish",
    shaper: "Roberts",
    dimensions: "5'6\" – 6'4\"",
    description:
      "Betweener para no elegir. Cubre small days y swell decente sin cambiar de quiver.",
    image: "/images/boards/roberts/army-knife-studio.jpg",
    related: ["flying-hippie", "dreamcatcher", "bro-fish"],
  },
  {
    slug: "fun-1",
    name: "The Fun 1",
    category: "Mid-Length",
    categorySlug: "mid",
    shaper: "Roberts",
    dimensions: "6'10\" – 8'0\"",
    description:
      "Clásico moderno para glide y nose. La cita con Roberts si buscas metros y un rocker amable.",
    image: "/images/boards/roberts/fun-1-studio.jpg",
    related: ["modern-mid", "dreamcatcher", "floaty"],
  },
  {
    slug: "floaty",
    name: "Floaty",
    category: "Shortboard",
    categorySlug: "shortboard",
    shaper: "Roberts",
    dimensions: "5'4\" – 6'0\"",
    description:
      "Máximo paddle en el menor outline. Pensada para summer slop y riders que quieren flotar sin perder giro.",
    image: "/images/boards/roberts/floaty-studio.jpg",
    related: ["dream-machine", "flying-hippie", "bro-fish"],
  },
  {
    slug: "bro-fish",
    name: "Bro Fish",
    category: "Fish / Twin",
    categorySlug: "fish",
    shaper: "Roberts",
    dimensions: "5'2\" – 6'2\"",
    description:
      "Fish de speed y twin attitude. La línea Roberts más directa para paredes rápidas y días de hombro.",
    image: "/images/boards/roberts/bro-fish-studio.jpg",
    related: ["flying-hippie", "army-knife", "floaty"],
  },
  {
    slug: "ap-twin",
    name: "AP Twin",
    category: "Fish / Twin",
    categorySlug: "fish",
    shaper: "Patterson",
    dimensions: "5'6\" – 6'2\"",
    description:
      "Drive y speed en un outline fish contemporáneo. Ideal para olas de hombro con secciones rápidas.",
    image: "/images/boards/01.jpg",
    related: ["rb-keel", "dyn-twin", "alaya-custom"],
  },
  {
    slug: "ara-mid",
    name: "ARA Mid",
    category: "Mid-Length",
    categorySlug: "mid",
    shaper: "Arakawa",
    dimensions: "6'8\" – 7'6\"",
    description:
      "Versatilidad atlántica: paddle fácil, trim limpio y suficiente performance para maniobras modernas.",
    image: "/images/boards/02.jpg",
    related: ["ara-step", "dyn-aspen", "alaya-custom"],
  },
  {
    slug: "mp-hyper",
    name: "MP Hyper",
    category: "Shortboard",
    categorySlug: "shortboard",
    shaper: "Mark Phipps",
    dimensions: "5'8\" – 6'4\"",
    description:
      "Performance board para riders que buscan respuesta inmediata y control en beach breaks potentes.",
    image: "/images/boards/03.jpg",
    related: ["ap-round", "mp-groveler", "dyn-aspen"],
  },
  {
    slug: "rb-keel",
    name: "RB Keel",
    category: "Retro Fish",
    categorySlug: "fish",
    shaper: "Roberds",
    dimensions: "5'4\" – 5'10\"",
    description:
      "Glide clásico con keels. Diversión máxima en olas pequeñas y medianas.",
    image: "/images/boards/04.jpg",
    related: ["ap-twin", "rb-modern", "alaya-custom"],
  },
  {
    slug: "dyn-aspen",
    name: "DYN Aspen",
    category: "All-Round",
    categorySlug: "shortboard",
    shaper: "Dylan",
    dimensions: "5'10\" – 6'6\"",
    description:
      "La tabla diaria equilibrada: volumen inteligente, rails sensibles y salida limpia.",
    image: "/images/boards/05.jpg",
    related: ["mp-hyper", "ap-round", "ara-mid"],
  },
  {
    slug: "alaya-custom",
    name: "Alaya Custom",
    category: "Custom Order",
    categorySlug: "custom",
    shaper: "Alaya",
    dimensions: "A medida",
    description:
      "Proyecto 100% personalizado con el equipo Alaya. Desde el blank hasta el glass, cada decisión es tuya.",
    image: "/images/boards/06.jpg",
    related: ["ap-twin", "ara-mid", "mp-hyper"],
  },
  {
    slug: "ap-round",
    name: "AP Round Pin",
    category: "Shortboard",
    categorySlug: "shortboard",
    shaper: "Patterson",
    dimensions: "5'10\" – 6'4\"",
    description:
      "Performance shortboard con rail sensible y salida limpia. Precisión Patterson.",
    image: "/images/boards/03.jpg",
    related: ["mp-hyper", "dyn-aspen", "alaya-custom"],
  },
  {
    slug: "ara-step",
    name: "ARA Step-Up",
    category: "Mid-Length",
    categorySlug: "mid",
    shaper: "Arakawa",
    dimensions: "6'10\" – 7'8\"",
    description:
      "Volumen controlado para swell de tamaño serio. Paddle extra sin perder respuesta.",
    image: "/images/boards/02.jpg",
    related: ["ara-mid", "mp-hyper", "alaya-custom"],
  },
  {
    slug: "mp-groveler",
    name: "MP Groveler",
    category: "Shortboard",
    categorySlug: "shortboard",
    shaper: "Mark Phipps",
    dimensions: "5'6\" – 6'0\"",
    description:
      "Más volumen, más divertido en olas pequeñas. El daily driver de summer.",
    image: "/images/boards/05.jpg",
    related: ["rb-keel", "dyn-aspen", "ap-twin"],
  },
  {
    slug: "rb-modern",
    name: "RB Modern",
    category: "Fish / Twin",
    categorySlug: "fish",
    shaper: "Roberds",
    dimensions: "5'6\" – 6'0\"",
    description:
      "Híbrido contemporáneo para todo tipo de spot. Línea Roberds con attitude.",
    image: "/images/boards/01.jpg",
    related: ["rb-keel", "ap-twin", "dyn-twin"],
  },
  {
    slug: "dyn-twin",
    name: "DYN Twin Pin",
    category: "Fish / Twin",
    categorySlug: "fish",
    shaper: "Dylan",
    dimensions: "5'8\" – 6'2\"",
    description:
      "Twin con pin para speed y control en paredes largas.",
    image: "/images/boards/04.jpg",
    related: ["ap-twin", "rb-modern", "dyn-aspen"],
  },
  {
    slug: "alaya-step",
    name: "Alaya Step-Up",
    category: "Custom Order",
    categorySlug: "custom",
    shaper: "Alaya",
    dimensions: "A medida",
    description:
      "Custom de tamaño para swell serio. Brief con el equipo Alaya.",
    image: "/images/boards/06.jpg",
    related: ["alaya-custom", "ara-step", "mp-hyper"],
  },
];

export function filterBoards(cat?: string) {
  if (!cat || cat === "all") return boards;
  if (cat === "roberts") return boards.filter((b) => b.shaper === "Roberts");
  return boards.filter((b) => b.categorySlug === cat);
}

export function boardCitaHref(board: Board) {
  if (board.shaper === "Alaya") return "/pide-cita?choice=alaya";
  const slugs: Record<string, string> = {
    Roberts: "roberds",
    Roberds: "roberds",
    "Mark Phipps": "mark-phipps",
    Patterson: "patterson",
    Arakawa: "arakawa",
    Dylan: "dylan",
  };
  return `/pide-cita?shaper=${slugs[board.shaper] ?? board.shaper.toLowerCase()}`;
}

export function getBoard(slug: string) {
  return boards.find((b) => b.slug === slug);
}

export function getRelatedBoards(slug: string) {
  const board = getBoard(slug);
  if (!board?.related) return boards.filter((b) => b.slug !== slug).slice(0, 3);
  return board.related
    .map((id) => getBoard(id))
    .filter((b): b is Board => Boolean(b));
}
