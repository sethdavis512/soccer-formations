import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  id?: string;
};

export function WhatsHappening({ children, id }: Props) {
  return (
    <section id={id} className="mt-16 scroll-mt-20 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">What's happening here</h2>
      <div className="mt-3 space-y-3 text-slate-700 leading-relaxed">{children}</div>
    </section>
  );
}

type CompareProps = {
  wrong: string;
  right: string;
  wrongNote: string;
  rightNote: string;
};

export function CodeCompare({ wrong, right, wrongNote, rightNote }: CompareProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <figure className="overflow-hidden rounded-lg border border-rose-200">
        <figcaption className="bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-800">✗ Wrong way: {wrongNote}</figcaption>
        <pre className="overflow-x-auto bg-slate-900 p-4 text-[13px] leading-relaxed text-slate-100">
          <code>{wrong}</code>
        </pre>
      </figure>
      <figure className="overflow-hidden rounded-lg border border-emerald-200">
        <figcaption className="bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">✓ Right way: {rightNote}</figcaption>
        <pre className="overflow-x-auto bg-slate-900 p-4 text-[13px] leading-relaxed text-slate-100">
          <code>{right}</code>
        </pre>
      </figure>
    </div>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800">{children}</code>;
}
