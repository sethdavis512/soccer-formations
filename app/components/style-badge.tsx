import type { Style } from "~/data/formations.server";

const TONES: Record<Style, string> = {
  attacking: "bg-rose-100 text-rose-800 ring-rose-200",
  balanced: "bg-sky-100 text-sky-800 ring-sky-200",
  defensive: "bg-amber-100 text-amber-900 ring-amber-200",
};

export function StyleBadge({ style }: { style: Style }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ${TONES[style]}`}>
      {style}
    </span>
  );
}
