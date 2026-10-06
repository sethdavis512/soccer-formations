// Static content lives here instead of a database. The `.server.ts` suffix
// keeps this module (and every formation's full write-up) out of the client
// bundle: only what a loader returns ever reaches the browser.

export const STYLES = ["attacking", "balanced", "defensive"] as const;
export type Style = (typeof STYLES)[number];

export type Position = {
  role: string;
  // 0-100 across the pitch, left to right.
  x: number;
  // 0-100 up the pitch, own goal to opponent's goal.
  y: number;
};

export type Formation = {
  slug: string;
  name: string;
  style: Style;
  tagline: string;
  summary: string;
  positions: Position[];
  strengths: string[];
  weaknesses: string[];
  famousTeams: string[];
};

export type FormationSummary = Pick<Formation, "slug" | "name" | "style" | "tagline" | "positions">;

const GK: Position = { role: "GK", x: 50, y: 5 };
const BACK_FOUR: Position[] = [
  { role: "LB", x: 15, y: 25 },
  { role: "CB", x: 37, y: 20 },
  { role: "CB", x: 63, y: 20 },
  { role: "RB", x: 85, y: 25 },
];
const BACK_THREE: Position[] = [
  { role: "CB", x: 27, y: 21 },
  { role: "CB", x: 50, y: 18 },
  { role: "CB", x: 73, y: 21 },
];

const FORMATIONS: Formation[] = [
  {
    slug: "4-3-3",
    name: "4-3-3",
    style: "attacking",
    tagline: "Width up front, control in the middle.",
    summary:
      "Three forwards stretch the back line while a midfield three keeps the ball moving. Wingers pin full-backs, the striker occupies both center-backs, and the holding midfielder links defense to attack.",
    positions: [
      GK,
      ...BACK_FOUR,
      { role: "CM", x: 28, y: 50 },
      { role: "DM", x: 50, y: 40 },
      { role: "CM", x: 72, y: 50 },
      { role: "LW", x: 17, y: 78 },
      { role: "ST", x: 50, y: 86 },
      { role: "RW", x: 83, y: 78 },
    ],
    strengths: [
      "Natural triangles all over the pitch for short passing",
      "Wingers create one-on-ones against full-backs",
      "High press is easy to organize from the front three",
    ],
    weaknesses: [
      "The lone holding midfielder can be overrun on the counter",
      "Full-backs must cover huge distances to support the wingers",
    ],
    famousTeams: ["Barcelona under Pep Guardiola (2008-2012)", "Liverpool under Jürgen Klopp (2017-2020)"],
  },
  {
    slug: "4-4-2",
    name: "4-4-2",
    style: "balanced",
    tagline: "Two banks of four, two up top.",
    summary:
      "The classic shape: two compact lines of four defend the width of the pitch while a strike partnership works off each other. Simple roles make it easy to learn and hard to break down.",
    positions: [
      GK,
      ...BACK_FOUR,
      { role: "LM", x: 15, y: 52 },
      { role: "CM", x: 38, y: 47 },
      { role: "CM", x: 62, y: 47 },
      { role: "RM", x: 85, y: 52 },
      { role: "ST", x: 40, y: 82 },
      { role: "ST", x: 60, y: 82 },
    ],
    strengths: [
      "Every zone of the pitch has a clear owner",
      "Two strikers can press both center-backs",
      "Compact defensive block that is hard to play through",
    ],
    weaknesses: [
      "Two central midfielders can be outnumbered by a midfield three",
      "Space between the lines for a clever No. 10 to exploit",
    ],
    famousTeams: ["Manchester United under Sir Alex Ferguson (1998-99)", "Atlético Madrid under Diego Simeone"],
  },
  {
    slug: "4-2-3-1",
    name: "4-2-3-1",
    style: "balanced",
    tagline: "A double pivot shields a creative No. 10.",
    summary:
      "Two holding midfielders give the defense a screen, freeing an attacking midfielder and two wide players to support a lone striker. It shifts into a 4-4-1-1 without the ball.",
    positions: [
      GK,
      ...BACK_FOUR,
      { role: "DM", x: 38, y: 40 },
      { role: "DM", x: 62, y: 40 },
      { role: "LAM", x: 18, y: 66 },
      { role: "CAM", x: 50, y: 64 },
      { role: "RAM", x: 82, y: 66 },
      { role: "ST", x: 50, y: 86 },
    ],
    strengths: [
      "Double pivot protects the back four against counters",
      "The No. 10 gets space to create between the lines",
      "Flexible: easily becomes 4-4-1-1 or 4-3-3",
    ],
    weaknesses: [
      "Lone striker can get isolated",
      "Depends heavily on the creativity of the No. 10",
    ],
    famousTeams: ["Real Madrid under José Mourinho (2010-2013)", "Germany at the 2014 World Cup"],
  },
  {
    slug: "4-1-2-1-2",
    name: "4-1-2-1-2 (Diamond)",
    style: "balanced",
    tagline: "Own the middle, then strike in pairs.",
    summary:
      "A midfield diamond floods the center: a deep playmaker at the base, two shuttlers, and a No. 10 at the tip feeding two strikers. Width comes almost entirely from the full-backs.",
    positions: [
      GK,
      ...BACK_FOUR,
      { role: "DM", x: 50, y: 38 },
      { role: "CM", x: 30, y: 52 },
      { role: "CM", x: 70, y: 52 },
      { role: "CAM", x: 50, y: 66 },
      { role: "ST", x: 38, y: 84 },
      { role: "ST", x: 62, y: 84 },
    ],
    strengths: [
      "Numerical superiority in central midfield",
      "Short distances between players for quick combinations",
      "Two strikers plus a No. 10 crowd the penalty area",
    ],
    weaknesses: [
      "Very little natural width",
      "Full-backs are exposed when they push forward",
    ],
    famousTeams: ["AC Milan under Carlo Ancelotti (2003-2007)"],
  },
  {
    slug: "3-5-2",
    name: "3-5-2",
    style: "defensive",
    tagline: "Three center-backs, wing-backs on the rails.",
    summary:
      "Three center-backs give cover against two strikers, and wing-backs provide all the width. Without the ball the wing-backs drop in and it becomes a solid 5-3-2.",
    positions: [
      GK,
      ...BACK_THREE,
      { role: "LWB", x: 9, y: 50 },
      { role: "CM", x: 32, y: 50 },
      { role: "DM", x: 50, y: 41 },
      { role: "CM", x: 68, y: 50 },
      { role: "RWB", x: 91, y: 50 },
      { role: "ST", x: 40, y: 82 },
      { role: "ST", x: 60, y: 82 },
    ],
    strengths: [
      "Always a spare center-back against two strikers",
      "Drops into a five-man defensive line instantly",
      "Strong central midfield trio",
    ],
    weaknesses: [
      "Wing-backs need elite stamina",
      "Space behind the wing-backs is a target for counters",
    ],
    famousTeams: ["Juventus under Antonio Conte (2011-2014)", "Italy at Euro 2016"],
  },
  {
    slug: "3-4-3",
    name: "3-4-3",
    style: "attacking",
    tagline: "Five attackers, three defenders, no hiding.",
    summary:
      "A back three supports two central midfielders and two wing-backs, with a front three of a striker and two inside forwards. When it works, five players attack the box.",
    positions: [
      GK,
      ...BACK_THREE,
      { role: "LWB", x: 11, y: 52 },
      { role: "CM", x: 38, y: 46 },
      { role: "CM", x: 62, y: 46 },
      { role: "RWB", x: 89, y: 52 },
      { role: "LW", x: 24, y: 78 },
      { role: "ST", x: 50, y: 86 },
      { role: "RW", x: 76, y: 78 },
    ],
    strengths: [
      "Up to five players in attack",
      "Inside forwards overload the half-spaces",
      "Wide center-backs can step into midfield",
    ],
    weaknesses: [
      "Only two central midfielders to protect the defense",
      "Demands disciplined wing-backs in both directions",
    ],
    famousTeams: ["Chelsea under Antonio Conte (2016-17)"],
  },
];

const toSummary = ({ slug, name, style, tagline, positions }: Formation): FormationSummary => ({
  slug,
  name,
  style,
  tagline,
  positions,
});

export function listFormations(filters: { q?: string; style?: Style } = {}) {
  const q = filters.q?.toLowerCase();
  const matches = FORMATIONS.filter(
    (f) =>
      (!filters.style || f.style === filters.style) &&
      (!q || [f.name, f.tagline, f.summary].some((text) => text.toLowerCase().includes(q))),
  );
  return { formations: matches.map(toSummary), total: FORMATIONS.length };
}

export function getFormation(slug: string): Formation | undefined {
  return FORMATIONS.find((f) => f.slug === slug);
}
