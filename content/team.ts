export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  location: string;
  image: string;
  excerpt: string;
  body: string[];
};

export const team: TeamMember[] = [
  {
    slug: "manuel-lezcano",
    name: "Manuel Lezcano",
    role: "Big Wave",
    location: "Lanzarote",
    image: "/images/team/manuel-lezcano.jpg",
    excerpt:
      "A powerful surfer, a local at heart and now also a mentor to younger generations.",
    body: [
      "Born and raised in Lanzarote, Manuel Lezcano has spent most of his life connected to the ocean.",
      "He started surfing at a very young age in Famara, following the path of his father, and grew up surfing the waves that would eventually define his life. From the reefs of La Santa to the powerful walls of El Quemao, Manuel has built his name through years of experience, commitment and an intimate understanding of Lanzarote's most demanding waves.",
      "At 20, he chose to focus his surfing on bigger waves. Since then, he has travelled the world chasing swells, while always returning to the island he calls home.",
      "A powerful surfer, a local at heart and now also a mentor to younger generations, Manuel represents something deeper than performance. His surfing is rooted in place, experience and respect for the ocean.",
      "In 2025, he became Spanish Big Wave Surfing Champion at La Vaca Gigante, adding another chapter to a career built around some of the most challenging waves in Europe.",
      "For ALAYA, Manuel represents that connection between generations, between people and place, and between the experience of those who came before and those who are still learning.",
    ],
  },
  {
    slug: "laura-coviella",
    name: "Laura Coviella",
    role: "Surfer & Filmmaker",
    location: "Canary Islands",
    image: "/images/team/laura-coviella.jpg",
    excerpt:
      "Independent. Curious. Committed. A new generation that rides waves and tells the story.",
    body: [
      "Laura Coviella is a Canary Island surfer, filmmaker and explorer whose surfing has been shaped by the volcanic landscapes and powerful waves of the islands.",
      "She discovered surfing at the age of eleven in Tenerife. What started almost by chance gradually became an obsession, eventually turning into a way of life. Once she got her driving licence, she began making the daily journey to the coast, chasing waves and building her own path in the water.",
      "Today, Laura is known for her commitment to powerful waves and her ability to move between completely different types of surfing — from perfect tropical lines to heavy Canarian slabs and some of the biggest waves in the world.",
      "In 2023, she became the first Spanish woman to surf the giant waves of Nazaré, Portugal. But her story goes beyond big-wave surfing. Laura is also a filmmaker and storyteller, documenting her own adventures and creating audiovisual projects that reflect the places, people and experiences behind the surfing.",
      "Her work is deeply connected to the Canary Islands. The volcanic landscape, the local community and the raw nature of the islands remain a constant source of inspiration, while her travels continue to expand her vision of surfing and exploration.",
      "For ALAYA, Laura represents a new generation of surfers who don't simply ride waves — they create their own stories, document them and share them with others.",
      "Independent. Curious. Committed.",
    ],
  },
  {
    slug: "luis-diaz",
    name: "Luis Díaz",
    role: "Performance",
    location: "Gran Canaria",
    image: "/images/team/luis-diaz.jpg",
    excerpt:
      "The connection between performance and place — shaped by Gran Canaria and its waves.",
    body: [
      "Luis Díaz was born and raised in Las Palmas de Gran Canaria, where the ocean quickly became more than just a place to surf — it became a way of life.",
      "He discovered surfing after being introduced to the sport as a child. Within a few years, he had left football behind and was dedicating himself completely to surfing, using La Cícer and the waves of Gran Canaria as his training ground.",
      "His talent soon took him beyond the Canary Islands. From competing internationally to winning the US Open Junior in California and representing Spain on the world stage, Luis built his career through discipline, travel and countless hours in the water.",
      "Over the years, he has become one of the most accomplished surfers of his generation in the Canary Islands. He has represented the islands and Spain in international competition, including a bronze medal at the 2017 World Championships, and has continued to compete at the highest national level.",
      "In 2025, Luis won the Open LPA Surf City in Gran Canaria, becoming that year's Pro Surf League champion.",
      "But beyond the results, Luis' surfing is deeply connected to where he comes from. Gran Canaria remains his home, his training ground and the place he returns to between journeys.",
      "For ALAYA, Luis represents the connection between performance and place — a surfer shaped by the islands, their waves and the culture that surrounds them.",
    ],
  },
];

export function getTeamMember(slug: string) {
  return team.find((m) => m.slug === slug);
}
