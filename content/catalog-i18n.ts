import type { Locale } from "@/lib/i18n";
import type { Board } from "./boards";
import type { Shaper } from "./shapers";

export type BoardLocaleCopy = {
  description: string;
  category: string;
  dimensions: string;
  wave?: string;
  rider?: string;
  rocker?: string;
  rails?: string;
  bottom?: string;
  fins?: string;
  body?: string;
  sizing?: string;
};

export type ShaperLocaleCopy = {
  role: string;
  location: string;
  bio: string;
  promodels: { name: string; description: string }[];
};

type BoardEn = Partial<
  Pick<
    BoardLocaleCopy,
    | "description"
    | "category"
    | "dimensions"
    | "wave"
    | "rider"
    | "rocker"
    | "rails"
    | "bottom"
    | "fins"
    | "body"
    | "sizing"
  >
>;

const categoryEn: Record<string, string> = {
  "Custom Order": "Custom Order",
};

const categoryEs: Record<string, string> = {
  "Custom Order": "Pedido a medida",
};

const dimensionsEn: Record<string, string> = {
  "A medida": "Custom",
};

const boardEn: Record<string, BoardEn> = {
  "flying-hippie": {
    description:
      "Retro pushed toward performance: easy speed and a rail that still wants curve.",
    wave: "Knee to head-high and a bit more. Beach, reef or point.",
    rider:
      "Coming from a shortboard and wanting a different attitude, without losing the rail. Intermediate to advanced.",
    rocker: "Low entry and flat through the rest: easy paddle and natural speed.",
    rails: "Medium, slightly down, with a tucked hard edge for hold and feel.",
    bottom: "Single to deep double and vee: lift, speed and control in the pocket.",
    fins: "Five-fin as standard (twin, thruster or quad). Twonzer on request.",
    body: "The Flying Hippie brings a retro vibe to a modern shortboard. Volume stays under the chest for paddle, the nose and tail are refined so it responds, and a little extra entry rocker helps you get into the pocket and hold more vertical sections. It is the team board when the performance grind feels tight and you still want rail or lip.\n\nBook it with Roberts: dims, fins and glass to how you surf.",
    sizing:
      "For everyday, 2–4\" under your height and ~1 L more than your good-wave board. More cruiser: at your height or above. Versus a pro model, 5–7\" shorter, 1\" wider and a little more thickness.",
  },
  wd3: {
    description:
      "The Diamond tuned for grovel: it catches slop and still surfs like a White Diamond.",
    wave: "Knee to shoulder. Weak to a little punchy.",
    rider:
      "If you already know the WD and want more range down low. Small-wave performance, intermediate to advanced.",
    rocker:
      "Low in the tail for speed; a flip in the last 8\" of the nose for vertical in the pocket.",
    rails: "Full, with a tucked hard edge: stability and speed in small surf.",
    bottom: "Single to double and a soft vee: speed, control and release up top.",
    fins: "Five boxes. Twin + trailer, thruster or quad.",
    body: "The original White Diamond set the small-wave performance mark. The WD2 raised the wave ceiling; the WD3 works the floor: wider nose and tail, more surface, the same rocker. It catches smaller waves and crosses flats without losing the Diamond feel.\n\nIf the photos look like other Roberts shortboards, here is the difference: it is not a soft groveler or a serious-swell HP. It is the Diamond when the swell does not show up.",
    sizing:
      "Same dims as the original WD if you want the same feel in smaller waves. As a groveler next to a WD2: 1\" shorter. Versus a pro model: 5–6\" shorter, 1\" wider, same thickness.",
  },
  dreamcatcher: {
    description:
      "The versatile Roberts: generous paddle, thumb tail and a range from knee-high to overhead.",
    wave: "Knee to a few feet overhead. Flat face to hollow. Beach, reef or point.",
    rider:
      "All levels depending on volume. The all-around of the quiver, and a tube when the tail bites.",
    rocker:
      "Moderate, with a soft flip in the nose: speed without extra paddle and less pearling.",
    rails: "Medium to full, tucked hard edge for hold and speed.",
    bottom: "Single to double: it controls the speed the outline makes.",
    fins: "Five-fin as standard. Thruster or single + sidebites on request.",
    body: "Foam through the blank to catch a lot of waves, moderate rocker for everyday, and a tucked thumb tail that holds in more serious swell and in tight turns. That is why it covers so much: full rails and nose when the surf is messy; tail and concave when the wave gets steep.\n\nNot a classic mid of endless trim, and not a pure HP. It is the Roberts daily if the swell changes every hour.",
    sizing:
      "Versus a WD / WD2: 1\" longer, same thickness or a little more volume. Up to 1/2\" narrower if you want more feel. Versus a pro model: 1–4\" shorter, up to 5/8\" wider. HP approach: at your height or 3–4\" under.",
  },
  "dream-machine": {
    description:
      "Short, wide groveler for flat waves: the daily for small beach and point.",
    wave: "Flat and slow waves. Any beach or point.",
    rider:
      "Small-to-medium daily. Usually 7–8\" under a standard shortboard, or 3–4\" under a White Diamond.",
    rocker: "Very low through the blank, with a soft flip in the nose.",
    rails:
      "Medium-full to float; tucked hard edge for speed and hold; softer in the front third.",
    bottom: "Single to deep double in the tail.",
    fins: "Five-fin as standard (thruster or quad). Single as an extra.",
    body: "Shorter and wider than a performance shortboard. It is not looking for a critical barrel: it wants less paddle, plane on a weak face and not die in the flat. Low rocker and width do the work; the tail concave keeps it from feeling like a brick.\n\nNext to a WD3 the quiver makes sense: the WD3 is still a Diamond; the Dream Machine is a pure groveler. The photos look alike; the use does not.",
    sizing:
      "Rail-to-rail grovel: 7\" shorter than your pro model, or 5–7\" under your height, with 3–5 L extra. Cruiser: longer and wider up to ~10 L more than your good-wave board.",
  },
  gsd: {
    description:
      "High performance for punchy swell. Rocker and pocket run the show.",
    wave: "Shoulder to double overhead. Punch and vertical. Beach, point or reef.",
    rider:
      "A performance surfer who travels or waits for real swell. Not the summer daily.",
    rocker:
      "Plenty of rocker through the blank to get into a vertical face and a critical section.",
    rails: "Medium to slightly pinched.",
    bottom: "Single to a marked double in the tail.",
    fins: "Thruster as standard. Five-fin optional; the quad works in a fast hollow.",
    body: "It comes from the G Step Up: more curve to fit a hollow, steep wave. If the Dream Machine or WD3 live in slop, the GSD is the other end of the Roberts catalogue. Shortboard photos look alike; the rocker does not.\n\nA travel board when the swell has bone. Custom dims in a booking: Roberts does not publish a fixed stock grid like the grovelers.",
    sizing:
      "Ordered to measure by weight, level and the swell you are going to. In the booking we tune length, liters and fin setup.",
  },
  "modern-mid": {
    description:
      "Between a mid and a Dreamcatcher: mid paddle, a more sensitive rail.",
    wave: "Knee to overhead. Beach, point or reef.",
    rider:
      "If you want mid flow without a longboard. In higher volumes: lighter riders, newer surfers, or anyone who wants to paddle without a fight.",
    rocker: "Low to moderate, with a soft flip in the nose.",
    rails: "Medium refined, tucked hard edge: feel and hold.",
    bottom: "Single to double, rounded pin tail inherited from the Dreamcatcher.",
    fins: "Boxes for single, single + sidebites or thruster, plus two extra boxes for twin or bonzer.",
    body: "Forward wide point and a curved outline: you paddle like a mid, but the nose is a little wider and thinner than the Dreamcatcher to drop swing weight. Refined rails and a rocker meant to put the rail in, not just trim.\n\nThe fin setup is what sets it apart: it is not just a longer mid. In the booking you decide single, thruster or twin.",
    sizing:
      "Performance feel + flow: about 4–8\" over your height. More classic mid: 8–12\" over (the sweet spot is often +10\").",
  },
  "army-knife": {
    description:
      "The quiver knife: straight-line speed and a tail that still turns.",
    wave: "Knee to a couple of feet overhead.",
    rider:
      "If you do not want to choose between groveler and shortboard. The everyday multi-tool.",
    rocker: "Moderate to low: speed comes quick and it holds it in the flat.",
    rails: "Medium, apex a little lower for hold.",
    bottom: "Deep single in the middle to double in the tail.",
    fins: "Five-fin as standard. Thruster or quad.",
    body: "Pieces of several Roberts models: straighter rocker and rail in a 3DF style to go fast down the line; a White Diamond nose; Modern 80s hips that pivot and cut the tail; a Black Diamond tail block for feel. Not a fat-swell HP and not a wide groveler: it sits in the middle on purpose.\n\nIf the photos look like other shortboards in the line, look at the outline: the hips and the tucked tail are the cut.",
    sizing:
      "Versus a pro model: 5–6\" shorter, 1\" wider, same thickness. HP approach: 1–4\" under your height. More stable: at your height or above, with more liters.",
  },
  "fun-1": {
    description:
      "First board, funboard or one-board: easy to paddle and it still turns.",
    wave: "Knee to overhead and a bit more.",
    rider:
      "A beginner who wants to progress, anyone looking for a longboard alternative, or an advanced surfer who wants more waves.",
    rocker:
      "Not the flat rocker of a typical funboard: a soft flip in the nose, moderate through the center, a light flip in the tail.",
    rails:
      "Medium — not full — to stabilize and still let light or advanced riders turn.",
    bottom: "Single in the entry to double in the tail. A slightly tucked squash.",
    fins: "Five-fin as standard (thruster or quad). Single + sidebites on request.",
    body: "Roberts has been tuning it for years so it does not sit as a flat mini-longboard: that in-between rocker avoids pearling and hang-ups, and lets you apply rail as the level goes up. Fuller nose to paddle; squash tail so it does not drag.\n\nDepending how you size it, it is a school board or a mid an advanced surfer can rip. The Modern Mid leans more performance; the Fun 1 is the most open board in the catalogue.",
    sizing:
      "Beginner: by weight on the grid, or a little longer if you want easier paddle. Advanced: shorter than your height with more liters than a shortboard, or several inches over for a rippable mid.",
  },
  floaty: {
    description:
      "Wide and full of liters, but fast. The groveler when you really want to float.",
    wave: "Flat or slow faces. Summer slop.",
    rider:
      "If you are moving down in length and still need easy paddle. Also a groveler for heavier surfers or groms. You can learn on it.",
    rocker: "Low for paddle and speed; a soft flip in the nose so you do not pearl the drop.",
    rails:
      "Soft up front, harder in the back, refined: it forgives and still lets light riders turn.",
    bottom: "Single to double and vee in the tail.",
    fins: "Five-fin (twin, twin + trailer, thruster or quad).",
    body: "Not a softboard. A wide outline from nose to tail to paddle and stay stable; refined rails so it does not feel dead. The Dream Machine is a more performance, shorter groveler; the Floaty is the small-wave tank: more liters, more forgiveness, still turns.\n\nOver 6' it goes custom.",
    sizing:
      "Progressing novice: at your height or +2\". Rail-to-rail grovel: 6\" shorter than the pro model, or 4–6\" under your height, with 3–5 L extra. Cruiser: ~10 L more than your good-wave board.",
  },
  "bro-fish": {
    description:
      "Beak fish, liters under the chest and a swallow: classic glide, today's carve.",
    wave: "Knee to head-high and a bit more. Beach, reef or point.",
    rider:
      "If you want a real fish (speed and flow) and still be able to push the rail. Loose twin or Twonzer with more hold.",
    rocker: "Low, flat entry: easy paddle and speed.",
    rails: "Medium, slightly down, tucked hard edge.",
    bottom: "Single to deep double and vee: lift and control in the pocket.",
    fins: "Twonzer as standard. Loose twin or Roberts Twonzer for hold at more speed.",
    body: "Beak, foam under the chest and a wide swallow: it reads as a fish of always. The tail has more curve and the bottom more work than a classic fish, so you can carve the pocket as well as an open face. A pure twin can slip; the Twonzer keeps the speed and holds the rail.\n\nThe Flying Hippie is the more performance step in this family. The Bro Fish is the origin: more fish, more glide.",
    sizing:
      "3–5\" under your height and ~2 L more than your good-wave board. More cruiser: over your height. Versus a pro model: 6–8\" shorter, 1 1/2\" wider and a little more thickness (~2 L extra).",
  },
  mayhem: {
    description: "Short performance with a clean rail. Shoulder to overhead.",
  },
  db: {
    description: "Everyday shortboard: classic outline, contained rocker.",
  },
  "two-zero": {
    description: "Diamond disc: short swallow, five-fin and a loose tail.",
  },
  "modern-vd": {
    description:
      "Contemporary fish with splash and a loose tail for speed on beach break.",
  },
  choice: {
    description: "Line pro model: quick response and a precise rail.",
  },
  anything: {
    description: "All-rounder: one outline for the weekly grind.",
  },
  "pick-rat": {
    description: "Compact swallow: easy speed and short turns.",
  },
  bdt: {
    description: "Colour fish: glide and an open tail for beach break.",
  },
  "the-ill": {
    description: "Mid with a fade and a long outline: paddle and flow.",
  },
  rivera: {
    description: "Classic mid, stringer on show, for point and long swell.",
  },
  monks: {
    description: "Performance with a blue V: pocket and rail.",
  },
  "modern-80s": {
    description: "Neon graphic, period rocker and a current rail.",
  },
  vlad: {
    description: "Resin swallow: speed and a loose tail.",
  },
  "t-33": {
    description: "Pro-Lite: everyday performance with a competition pad and glass.",
  },
  "more-diamonds": {
    description: "Classic outline, More Diamonds fins and a clean rail.",
  },
  "the-lip": {
    description: "Shortboard for a vertical section and the lip.",
  },
  bfeet: {
    description: "Black stringer through the blank: drive and hold.",
  },
  ras: {
    description: "Shortboard with a blue block and pad: everyday beach break.",
  },
  retet: {
    description: "Performance with hex and five-fin.",
  },
  "mayhem-stripe": {
    description: "Mayhem with a striped rail: punch and pocket.",
  },
  "choice-neon": {
    description: "Choice in yellow: quick response and a precise rail.",
  },
  "bdt-swallow": {
    description: "BDT swallow, orange fins and an open tail.",
  },
  "pick-rat-swallow": {
    description: "Compact Pick Rat: easy speed and short turns.",
  },
  "ill-fade": {
    description: "The iLL with a fade in the tail: paddle and flow.",
  },
  "monks-shield": {
    description: "Monks: performance with a shield and a carbon rail.",
  },
  "modern-vd-ink": {
    description: "Modern V.D. ink: contemporary fish for beach break.",
  },
  "modern-80s-fade": {
    description: "Modern 80s fade: neon graphic and a current rail.",
  },
  "gsd-ink": {
    description: "GSD ink: high performance for punchy swell.",
  },
  "two-zero-classic": {
    description: "Classic Two Zero: triangle logo and a loose tail.",
  },
  "dream-machine-white": {
    description: "Dream Machine in white: summer groveler.",
  },
  "resin-fish": {
    description: "Orange resin fish: glide and a swallow tail.",
  },
  "red-resin": {
    description: "Red resin fish: speed on beach break.",
  },
  "blue-fade": {
    description: "Shortboard with a blue wash in the tail.",
  },
  "blue-mist": {
    description: "Shortboard with a blue splash and a clean rail.",
  },
  "green-band": {
    description: "Shortboard with green and grey bands.",
  },
  "grey-blue": {
    description: "Grey shortboard with a blue splash in the tail.",
  },
  "orange-mark": {
    description: "White shortboard, orange logo.",
  },
  hex: {
    description: "Shortboard with a carbon tail and blue fins.",
  },
  "carbon-tail": {
    description: "Shortboard with carbon panels in the tail.",
  },
  "carbon-rail": {
    description: "Mid with a carbon rail and a classic outline.",
  },
  "black-block": {
    description: "Shortboard with a black block in the tail.",
  },
  checker: {
    description: "Orange and grey checkered shortboard.",
  },
  "orange-rail": {
    description: "White shortboard with an orange rail.",
  },
  "red-rail": {
    description: "Shortboard with a red rail and red fins.",
  },
  "red-mark": {
    description: "White shortboard, red logo and fins.",
  },
  "blue-mark": {
    description: "White shortboard, blue logo and a soft swallow.",
  },
  "blue-outline": {
    description: "Shortboard with an outlined logo and blue fins.",
  },
  mr50: {
    description: "Compact swallow for speed in small waves.",
  },
  "white-daily": {
    description: "White line shortboard: clean rail and five-fin.",
  },
  "red-swallow": {
    description: "Swallow with a red logo and an open tail.",
  },
  "blue-chevron": {
    description: "Shortboard with a blue chevron on the deck.",
  },
  "ara-mid": {
    description:
      "Atlantic versatility: easy paddle, clean trim and enough performance for modern manoeuvres.",
  },
  "mp-hyper": {
    description:
      "Performance board for riders who want instant response and control on powerful beach breaks.",
  },
  "rb-keel": {
    description: "Classic glide with keels. Maximum fun in small and medium waves.",
  },
  "dyn-aspen": {
    description:
      "The balanced daily board: smart volume, sensitive rails and a clean release.",
  },
  "alaya-custom": {
    description:
      "A 100% custom project with the Alaya team. From the blank to the glass, every decision is yours.",
  },
  "ap-round": {
    description:
      "Performance shortboard with a sensitive rail and a clean release. Patterson precision.",
  },
  "ara-step": {
    description:
      "Controlled volume for serious swell. Extra paddle without losing response.",
  },
  "mp-groveler": {
    description: "More volume, more fun in small waves. The summer daily driver.",
  },
  "rb-modern": {
    description:
      "Contemporary hybrid for every kind of spot. Roberds line with attitude.",
  },
  "dyn-twin": {
    description: "Twin with a pin for speed and control on long walls.",
  },
  "alaya-step": {
    description: "Custom size for serious swell. Brief it with the Alaya team.",
  },
};

const shaperEn: Record<
  string,
  {
    role: string;
    location: string;
    bio: string;
    promodels: Record<string, string>;
  }
> = {
  patterson: {
    role: "Master Shaper",
    location: "California / Canary Islands",
    bio: "Decades of experience shaping high-performance boards. His work with Alaya combines classic precision with a local feel for Atlantic waves.",
    promodels: {
      "AP Twin": "High-drive fish for shoulder to overhead waves.",
      "AP Round Pin":
        "Performance shortboard with a sensitive rail and a clean release.",
    },
  },
  arakawa: {
    role: "Shaper",
    location: "Hawaii",
    bio: "A promodel line inspired by Hawaiian power surfing: controlled rockers, clean outlines and instant response under the foot.",
    promodels: {
      "ARA Mid": "Versatile mid-length for average days and clean faces.",
      "ARA Step-Up": "Controlled volume for serious swell.",
    },
  },
  "mark-phipps": {
    role: "Shaper",
    location: "Australia",
    bio: "Contemporary Australian aesthetic: progressive outlines, smart foam placement and boards made for demanding riders.",
    promodels: {
      "MP Hyper": "Aggressive shortboard for powerful beach breaks.",
      "MP Groveler": "More volume, more fun in small waves.",
    },
  },
  roberds: {
    role: "Shaper",
    location: "Ventura, USA",
    bio: "The Roberts line at Alaya during his stay: diamonds, grovelers, fish and mids. Every model is set in a booking — dims, glass and setup.",
    promodels: {
      "Flying Hippie": "Retro with a modern response and five-fin.",
      Dreamcatcher: "All-around with generous paddle and long trim.",
      GSD: "High performance for a powerful beach break.",
    },
  },
  dylan: {
    role: "Shaper",
    location: "Europe",
    bio: "A new generation of shaping: controlled experiment, premium finish and attention to detail at every stage of the Alaya process.",
    promodels: {
      "DYN Aspen": "Balanced daily board for steady progression.",
      "DYN Twin Pin": "Twin with a pin for speed and control on long walls.",
    },
  },
};

export function boardCopy(board: Board, locale: Locale): BoardLocaleCopy {
  if (locale !== "en") {
    return {
      description: board.description,
      category: categoryEs[board.category] ?? board.category,
      dimensions: board.dimensions,
      wave: board.wave,
      rider: board.rider,
      rocker: board.rocker,
      rails: board.rails,
      bottom: board.bottom,
      fins: board.fins,
      body: board.body,
      sizing: board.sizing,
    };
  }
  const en = boardEn[board.slug] ?? {};
  return {
    description: en.description ?? board.description,
    category: en.category ?? categoryEn[board.category] ?? board.category,
    dimensions: en.dimensions ?? dimensionsEn[board.dimensions] ?? board.dimensions,
    wave: en.wave ?? board.wave,
    rider: en.rider ?? board.rider,
    rocker: en.rocker ?? board.rocker,
    rails: en.rails ?? board.rails,
    bottom: en.bottom ?? board.bottom,
    fins: en.fins ?? board.fins,
    body: en.body ?? board.body,
    sizing: en.sizing ?? board.sizing,
  };
}

export function shaperCopy(shaper: Shaper, locale: Locale): ShaperLocaleCopy {
  if (locale !== "en") {
    return {
      role: shaper.role,
      location: shaper.location,
      bio: shaper.bio,
      promodels: shaper.promodels,
    };
  }
  const en = shaperEn[shaper.slug];
  return {
    role: en?.role ?? shaper.role,
    location: en?.location ?? shaper.location,
    bio: en?.bio ?? shaper.bio,
    promodels: shaper.promodels.map((model) => ({
      name: model.name,
      description: en?.promodels[model.name] ?? model.description,
    })),
  };
}
