import { data, Link } from "react-router";
import type { Route } from "./+types/formation";
import { Pitch } from "~/components/pitch";
import { StyleBadge } from "~/components/style-badge";
import { Code, WhatsHappening } from "~/components/whats-happening";
import { getFormation } from "~/data/formations.server";

export function loader({ params }: Route.LoaderArgs) {
  const formation = getFormation(params.slug);
  // A real 404 status (not a 200 with "not found" text) so crawlers and
  // link checkers see the missing page; the root ErrorBoundary renders it.
  if (!formation) throw data("Formation not found", { status: 404 });
  return { formation };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [{ title: "Formation not found" }];
  const { formation } = loaderData;
  return [
    { title: `${formation.name}: ${formation.tagline}` },
    { name: "description", content: formation.summary },
  ];
}

export default function FormationPage({ loaderData }: Route.ComponentProps) {
  const { formation } = loaderData;

  return (
    <>
      <Link to="/formations" className="text-sm font-medium text-emerald-800 underline underline-offset-2">
        ← All formations
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,20rem)_1fr]">
        <Pitch name={formation.name} positions={formation.positions} className="mx-auto max-w-xs shadow-lg md:mx-0" />

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{formation.name}</h1>
            <StyleBadge style={formation.style} />
          </div>
          <p className="mt-2 text-lg font-medium text-slate-800">{formation.tagline}</p>
          <p className="mt-4 leading-relaxed text-slate-700">{formation.summary}</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <section>
              <h2 className="font-bold text-emerald-800">Strengths</h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-700">
                {formation.strengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-bold text-rose-800">Weaknesses</h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-700">
                {formation.weaknesses.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-8">
            <h2 className="font-bold text-slate-900">Made famous by</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {formation.famousTeams.map((t) => (
                <li key={t} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800">
                  {t}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <WhatsHappening>
        <p>
          This page is one route, <Code>formations/:slug</Code>. Its loader looks the slug up in the content module and
          returns the full formation, so the long write-ups only load on the page that shows them.
        </p>
        <p>
          An unknown slug throws <Code>data("Formation not found", {"{ status: 404 }"})</Code>. React Router sends a real
          404 status and renders the root <Code>ErrorBoundary</Code>. Try{" "}
          <Link to="/formations/2-3-5" className="font-medium text-emerald-800 underline underline-offset-2">
            /formations/2-3-5
          </Link>
          .
        </p>
        <p>
          <Code>meta</Code> reads <Code>loaderData</Code> (not the deprecated <Code>data</Code> argument) and handles
          the 404 case, where there is no loader data.
        </p>
      </WhatsHappening>
    </>
  );
}
