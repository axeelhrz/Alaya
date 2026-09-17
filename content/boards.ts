export type Board = {
  slug: string;
  name: string;
  category: string;
  shaper: string;
  dimensions: string;
  description: string;
  image: string;
};

export const boards: Board[] = [
  {
    slug: "ap-twin",
    name: "AP Twin",
    category: "Fish / Twin",
    shaper: "Patterson",
    dimensions: "5'6\" – 6'2\"",
    description:
      "Drive y speed en un outline fish contemporáneo. Ideal para olas de hombro con secciones rápidas.",
    image: "/images/boards/01.jpg",
  },
  {
    slug: "ara-mid",
    name: "ARA Mid",
    category: "Mid-Length",
    shaper: "Arakawa",
    dimensions: "6'8\" – 7'6\"",
    description:
      "Versatilidad atlántica: paddle fácil, trim limpio y suficiente performance para maniobras modernas.",
    image: "/images/boards/02.jpg",
  },
  {
    slug: "mp-hyper",
    name: "MP Hyper",
    category: "Shortboard",
    shaper: "Mark Phipps",
    dimensions: "5'8\" – 6'4\"",
    description:
      "Performance board para riders que buscan respuesta inmediata y control en beach breaks potentes.",
    image: "/images/boards/03.jpg",
  },
  {
    slug: "rb-keel",
    name: "RB Keel",
    category: "Retro Fish",
    shaper: "Roberds",
    dimensions: "5'4\" – 5'10\"",
    description:
      "Glide clásico con keels. Diversión máxima en olas pequeñas y medianas.",
    image: "/images/boards/04.jpg",
  },
  {
    slug: "dyn-aspen",
    name: "DYN Aspen",
    category: "All-Round",
    shaper: "Dylan",
    dimensions: "5'10\" – 6'6\"",
    description:
      "La tabla diaria equilibrada: volumen inteligente, rails sensibles y salida limpia.",
    image: "/images/boards/05.jpg",
  },
  {
    slug: "alaya-custom",
    name: "Alaya Custom",
    category: "Custom Order",
    shaper: "Alaya",
    dimensions: "A medida",
    description:
      "Proyecto 100% personalizado con el equipo Alaya. Desde el blank hasta el glass, cada decisión es tuya.",
    image: "/images/boards/06.jpg",
  },
];
