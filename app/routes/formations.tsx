import { Form, Link, useNavigation } from "react-router";
import { z } from "zod";
import type { Route } from "./+types/formations";
import { Pitch } from "~/components/pitch";
import { StyleBadge } from "~/components/style-badge";
import { Code, CodeCompare, WhatsHappening } from "~/components/whats-happening";
import { STYLES, listFormations } from "~/data/formations.server";

// Search params are user input. `.catch(undefined)` turns a hand-edited
// `?style=banana` into "no filter" instead of a 500.
const FiltersSchema = z.object({
  q: z
    .string()
    .trim()
    .max(50)
    .transform((v) => v || undefined)
    .optional()
    .catch(undefined),
  style: z.enum(STYLES).optional().catch(undefined),
});

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: `Browse ${loaderData.total} soccer formations` },
    { name: "description", content: "Filter classic soccer formations by style or keyword." },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const filters = FiltersSchema.parse(Object.fromEntries(url.searchParams));
  return { ...listFormations(filters), filters, styles: STYLES };
}

const WRONG = `const [params, setParams] = useSearchParams();

<form onSubmit={(e) => {
  e.preventDefault();
  setParams({ q: e.currentTarget.q.value });
}}>`;

const RIGHT = `// The browser builds ?q=...&style=... and
// React Router re-runs the loader for it.
<Form method="get">
  <input name="q" defaultValue={filters.q} />
  <select name="style">...</select>
  <button>Filter</button>
</Form>`;

export default function Formations({ loaderData }: Route.ComponentProps) {
  const { formations, total, filters, styles } = loaderData;
  const navigation = useNavigation();
  const searching = navigation.location?.pathname === "/formations";

  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Formations</h1>
      <p className="mt-2 text-slate-700">Filter by playing style or search the descriptions.</p>

      {/* `key` resets the uncontrolled inputs when the URL changes via back/forward. */}
      <Form
        method="get"
        key={`${filters.q ?? ""}|${filters.style ?? ""}`}
        className="mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <label className="flex min-w-48 flex-1 flex-col gap-1 text-sm font-medium text-slate-800">
          Search
          <input
            type="search"
            name="q"
            defaultValue={filters.q}
            placeholder="e.g. wing-backs, counter, midfield"
            className="rounded-lg border border-slate-300 px-3 py-2 text-base font-normal text-slate-900 placeholder:text-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-800">
          Style
          <select
            name="style"
            defaultValue={filters.style ?? ""}
            className="rounded-lg border border-slate-300 px-3 py-2 text-base font-normal text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
          >
            <option value="">Any style</option>
            {styles.map((s) => (
              <option key={s} value={s}>
                {s[0].toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="rounded-lg bg-emerald-700 px-5 py-2 font-semibold text-white hover:bg-emerald-800"
        >
          {searching ? "Filtering…" : "Filter"}
        </button>
        {(filters.q || filters.style) && (
          <Link to="/formations" className="py-2 text-sm font-medium text-slate-700 underline underline-offset-2">
            Clear
          </Link>
        )}
      </Form>

      <p className="mt-6 text-sm text-slate-600" aria-live="polite">
        Showing {formations.length} of {total}
      </p>

      {formations.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-700">
          No formations match. Try another keyword or style.
        </p>
      ) : (
        <ul className={`mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${searching ? "opacity-60" : ""}`}>
          {formations.map((f) => (
            <li key={f.slug}>
              <Link
                to={`/formations/${f.slug}`}
                className="group block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
              >
                <Pitch name={f.name} positions={f.positions} size="sm" />
                <div className="mt-4 flex items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800">{f.name}</h2>
                  <StyleBadge style={f.style} />
                </div>
                <p className="mt-1 text-sm text-slate-700">{f.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <WhatsHappening>
        <p>
          The filter is a plain <Code>&lt;Form method="get"&gt;</Code>. Submitting it puts the fields in the URL (
          <Code>?q=…&amp;style=…</Code>), and React Router runs this route's <Code>loader</Code> with that URL. The
          filtering happens on the server, so the results are shareable links and work before JavaScript loads.
        </p>
        <p>
          The loader validates the params with a Zod schema first. Anything malformed becomes "no filter" rather than
          an error page.
        </p>
        <CodeCompare
          wrongNote="manage search params by hand"
          rightNote="let the form drive the URL"
          wrong={WRONG}
          right={RIGHT}
        />
      </WhatsHappening>
    </>
  );
}
