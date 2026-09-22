export type BoardSize = {
  dims: string;
  liters: number;
  advKg: number;
  intKg: number;
  novKg: number;
};

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
  wave?: string;
  rider?: string;
  rocker?: string;
  rails?: string;
  bottom?: string;
  fins?: string;
  volume?: string;
  body?: string;
  sizing?: string;
  sizes?: BoardSize[];
};

function stock(
  dims: string,
  liters: number,
  advLb: number,
  intLb: number,
  novLb: number,
): BoardSize {
  const kg = (lb: number) => Math.round(lb * 0.453592);
  return { dims, liters, advKg: kg(advLb), intKg: kg(intLb), novKg: kg(novLb) };
}

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
    volume: "23.9 – 48.5 L",
    description:
      "Retro empujado a performance: speed fácil y rail que todavía pide curva.",
    wave: "Rodilla a cabeza y pico. Beach, reef o point.",
    rider:
      "Quien viene de shortboard y quiere otra actitud, sin perder el rail. Intermedio a avanzado.",
    rocker: "Entrada baja y plana en el resto: paddle fácil y speed natural.",
    rails: "Medio, ligeramente down, con tucked hard edge para hold y feeling.",
    bottom: "Single a deep double y vee: lift, speed y control en el pocket.",
    fins: "Five-fin de serie (twin, thruster o quad). Twonzer bajo pedido.",
    body: "La Flying Hippie acerca el vibe retro al shortboard moderno. Mantiene volumen bajo el pecho para remar, afinó nose y tail para que responda, y subió un poco el rocker delantero para meterse más en el pocket y aguantar secciones más verticales. Es la tabla del equipo cuando el grind de performance se queda corto y aún quieres rail o lip.\n\nSe pide en cita con Roberts: dims, quillas y glass según cómo surfeas.",
    sizing:
      "Para el día a día, 2–4\" por debajo de tu altura y ~1 L más que tu tabla de ola buena. Más cruiser: a tu altura o por encima. Frente a un pro model, 5–7\" más corta, 1\" más ancha y un poco más de canto.",
    image: "/images/boards/roberts/flying-hippie-studio.jpg",
    related: ["bro-fish", "army-knife", "floaty"],
    sizes: [
      stock("5'2 x 18 3/4 x 2 3/16", 23.9, 140, 115, 95),
      stock("5'3 x 18 7/8 x 2 3/16", 24.47, 145, 120, 100),
      stock("5'4 x 19 x 2 1/4", 25.7, 155, 125, 105),
      stock("5'5 x 19 1/4 x 2 5/16", 27.15, 160, 135, 110),
      stock("5'6 x 19 1/2 x 2 3/8", 27.95, 165, 140, 115),
      stock("5'7 x 19 3/4 x 2 7/16", 30.18, 180, 150, 125),
      stock("5'8 x 20 x 2 1/2", 31.79, 190, 155, 130),
      stock("5'9 x 20 1/4 x 2 9/16", 33.47, 200, 165, 135),
      stock("5'10 x 20 1/2 x 2 5/8", 35.12, 210, 170, 145),
      stock("5'11 x 20 3/4 x 2 11/16", 36.94, 220, 180, 150),
      stock("6'0 x 21 x 2 3/4", 38.73, 230, 190, 160),
      stock("6'1 x 21 1/4 x 2 13/16", 40.59, 240, 200, 165),
      stock("6'2 x 21 3/8 x 2 7/8", 42.27, 250, 205, 170),
      stock("6'3 x 21 1/2 x 2 7/8", 43.16, 255, 210, 175),
      stock("6'4 x 21 5/8 x 2 15/16", 44.89, 265, 220, 185),
      stock("6'5 x 21 3/4 x 3", 46.7, 280, 230, 190),
      stock("6'6 x 21 7/8 x 3 1/16", 48.48, 290, 235, 200),
    ],
  },
  {
    slug: "wd3",
    name: "WD3",
    category: "Shortboard",
    categorySlug: "shortboard",
    shaper: "Roberts",
    dimensions: "4'10\" – 6'4\"",
    volume: "20.6 – 43.4 L",
    description:
      "La Diamond afinada para grovel: coge slop y sigue surfeando como una White Diamond.",
    wave: "Rodilla a hombro. Débil a un poco punchy.",
    rider:
      "Quien ya conoce la WD y quiere más rango bajo. Performance en ola chica, intermedio a avanzado.",
    rocker:
      "Bajo en el tail para speed; un flip en los últimos 8\" del nose para vertical en el pocket.",
    rails: "Llenos, con tucked hard edge: estabilidad y speed en surf pequeño.",
    bottom: "Single a double y un vee suave: speed, control y release arriba.",
    fins: "Cinco cajas. Twin + trailer, thruster o quad.",
    body: "La White Diamond original marcó el small-wave performance. La WD2 subió el techo de ola; la WD3 trabaja el suelo: más ancho en nose y tail, más superficie, el mismo rocker. Coge olas más chicas y cruza flats sin perder el feeling Diamond.\n\nSi las fotos se parecen a otras shortboards Roberts, aquí está la diferencia: no es un groveler blando ni un HP de swell serio. Es la Diamond cuando el swell no acompaña.",
    sizing:
      "Mismas dims que la WD original si quieres el mismo feeling en olas más chicas. Como groveler junto a una WD2: 1\" más corta. Frente a un pro model: 5–6\" más corta, 1\" más ancha, mismo canto.",
    image: "/images/boards/roberts/wd3-studio.jpg",
    related: ["gsd", "dream-machine", "flying-hippie"],
    sizes: [
      stock("4'10 x 18 3/4 x 2", 20.58, 125, 110, 90),
      stock("5'0 x 18 7/8 x 2 1/16", 21.97, 135, 115, 95),
      stock("5'1 x 19 x 2 1/16", 22.55, 140, 120, 100),
      stock("5'2 x 19 1/8 x 2 1/8", 23.77, 145, 125, 105),
      stock("5'3 x 19 1/4 x 2 1/8", 24.36, 150, 130, 110),
      stock("5'4 x 19 3/8 x 2 3/16", 25.88, 160, 135, 115),
      stock("5'5 x 19 1/2 x 2 1/4", 27.12, 165, 140, 120),
      stock("5'6 x 19 5/8 x 2 5/16", 28.31, 175, 150, 125),
      stock("5'7 x 19 3/4 x 2 3/8", 29.71, 180, 155, 130),
      stock("5'8 x 19 7/8 x 2 3/8", 30.62, 185, 160, 135),
      stock("5'9 x 20 x 2 7/16", 31.88, 195, 165, 140),
      stock("5'10 x 20 1/8 x 2 7/16", 32.62, 200, 170, 145),
      stock("5'11 x 20 1/4 x 2 1/2", 34.05, 210, 180, 150),
      stock("6'0 x 20 1/2 x 2 9/16", 35.67, 220, 185, 155),
      stock("6'1 x 20 3/4 x 2 5/8", 37.75, 230, 200, 165),
      stock("6'2 x 21 x 2 11/16", 39.47, 240, 205, 175),
      stock("6'3 x 21 1/4 x 2 3/4", 41.38, 255, 215, 180),
      stock("6'4 x 21 1/2 x 2 13/16", 43.38, 265, 225, 190),
    ],
  },
  {
    slug: "dreamcatcher",
    name: "Dreamcatcher",
    category: "Mid-Length",
    categorySlug: "mid",
    shaper: "Roberts",
    dimensions: "5'0\" – 6'6\"",
    volume: "21.6 – 46.6 L",
    description:
      "La versátil Roberts: paddle generoso, thumb tail y rango de rodilla a overhead.",
    wave: "Rodilla a varios pies overhead. Cara plana a hueca. Beach, reef o point.",
    rider:
      "Todos los niveles según el volumen. All-around del quiver y también tubo cuando la cola entra.",
    rocker:
      "Moderado, con un flip suave en el nose: speed sin remar de más y menos pearling.",
    rails: "Medio a lleno, tucked hard edge para hold y speed.",
    bottom: "Single a double: controla la velocidad que genera el outline.",
    fins: "Five-fin de serie. Thruster o single + sidebites bajo pedido.",
    body: "Foam en todo el blank para coger muchas olas, rocker moderado para el día a día, y una cola thumb metida que sujeta en swell más serio y en giros rápidos. Por eso cubre tanto: rails y nose llenos cuando el surf es irregular; cola y concave cuando la ola aprieta.\n\nNo es una mid clásica de trim eterno ni un HP puro. Es la diaria Roberts si el swell cambia cada hora.",
    sizing:
      "Frente a una WD / WD2: 1\" más larga, mismo canto o un poco más de litros. Hasta 1/2\" más estrecha si quieres más feeling. Frente a un pro model: 1–4\" más corta, hasta 5/8\" más ancha. Approach HP: a tu altura o 3–4\" por debajo.",
    image: "/images/boards/roberts/dreamcatcher-studio.jpg",
    related: ["modern-mid", "fun-1", "army-knife"],
    sizes: [
      stock("5'0 x 18 1/8 x 2 1/8", 21.62, 130, 115, 95),
      stock("5'2 x 18 1/4 x 2 1/8", 22.57, 135, 120, 100),
      stock("5'4 x 18 3/8 x 2 3/16", 24.14, 150, 130, 105),
      stock("5'5 x 18 1/2 x 2 1/4", 25.32, 155, 135, 110),
      stock("5'6 x 18 5/8 x 2 1/4", 25.92, 160, 140, 115),
      stock("5'7 x 18 3/4 x 2 5/16", 27.19, 165, 145, 120),
      stock("5'8 x 18 15/16 x 2 3/8", 28.72, 175, 150, 125),
      stock("5'9 x 19 1/8 x 2 3/8", 29.5, 180, 155, 130),
      stock("5'10 x 19 5/16 x 2 7/16", 30.8, 190, 160, 135),
      stock("5'11 x 19 1/2 x 2 1/2", 32.32, 200, 170, 145),
      stock("6'0 x 19 3/4 x 2 9/16", 34.21, 210, 180, 155),
      stock("6'1 x 20 x 2 5/8", 35.93, 220, 190, 160),
      stock("6'2 x 20 1/4 x 2 11/16", 37.4, 230, 195, 165),
      stock("6'3 x 20 1/2 x 2 3/4", 39.77, 245, 205, 175),
      stock("6'4 x 20 7/8 x 2 13/16", 41.94, 255, 215, 185),
      stock("6'5 x 21 1/4 x 2 7/8", 44.16, 270, 230, 200),
      stock("6'6 x 21 5/8 x 2 15/16", 46.59, 285, 245, 205),
    ],
  },
  {
    slug: "dream-machine",
    name: "Dream Machine",
    category: "Shortboard",
    categorySlug: "shortboard",
    shaper: "Roberts",
    dimensions: "5'0\" – 6'6\"",
    volume: "24.2 – 53.6 L",
    description:
      "Groveler corto y ancho para olas planas: la diaria de beach y point chico.",
    wave: "Olas planas y lentas. Cualquier beach o point.",
    rider:
      "Diaria de small-medium. Se suele ir 7–8\" por debajo del shortboard estándar, o 3–4\" por debajo de una White Diamond.",
    rocker: "Muy bajo en todo el blank, con un flip suave en el nose.",
    rails:
      "Medio-llenos para flotar; tucked hard edge para speed y hold; más blandos en el tercio delantero.",
    bottom: "Single a deep double en el tail.",
    fins: "Five-fin de serie (thruster o quad). Single como extra.",
    body: "Más corta y más ancha que un shortboard de performance. No busca hueco crítico: busca remar menos, planear en cara floja y no morir en el flat. El rocker bajo y el ancho hacen el trabajo; el concave del tail evita que se sienta como un ladrillo.\n\nJunto a una WD3 se entiende el quiver: la WD3 sigue siendo Diamond; la Dream Machine es groveler puro. Las fotos se parecen; el uso no.",
    sizing:
      "Grovel rail-to-rail: 7\" más corta que tu pro model, o 5–7\" por debajo de tu altura, con 3–5 L extra. Cruiser: más larga y ancha hasta ~10 L más que tu tabla de ola buena.",
    image: "/images/boards/roberts/dream-machine-clean.jpg",
    related: ["floaty", "flying-hippie", "wd3"],
    sizes: [
      stock("5'0 x 19 1/2 x 2 1/8", 24.17, 125, 110, 90),
      stock("5'1 x 19 3/4 x 2 3/16", 25.52, 135, 115, 95),
      stock("5'2 x 20 x 2 1/4", 26.95, 145, 125, 105),
      stock("5'3 x 20 1/4 x 2 5/16", 28.67, 155, 130, 110),
      stock("5'4 x 20 1/2 x 2 3/8", 29.88, 160, 135, 115),
      stock("5'5 x 20 3/4 x 2 7/16", 31.78, 165, 140, 120),
      stock("5'6 x 21 x 2 1/2", 33.34, 175, 150, 125),
      stock("5'7 x 21 1/4 x 2 9/16", 34.91, 180, 155, 130),
      stock("5'8 x 21 1/2 x 2 5/8", 36.92, 185, 160, 135),
      stock("5'9 x 21 3/4 x 2 11/16", 38.95, 190, 165, 140),
      stock("5'10 x 22 x 2 3/4", 40.46, 200, 170, 145),
      stock("5'11 x 22 1/8 x 2 3/4", 41.37, 205, 175, 150),
      stock("6'0 x 22 1/4 x 2 13/16", 43.07, 210, 180, 155),
      stock("6'1 x 22 3/8 x 2 7/8", 44.99, 230, 195, 165),
      stock("6'2 x 22 1/2 x 2 15/16", 46.82, 240, 205, 175),
      stock("6'3 x 22 5/8 x 3", 48.69, 250, 215, 180),
      stock("6'4 x 22 3/4 x 3 1/16", 50.57, 275, 235, 200),
      stock("6'5 x 22 7/8 x 3 1/16", 51.5, 290, 250, 210),
      stock("6'6 x 23 x 3 1/8", 53.59, 315, 275, 250),
    ],
  },
  {
    slug: "gsd",
    name: "GSD",
    category: "Shortboard",
    categorySlug: "shortboard",
    shaper: "Roberts",
    dimensions: "5'8\" – 6'4\"",
    description:
      "High performance de swell con punch. Aquí el rocker y el pocket mandan.",
    wave: "Hombro a doble overhead. Punch y verticalidad. Beach, point o reef.",
    rider:
      "Surfista de performance que viaja o espera swell de verdad. No es la diaria de summer.",
    rocker: "Mucho rocker en todo el blank para entrar en cara vertical y sección crítica.",
    rails: "Medio a ligeramente pinched.",
    bottom: "Single a un double marcado en el tail.",
    fins: "Thruster de serie. Five-fin opcional; el quad funciona en hueco rápido.",
    body: "Sale del G Step Up: más curva para encajar en ola hueca y empinada. Si la Dream Machine o la WD3 viven en slop, la GSD es el otro extremo del catálogo Roberts. Las fotos de shortboard se parecen; el rocker no.\n\nTabla de viaje cuando el swell tiene hueso. Dims custom en cita: Roberts no publica una grilla fija de stock como en los grovelers.",
    sizing:
      "Se pide a medida según peso, nivel y el swell al que vas. En cita afinamos largo, litros y setup de quillas.",
    image: "/images/boards/roberts/gsd-studio.jpg",
    related: ["wd3", "modern-mid", "dream-machine"],
  },
  {
    slug: "modern-mid",
    name: "Modern Mid",
    category: "Mid-Length",
    categorySlug: "mid",
    shaper: "Roberts",
    dimensions: "5'6\" – 7'6\"",
    volume: "25.2 – 57.8 L",
    description:
      "Entre mid y Dreamcatcher: paddle de mid, rail más sensible.",
    wave: "Rodilla a overhead. Beach, point o reef.",
    rider:
      "Quien quiere flow de mid sin longboard. En volúmenes altos: riders más ligeros, nuevos o que buscan remar sin pelear.",
    rocker: "Bajo a moderado, con un flip suave en el nose.",
    rails: "Medio afinado, tucked hard edge: feeling y hold.",
    bottom: "Single a double, cola pin redondeada heredada de la Dreamcatcher.",
    fins: "Cajas para single, single + sidebites o thruster, más dos cajas extra para twin o bonzer.",
    body: "Wide point adelantado y outline con curva: remas como en una mid, pero el nose es un poco más ancho y más fino que en la Dreamcatcher para bajar swing weight. Rails afinados y rocker pensado para meter rail, no solo trim.\n\nEl setup de quillas es lo que la separa del resto: no es solo una mid más larga. En cita se decide si vas single, thruster o twin.",
    sizing:
      "Feeling performance + flow: unos 4–8\" por encima de tu altura. Mid más clásica: 8–12\" por encima (el punto dulce suele ser +10\").",
    image: "/images/boards/roberts/modern-mid-studio.jpg",
    related: ["dreamcatcher", "fun-1", "gsd"],
    sizes: [
      stock("5'6 x 18 1/2 x 2 1/4", 25.16, 115, 95, 80),
      stock("5'8 x 19 x 2 5/16", 27.34, 125, 105, 90),
      stock("5'10 x 19 1/2 x 2 3/8", 29.74, 135, 115, 95),
      stock("6'0 x 20 x 2 1/2", 33.0, 150, 125, 105),
      stock("6'2 x 20 1/4 x 2 9/16", 35.27, 160, 135, 115),
      stock("6'4 x 20 3/4 x 2 5/8", 38.12, 175, 145, 125),
      stock("6'6 x 21 1/4 x 2 11/16", 41.06, 190, 155, 135),
      stock("6'8 x 21 1/2 x 2 3/4", 43.67, 200, 165, 140),
      stock("6'10 x 21 5/8 x 2 7/8", 47.11, 215, 180, 150),
      stock("7'0 x 21 3/4 x 3", 50.63, 230, 190, 165),
      stock("7'2 x 21 7/8 x 3 1/16", 53.33, 245, 200, 175),
      stock("7'4 x 22 x 3 1/8", 56.15, 255, 215, 180),
      stock("7'6 x 22 1/8 x 3 1/8", 57.75, 265, 220, 185),
    ],
  },
  {
    slug: "army-knife",
    name: "Army Knife",
    category: "Fish / Twin",
    categorySlug: "fish",
    shaper: "Roberts",
    dimensions: "5'2\" – 6'6\"",
    volume: "22.7 – 43.6 L",
    description:
      "La navaja del quiver: speed de línea recta y cola que todavía gira.",
    wave: "Rodilla a un par de pies overhead.",
    rider:
      "Quien no quiere elegir entre groveler y shortboard. La multi-herramienta del día a día.",
    rocker: "Moderado a bajo: speed rápido y la mantiene en el flat.",
    rails: "Medios, apex un poco más bajo para hold.",
    bottom: "Single profundo en el medio a double en el tail.",
    fins: "Five-fin de serie. Thruster o quad.",
    body: "Piezas de varios modelos Roberts: rocker y rail más rectos al estilo 3DF para ir rápido de frente; nose tipo White Diamond; caderas de Modern 80s que pivotan y recortan cola; bloque de cola de la Black Diamond para feeling. No es un HP de swell gordo ni un groveler ancho: está en medio a propósito.\n\nSi las fotos se parecen a otras shortboards de la línea, mira el outline: las caderas y la cola metida son el recorte.",
    sizing:
      "Frente a un pro model: 5–6\" más corta, 1\" más ancha, mismo canto. Approach HP: 1–4\" por debajo de tu altura. Más estable: a tu altura o por encima, con más litros.",
    image: "/images/boards/roberts/army-knife-studio.jpg",
    related: ["flying-hippie", "dreamcatcher", "bro-fish"],
    sizes: [
      stock("5'2 x 18 3/8 x 2 1/8", 22.68, 140, 120, 100),
      stock("5'4 x 18 5/8 x 2 3/16", 24.72, 150, 130, 110),
      stock("5'5 x 18 3/4 x 2 1/4", 25.66, 155, 135, 115),
      stock("5'6 x 18 7/8 x 2 5/16", 26.95, 165, 140, 120),
      stock("5'7 x 19 1/8 x 2 3/8", 28.45, 175, 150, 125),
      stock("5'8 x 19 1/4 x 2 7/16", 30.09, 185, 155, 130),
      stock("5'9 x 19 3/8 x 2 7/16", 30.53, 190, 160, 135),
      stock("5'10 x 19 1/2 x 2 1/2", 31.98, 195, 165, 140),
      stock("5'11 x 19 5/8 x 2 1/2", 32.71, 200, 170, 145),
      stock("6'0 x 19 3/4 x 2 9/16", 34.22, 210, 180, 150),
      stock("6'1 x 19 7/8 x 2 5/8", 35.75, 220, 185, 155),
      stock("6'2 x 20 1/8 x 2 11/16", 37.58, 230, 195, 165),
      stock("6'4 x 20 3/8 x 2 13/16", 40.91, 250, 215, 180),
      stock("6'6 x 20 5/8 x 2 7/8", 43.57, 265, 230, 190),
    ],
  },
  {
    slug: "fun-1",
    name: "The Fun 1",
    category: "Mid-Length",
    categorySlug: "mid",
    shaper: "Roberts",
    dimensions: "5'6\" – 8'6\"",
    volume: "28.5 – 70.8 L",
    description:
      "Primera tabla, funboard o one-board: fácil de remar y todavía gira.",
    wave: "Rodilla a overhead y pico.",
    rider:
      "Principiante que quiere progresar, quien busca alternativa al longboard, o avanzado que quiere coger más olas.",
    rocker:
      "No es el rocker plano de un funboard típico: flip suave en el nose, moderado al centro, flip ligero en el tail.",
    rails: "Medios — no llenos — para estabilizar y dejar girar a riders ligeros o avanzados.",
    bottom: "Single en la entrada a double en el tail. Squash un poco metida.",
    fins: "Five-fin de serie (thruster o quad). Single + sidebites bajo pedido.",
    body: "Roberts la lleva años afinando para que no se quede en mini-longboard plana: ese rocker intermedio evita pearling y hang-ups, y deja aplicar rail cuando el nivel sube. Nose más lleno para remar; cola squash para no arrastrar.\n\nSegún cómo la midas, es tabla de escuela o mid que un avanzado puede romper. La Modern Mid pisa más performance; la Fun 1 es la más abierta del catálogo.",
    sizing:
      "Principiante: según peso en la grilla, o un poco más larga si quieres remar más fácil. Avanzado: más corta que tu altura con litros por encima del shortboard, o varios pulgadas por encima para mid rippable.",
    image: "/images/boards/roberts/fun-1-studio.jpg",
    related: ["modern-mid", "dreamcatcher", "floaty"],
    sizes: [
      stock("5'6 x 19 3/4 x 2 1/4", 28.53, 170, 150, 125),
      stock("5'8 x 19 7/8 x 2 1/4", 29.69, 180, 160, 130),
      stock("5'10 x 20 x 2 5/16", 31.71, 190, 170, 140),
      stock("6'0 x 20 1/4 x 2 3/8", 34.1, 210, 180, 150),
      stock("6'2 x 20 1/2 x 2 1/2", 36.69, 225, 190, 160),
      stock("6'4 x 20 3/4 x 2 9/16", 39.58, 240, 205, 175),
      stock("6'6 x 21 x 2 5/8", 42.14, 260, 220, 185),
      stock("6'8 x 21 1/4 x 2 5/8", 43.44, 265, 230, 190),
      stock("6'10 x 21 3/8 x 2 11/16", 46.25, 285, 240, 205),
      stock("7'0 x 21 1/2 x 2 3/4", 48.79, 300, 255, 215),
      stock("7'2 x 21 5/8 x 2 3/4", 49.78, 310, 260, 220),
      stock("7'4 x 21 3/4 x 2 13/16", 52.53, 320, 275, 230),
      stock("7'6 x 21 7/8 x 2 7/8", 55.39, 340, 290, 245),
      stock("7'8 x 22 x 2 15/16", 58.54, 360, 305, 260),
      stock("7'10 x 22 1/8 x 3", 61.51, 375, 320, 270),
      stock("8'0 x 22 1/4 x 3 1/16", 64.34, 395, 335, 285),
      stock("8'2 x 22 3/8 x 3 1/16", 65.79, 400, 345, 290),
      stock("8'4 x 22 1/2 x 3 1/8", 69.18, 425, 360, 305),
      stock("8'6 x 22 5/8 x 3 3/16", 70.82, 435, 370, 310),
    ],
  },
  {
    slug: "floaty",
    name: "Floaty",
    category: "Shortboard",
    categorySlug: "shortboard",
    shaper: "Roberts",
    dimensions: "5'0\" – 6'0\"",
    volume: "26.9 – 46.8 L",
    description:
      "Ancha y con litros, pero rápida. El groveler cuando quieres flotar de verdad.",
    wave: "Caras planas o lentas. Slop de summer.",
    rider:
      "Quien mejora en tabla más corta y aún necesita remar fácil. También groveler de peso o groms. Se puede aprender en ella.",
    rocker: "Bajo para remar y speed; flip suave en el nose para no clavar la caída.",
    rails:
      "Blandos delante, más duros atrás, afinados: perdona y deja girar a riders ligeros.",
    bottom: "Single a double y vee en el tail.",
    fins: "Five-fin (twin, twin + trailer, thruster o quad).",
    body: "No es softboard. Outline ancho de nose a tail para remar y estar estable; rails afinados para que no se quede muerta. La Dream Machine es groveler más performance y más corta; la Floaty es el acorazado de ola chica: más litros, más perdón, todavía gira.\n\nPor encima de 6' va a custom.",
    sizing:
      "Novato que progresa: a tu altura o +2\". Grovel rail-to-rail: 6\" más corta que el pro model, o 4–6\" por debajo de tu altura, con 3–5 L extra. Cruiser: ~10 L más que tu tabla de ola buena.",
    image: "/images/boards/roberts/floaty-studio.jpg",
    related: ["dream-machine", "flying-hippie", "bro-fish"],
    sizes: [
      stock("5'0 x 19 3/4 x 2 7/16", 26.93, 130, 110, 85),
      stock("5'2 x 20 1/4 x 2 9/16", 30.03, 145, 120, 95),
      stock("5'4 x 20 3/4 x 2 11/16", 33.33, 165, 135, 105),
      stock("5'5 x 21 x 2 3/4", 35.02, 170, 140, 110),
      stock("5'6 x 21 1/4 x 2 13/16", 36.78, 180, 145, 115),
      stock("5'7 x 21 1/2 x 2 7/8", 38.56, 190, 155, 120),
      stock("5'8 x 21 3/4 x 2 15/16", 40.44, 200, 160, 125),
      stock("5'9 x 22 x 2 15/16", 41.62, 205, 165, 130),
      stock("5'10 x 22 1/8 x 3", 43.31, 210, 190, 135),
      stock("5'11 x 22 1/4 x 3 1/16", 45.3, 220, 180, 140),
      stock("6'0 x 22 3/8 x 3 1/8", 46.82, 230, 185, 145),
    ],
  },
  {
    slug: "bro-fish",
    name: "Bro Fish",
    category: "Fish / Twin",
    categorySlug: "fish",
    shaper: "Roberts",
    dimensions: "5'0\" – 6'2\"",
    volume: "25.3 – 47.5 L",
    description:
      "Fish con pico, litros bajo el pecho y swallow: glide clásico, carve de ahora.",
    wave: "Rodilla a cabeza y pico. Beach, reef o point.",
    rider:
      "Quien quiere fish de verdad (speed y flow) y poder apretar el rail. Twin suelto o Twonzer con más hold.",
    rocker: "Entrada baja y plana: remar fácil y speed.",
    rails: "Medio, ligeramente down, tucked hard edge.",
    bottom: "Single a deep double y vee: lift y control en el pocket.",
    fins: "Twonzer de serie. Twin suelto o Twonzer Roberts para hold a más speed.",
    body: "Beak, foam bajo el pecho y swallow ancha: se lee como fish de siempre. La cola tiene más curva y el fondo más trabajo que un classic fish, para carvear en el pocket igual que en cara abierta. El Twin puro a veces resbala; el Twonzer mantiene la speed y sujeta el rail.\n\nLa Flying Hippie es el paso más performance de esta familia. La Bro Fish es el origen: más fish, más glide.",
    sizing:
      "3–5\" por debajo de tu altura y ~2 L más que tu tabla de ola buena. Más cruiser: por encima de tu altura. Frente a un pro model: 6–8\" más corta, 1 1/2\" más ancha y un poco más de canto (~2 L extra).",
    image: "/images/boards/roberts/bro-fish-studio.jpg",
    related: ["flying-hippie", "army-knife", "floaty"],
    sizes: [
      stock("5'0 x 19 1/2 x 2 1/4", 25.25, 145, 120, 100),
      stock("5'2 x 19 3/4 x 2 5/16", 27.28, 160, 130, 110),
      stock("5'4 x 20 x 2 3/8", 29.3, 170, 140, 120),
      stock("5'5 x 20 1/4 x 2 7/16", 30.8, 180, 145, 125),
      stock("5'6 x 20 1/2 x 2 1/2", 32.5, 190, 155, 130),
      stock("5'7 x 20 3/4 x 2 9/16", 34.3, 200, 165, 135),
      stock("5'8 x 21 x 2 5/8", 36.05, 210, 170, 145),
      stock("5'9 x 21 1/4 x 2 11/16", 37.8, 220, 180, 150),
      stock("5'10 x 21 1/2 x 2 3/4", 39.6, 230, 190, 160),
      stock("5'11 x 21 3/4 x 2 13/16", 41.5, 240, 200, 165),
      stock("6'0 x 22 x 2 7/8", 43.4, 250, 210, 175),
      stock("6'1 x 22 1/4 x 2 15/16", 45.2, 260, 215, 180),
      stock("6'2 x 22 1/2 x 3", 47.49, 275, 225, 190),
    ],
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
