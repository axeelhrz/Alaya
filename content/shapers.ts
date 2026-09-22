export type Shaper = {
  slug: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  image: string;
  promodels: { name: string; description: string }[];
};

export const shapers: Shaper[] = [
  {
    slug: "patterson",
    name: "Patterson",
    role: "Master Shaper",
    location: "California / Canarias",
    bio: "Décadas de experiencia dando forma a tablas de alto rendimiento. Su trabajo con Alaya combina precisión clásica y sensibilidad local para olas atlánticas.",
    image: "/images/shapers/patterson.jpg",
    promodels: [
      {
        name: "AP Twin",
        description: "Fish de alto drive para olas de hombro a overhead.",
      },
      {
        name: "AP Round Pin",
        description: "Performance shortboard con rail sensible y salida limpia.",
      },
    ],
  },
  {
    slug: "arakawa",
    name: "Arakawa",
    role: "Shaper",
    location: "Hawaii",
    bio: "Línea de promodels inspirada en el power surfing hawaiano: rockers controlados, outlines limpios y respuesta inmediata bajo el pie.",
    image: "/images/shapers/arakawa.jpg",
    promodels: [
      {
        name: "ARA Mid",
        description: "Mid-length versátil para days average y clean faces.",
      },
      {
        name: "ARA Step-Up",
        description: "Volumen controlado para swell de tamaño serio.",
      },
    ],
  },
  {
    slug: "mark-phipps",
    name: "Mark Phipps",
    role: "Shaper",
    location: "Australia",
    bio: "Estética australiana contemporánea: outlines progresivos, foam placement inteligente y tablas pensadas para riders exigentes.",
    image: "/images/shapers/mark-phipps.jpg",
    promodels: [
      {
        name: "MP Hyper",
        description: "Shortboard agresivo para beach breaks potentes.",
      },
      {
        name: "MP Groveler",
        description: "Más volumen, más divertido en olas pequeñas.",
      },
    ],
  },
  {
    slug: "roberds",
    name: "Roberts",
    role: "Shaper",
    location: "Ventura, USA",
    bio: "Línea Roberts en Alaya durante su estancia: diamonds, grovelers, fish y mids. Cada modelo se ajusta en cita — dims, glass y setup.",
    image: "/images/shapers/roberds.jpg",
    promodels: [
      {
        name: "Flying Hippie",
        description: "Retro con respuesta moderna y five-fin.",
      },
      {
        name: "Dreamcatcher",
        description: "All-around de paddle generoso y trim largo.",
      },
      {
        name: "GSD",
        description: "High performance para beach break potente.",
      },
    ],
  },
  {
    slug: "dylan",
    name: "Dylan",
    role: "Shaper",
    location: "Europa",
    bio: "Nueva generación de shaping: experimentación controlada, acabados premium y atención al detalle en cada etapa del proceso Alaya.",
    image: "/images/shapers/dylan.jpg",
    promodels: [
      {
        name: "DYN Aspen",
        description: "Tabla diaria equilibrada para progresión constante.",
      },
      {
        name: "DYN Twin Pin",
        description: "Twin con pin para speed y control en paredes largas.",
      },
    ],
  },
];

export function getShaper(slug: string) {
  return shapers.find((s) => s.slug === slug);
}
