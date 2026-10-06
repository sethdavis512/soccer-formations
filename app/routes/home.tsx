import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Pitch } from "~/components/pitch";
import { StyleBadge } from "~/components/style-badge";
import { Code, CodeCompare, WhatsHappening } from "~/components/whats-happening";
import { listFormations } from "~/data/formations.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Soccer Formations: a React Router 8 static-content demo" },
    {
      name: "description",
      content: "Learn six classic soccer formations, served from a typed content module with no database.",
    },
  ];
}

export function loader() {
  const { formations, total } = listFormations();
  // Send only the three cards this page renders, not the whole catalog.
  return { featured: formations.slice(0, 3), total };
}

const WRONG = `// routes/home.tsx
import { FORMATIONS } from "~/data/formations";

export default function Home() {
  // Every formation's full write-up is now
  // bundled into the browser's JavaScript.
  return FORMATIONS.slice(0, 3).map(...);
}`;

const RIGHT = `// routes/home.tsx
import { listFormations } from "~/data/formations.server";

export function loader() {
  const { formations } = listFormations();
  return { featured: formations.slice(0, 3) };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return loaderData.featured.map(...);
}`;

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <section className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">Static content, no database</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Learn the shapes behind the beautiful game
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            {loaderData.total} classic soccer formations, each with a pitch diagram, strengths, weaknesses, and the
            teams that made them famous. Every page is served by React Router 8 loaders reading a typed content file.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/formations"
              className="rounded-lg bg-emerald-700 px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-emerald-800"
            >
              Browse formations
            </Link>
            <a
              href="#how"
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-800 hover:bg-slate-100"
            >
              How it's built
            </a>
          </div>
        </div>
        <Pitch
          name={loaderData.featured[0].name}
          positions={loaderData.featured[0].positions}
          className="mx-auto max-w-xs shadow-lg"
        />
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-slate-900">Start here</h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {loaderData.featured.map((f) => (
            <li key={f.slug}>
              <Link
                to={`/formations/${f.slug}`}
                className="group block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
              >
                <Pitch name={f.name} positions={f.positions} size="sm" />
                <div className="mt-4 flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800">{f.name}</h3>
                  <StyleBadge style={f.style} />
                </div>
                <p className="mt-1 text-sm text-slate-700">{f.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <WhatsHappening id="how">
        <p>
          There's no database. All six formations live in <Code>app/data/formations.server.ts</Code>, a plain typed
          array. The <Code>.server.ts</Code> suffix tells React Router this module may only run on the server, so the
          build fails if a component imports it directly.
        </p>
        <p>
          Each route's <Code>loader</Code> calls a small function like <Code>listFormations()</Code> and returns only
          what that page needs. Components read it from <Code>loaderData</Code>, fully typed through{" "}
          <Code>./+types/&lt;route&gt;</Code>. Swapping the array for a CMS or database later changes one file, not
          every page.
        </p>
        <CodeCompare
          wrongNote="import content in the component"
          rightNote="load it on the server"
          wrong={WRONG}
          right={RIGHT}
        />
      </WhatsHappening>
    </>
  );
}
