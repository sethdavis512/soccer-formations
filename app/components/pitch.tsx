import type { Position } from "~/data/formations.server";

// Real pitch proportions in meters: 68 wide, 105 long.
const W = 68;
const L = 105;

type Props = {
  name: string;
  positions: Position[];
  size?: "sm" | "lg";
  className?: string;
};

export function Pitch({ name, positions, size = "lg", className }: Props) {
  const showLabels = size === "lg";
  const r = showLabels ? 3.4 : 2.6;

  return (
    <svg
      viewBox={`-2 -2 ${W + 4} ${L + 4}`}
      role="img"
      aria-label={`${name} formation diagram`}
      className={["block w-full rounded-lg bg-emerald-700", className].filter(Boolean).join(" ")}
    >
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={0} y={i * 15} width={W} height={7.5} className="fill-emerald-600/40" />
      ))}
      <g fill="none" stroke="white" strokeOpacity={0.75} strokeWidth={0.4}>
        <rect x={0} y={0} width={W} height={L} />
        <line x1={0} y1={L / 2} x2={W} y2={L / 2} />
        <circle cx={W / 2} cy={L / 2} r={9.15} />
        <rect x={(W - 40.3) / 2} y={0} width={40.3} height={16.5} />
        <rect x={(W - 40.3) / 2} y={L - 16.5} width={40.3} height={16.5} />
        <rect x={(W - 18.3) / 2} y={0} width={18.3} height={5.5} />
        <rect x={(W - 18.3) / 2} y={L - 5.5} width={18.3} height={5.5} />
      </g>
      <circle cx={W / 2} cy={L / 2} r={0.5} fill="white" fillOpacity={0.75} />

      {positions.map((p, i) => {
        // The team attacks upward, so its own goal (y = 0) sits at the bottom.
        const cx = (p.x / 100) * W;
        const cy = L - (p.y / 100) * L;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} className="fill-slate-900" stroke="white" strokeWidth={0.5} />
            {showLabels && (
              <text
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize={p.role.length > 2 ? 1.8 : 2.2}
                fontWeight={700}
              >
                {p.role}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
