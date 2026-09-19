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
  { slug: "shortboard", label: "Shortboard" },
  { slug: "fish", label: "Fish / Twin" },
  { slug: "mid", label: "Mid-Length" },
  { slug: "custom", label: "Custom" },
] as const;

export const boards: Board[] = [
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
