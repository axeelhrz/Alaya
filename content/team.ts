import type { Locale } from "@/lib/i18n";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  roleEs: string;
  location: string;
  locationEs: string;
  image: string;
  excerpt: string;
  excerptEs: string;
  body: string[];
  bodyEs: string[];
};

export function teamCopy(member: TeamMember, locale: Locale) {
  if (locale === "es") {
    return {
      role: member.roleEs,
      location: member.locationEs,
      excerpt: member.excerptEs,
      body: member.bodyEs,
    };
  }
  return {
    role: member.role,
    location: member.location,
    excerpt: member.excerpt,
    body: member.body,
  };
}

export const team: TeamMember[] = [
  {
    slug: "manuel-lezcano",
    name: "Manuel Lezcano",
    role: "Big Wave",
    roleEs: "Olas grandes",
    location: "Lanzarote",
    locationEs: "Lanzarote",
    image: "/images/team/manuel-lezcano.jpg",
    excerpt:
      "A powerful surfer, a local at heart and now also a mentor to younger generations.",
    excerptEs:
      "Un surfista potente, local de corazón y ahora también mentor de las nuevas generaciones.",
    body: [
      "Born and raised in Lanzarote, Manuel Lezcano has spent most of his life connected to the ocean.",
      "He started surfing at a very young age in Famara, following the path of his father, and grew up surfing the waves that would eventually define his life. From the reefs of La Santa to the powerful walls of El Quemao, Manuel has built his name through years of experience, commitment and an intimate understanding of Lanzarote's most demanding waves.",
      "At 20, he chose to focus his surfing on bigger waves. Since then, he has travelled the world chasing swells, while always returning to the island he calls home.",
      "A powerful surfer, a local at heart and now also a mentor to younger generations, Manuel represents something deeper than performance. His surfing is rooted in place, experience and respect for the ocean.",
      "In 2025, he became Spanish Big Wave Surfing Champion at La Vaca Gigante, adding another chapter to a career built around some of the most challenging waves in Europe.",
      "For ALAYA, Manuel represents that connection between generations, between people and place, and between the experience of those who came before and those who are still learning.",
    ],
    bodyEs: [
      "Nacido y criado en Lanzarote, Manuel Lezcano ha pasado la mayor parte de su vida unido al océano.",
      "Empezó a surfear muy joven en Famara, siguiendo el camino de su padre, y creció en las olas que acabarían definiendo su vida. Desde los reefs de La Santa hasta los muros de El Quemao, Manuel se ha hecho un nombre con años de experiencia, compromiso y un conocimiento íntimo de las olas más exigentes de Lanzarote.",
      "A los 20 decidió centrar su surf en las olas grandes. Desde entonces ha viajado el mundo persiguiendo swell, siempre volviendo a la isla que llama casa.",
      "Surfista potente, local de corazón y ahora también mentor de las nuevas generaciones, Manuel representa algo más que el rendimiento. Su surf nace del lugar, de la experiencia y del respeto al océano.",
      "En 2025 se proclamó campeón de España de Big Wave en La Vaca Gigante, otro capítulo de una carrera construida alrededor de algunas de las olas más difíciles de Europa.",
      "Para ALAYA, Manuel es esa conexión entre generaciones, entre las personas y el lugar, y entre la experiencia de quienes vinieron antes y quienes todavía están aprendiendo.",
    ],
  },
  {
    slug: "laura-coviella",
    name: "Laura Coviella",
    role: "Surfer & Filmmaker",
    roleEs: "Surfista y cineasta",
    location: "Canary Islands",
    locationEs: "Islas Canarias",
    image: "/images/team/laura-coviella.jpg",
    excerpt:
      "Independent. Curious. Committed. A new generation that rides waves and tells the story.",
    excerptEs:
      "Independiente. Curiosa. Comprometida. Una nueva generación que no solo surfea: cuenta la historia.",
    body: [
      "Laura Coviella is a Canary Island surfer, filmmaker and explorer whose surfing has been shaped by the volcanic landscapes and powerful waves of the islands.",
      "She discovered surfing at the age of eleven in Tenerife. What started almost by chance gradually became an obsession, eventually turning into a way of life. Once she got her driving licence, she began making the daily journey to the coast, chasing waves and building her own path in the water.",
      "Today, Laura is known for her commitment to powerful waves and her ability to move between completely different types of surfing — from perfect tropical lines to heavy Canarian slabs and some of the biggest waves in the world.",
      "In 2023, she became the first Spanish woman to surf the giant waves of Nazaré, Portugal. But her story goes beyond big-wave surfing. Laura is also a filmmaker and storyteller, documenting her own adventures and creating audiovisual projects that reflect the places, people and experiences behind the surfing.",
      "Her work is deeply connected to the Canary Islands. The volcanic landscape, the local community and the raw nature of the islands remain a constant source of inspiration, while her travels continue to expand her vision of surfing and exploration.",
      "For ALAYA, Laura represents a new generation of surfers who don't simply ride waves — they create their own stories, document them and share them with others.",
      "Independent. Curious. Committed.",
    ],
    bodyEs: [
      "Laura Coviella es surfista, cineasta y exploradora canaria. Su surf lo han moldeado los paisajes volcánicos y las olas potentes de las islas.",
      "Descubrió el surf a los once años en Tenerife. Lo que empezó casi por casualidad se convirtió en una obsesión y, al final, en una forma de vida. Cuando sacó el carnet, empezó a bajar cada día a la costa, buscando olas y construyendo su propio camino en el agua.",
      "Hoy se la conoce por su compromiso con las olas potentes y por moverse entre tipos de surf muy distintos: líneas tropicales, slabs canarios y algunas de las olas más grandes del mundo.",
      "En 2023 fue la primera mujer española en surfear las olas gigantes de Nazaré, Portugal. Pero su historia va más allá del big wave. Laura también es cineasta y cuenta historias: documenta sus viajes y crea proyectos audiovisuales sobre los lugares, las personas y las experiencias detrás del surf.",
      "Su trabajo está profundamente unido a Canarias. El paisaje volcánico, la comunidad local y la naturaleza cruda de las islas siguen siendo su fuente de inspiración, mientras sus viajes amplían su visión del surf y de la exploración.",
      "Para ALAYA, Laura representa a una nueva generación de surfistas que no solo montan olas: crean sus propias historias, las documentan y las comparten.",
      "Independiente. Curiosa. Comprometida.",
    ],
  },
  {
    slug: "luis-diaz",
    name: "Luis Díaz",
    role: "Performance",
    roleEs: "Performance",
    location: "Gran Canaria",
    locationEs: "Gran Canaria",
    image: "/images/team/luis-diaz.jpg",
    excerpt:
      "The connection between performance and place — shaped by Gran Canaria and its waves.",
    excerptEs:
      "La conexión entre el rendimiento y el lugar: un surfista formado por Gran Canaria y sus olas.",
    body: [
      "Luis Díaz was born and raised in Las Palmas de Gran Canaria, where the ocean quickly became more than just a place to surf — it became a way of life.",
      "He discovered surfing after being introduced to the sport as a child. Within a few years, he had left football behind and was dedicating himself completely to surfing, using La Cícer and the waves of Gran Canaria as his training ground.",
      "His talent soon took him beyond the Canary Islands. From competing internationally to winning the US Open Junior in California and representing Spain on the world stage, Luis built his career through discipline, travel and countless hours in the water.",
      "Over the years, he has become one of the most accomplished surfers of his generation in the Canary Islands. He has represented the islands and Spain in international competition, including a bronze medal at the 2017 World Championships, and has continued to compete at the highest national level.",
      "In 2025, Luis won the Open LPA Surf City in Gran Canaria, becoming that year's Pro Surf League champion.",
      "But beyond the results, Luis' surfing is deeply connected to where he comes from. Gran Canaria remains his home, his training ground and the place he returns to between journeys.",
      "For ALAYA, Luis represents the connection between performance and place — a surfer shaped by the islands, their waves and the culture that surrounds them.",
    ],
    bodyEs: [
      "Luis Díaz nació y creció en Las Palmas de Gran Canaria, donde el océano pronto dejó de ser solo un sitio para surfear y se convirtió en una forma de vida.",
      "Llegó al surf de niño. En pocos años dejó el fútbol y se dedicó por completo, usando La Cícer y las olas de Gran Canaria como su campo de entrenamiento.",
      "Su talento lo llevó más allá de las islas. De competir internacionalmente a ganar el US Open Junior en California y representar a España en el mundo, Luis construyó su carrera con disciplina, viajes e incontables horas en el agua.",
      "Con los años se ha convertido en uno de los surfistas más completos de su generación en Canarias. Ha representado a las islas y a España, incluido un bronce en el Mundial de 2017, y sigue compitiendo al más alto nivel nacional.",
      "En 2025 ganó el Open LPA Surf City en Gran Canaria y se proclamó campeón de la Pro Surf League de ese año.",
      "Más allá de los resultados, su surf está unido a su origen. Gran Canaria sigue siendo su casa, su entrenamiento y el lugar al que vuelve entre viajes.",
      "Para ALAYA, Luis es la conexión entre el rendimiento y el lugar: un surfista formado por las islas, sus olas y la cultura que las rodea.",
    ],
  },
  {
    slug: "melania-suarez",
    name: "Melania Suárez",
    role: "Performance",
    roleEs: "Performance",
    location: "Tenerife",
    locationEs: "Tenerife",
    image: "/images/team/melania-suarez.jpg",
    excerpt:
      "Powerful surfing, a sharp backhand and a generation that carries their roots with them.",
    excerptEs:
      "Un surf potente, un backhand preciso y una generación que lleva sus raíces consigo.",
    body: [
      "Born and raised in Tenerife, Melania Suárez has been surfing since the age of six. From her early days competing in the national junior circuit to becoming one of the most accomplished surfers in the Canary Islands, she has built a career defined by progression, commitment and style.",
      "A multiple Spanish junior champion, a Rip Curl GromSearch World Finalist and winner of the Iberdrola Pro League in 2023, Melania continued to raise the bar in 2025, becoming Spanish Champion and winning the PRO Iberdrola National League. She also claimed her fourth Open LPA Surf City title, cementing her connection with one of the waves where she has built part of her story.",
      "Known for her powerful surfing, sharp backhand and natural flow, Melania represents a new generation of Canary Island surfers who carry their roots with them wherever they go.",
      "For her, surfing is about pushing herself, chasing good waves, travelling and sharing the experience with the people around her. That connection to the ocean, her home and the culture that surrounds it is what makes Melania a natural part of ALAYA DIVISION.",
    ],
    bodyEs: [
      "Nacida y criada en Tenerife, Melania Suárez surfea desde los seis años. Desde sus primeros pasos en el circuito junior nacional hasta convertirse en una de las surfistas más completas de Canarias, ha construido una carrera marcada por la progresión, el compromiso y el estilo.",
      "Varias veces campeona de España junior, finalista del Rip Curl GromSearch World y ganadora de la Iberdrola Pro League en 2023, Melania volvió a subir el listón en 2025: se proclamó campeona de España y ganó la Liga Nacional PRO Iberdrola. También sumó su cuarto título del Open LPA Surf City, reforzando su conexión con una de las olas donde ha escrito parte de su historia.",
      "Conocida por un surf potente, un backhand preciso y un flow natural, Melania representa a una nueva generación de surfistas canarias que llevan sus raíces consigo allá donde van.",
      "Para ella, surfear es exigirse, buscar buenas olas, viajar y compartir la experiencia con la gente que la rodea. Esa conexión con el océano, con su casa y con la cultura que lo envuelve es lo que hace de Melania una parte natural de ALAYA DIVISION.",
    ],
  },
  {
    slug: "gabri-salazar",
    name: "Gabri Salazar",
    role: "Skate",
    roleEs: "Skate",
    location: "Spain",
    locationEs: "España",
    image: "/images/team/gabri-salazar.jpg",
    excerpt: "Stay true. Keep moving. Find your line.",
    excerptEs: "Sé fiel. Sigue en movimiento. Encuentra tu línea.",
    body: [
      "Gabri Salazar has been riding since he was a kid, growing up through the Spanish skate scene and building his own path through years of dedication, competition and countless hours on the board.",
      "Known for his powerful and fluid style, Gabri combines technical precision with a natural approach to riding. His experience has taken him through competitions across Spain and internationally, while his connection with the culture around skating has remained at the heart of what he does.",
      "From competing at the highest national level to sharing his knowledge with the next generation, Gabri represents a way of riding that goes beyond tricks and results.",
      "It is about style.",
      "About progression.",
      "About finding your own lines.",
      "For ALAYA, Gabri is part of a generation that understands that riding is not simply about what happens on the board. It is about the people you meet, the places you discover and the lifestyle that grows around it.",
      "Stay true. Keep moving. Find your line.",
    ],
    bodyEs: [
      "Gabri Salazar lleva patinando desde niño. Creció en la escena skate española y se hizo su propio camino con años de dedicación, competición e incontables horas sobre la tabla.",
      "Conocido por un estilo potente y fluido, Gabri une precisión técnica con una forma natural de patinar. Su experiencia le ha llevado a competir por España y en el extranjero, mientras la conexión con la cultura alrededor del skate sigue en el centro de lo que hace.",
      "De competir al más alto nivel nacional a compartir su conocimiento con la siguiente generación, Gabri representa una forma de patinar que va más allá de los tricks y los resultados.",
      "Se trata de estilo.",
      "De progresión.",
      "De encontrar tus propias líneas.",
      "Para ALAYA, Gabri forma parte de una generación que entiende que patinar no es solo lo que pasa sobre la tabla. Es la gente que conoces, los lugares que descubres y el estilo de vida que crece alrededor.",
      "Sé fiel. Sigue en movimiento. Encuentra tu línea.",
    ],
  },
];

export function getTeamMember(slug: string) {
  return team.find((m) => m.slug === slug);
}
