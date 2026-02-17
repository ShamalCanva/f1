"use client";

import { cn } from "@/lib/utils";

interface GaugeProps {
  /** Value between 0 and max */
  value: number;
  /** Maximum value */
  max: number;
  /** Label beneath the gauge */
  label?: string;
  /** Size in px (width and height) */
  size?: number;
  /** Display value inside the gauge */
  display?: string;
  className?: string;
}

export function Gauge({
  value,
  max,
  label,
  size = 80,
  display,
  className,
}: GaugeProps) {
  const pct = Math.min(value / max, 1);
  const radius = (size - 8) / 2;
  const circumference = Math.PI * radius; // semicircle
  const offset = circumference * (1 - pct);

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <svg
        width={size}
        height={size / 2 + 8}
        viewBox={`0 0 ${size} ${size / 2 + 8}`}
      >
        {/* Background arc */}
        <path
          d={arcPath(size / 2, size / 2, radius)}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={4}
          strokeLinecap="round"
        />
        {/* Active arc */}
        <path
          d={arcPath(size / 2, size / 2, radius)}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-500 ease-out"
        />
        {/* Tick marks */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const angle = Math.PI * (1 - t);
          const x = size / 2 + Math.cos(angle) * (radius + 6);
          const y = size / 2 - Math.sin(angle) * (radius + 6);
          return (
            <circle
              key={t}
              cx={x}
              cy={y}
              r={1}
              fill="rgba(255,255,255,0.2)"
            />
          );
        })}
        {display && (
          <text
            x={size / 2}
            y={size / 2 - 4}
            textAnchor="middle"
            className="fill-text-primary text-xs font-semibold tabular-nums"
            style={{ fontSize: size * 0.18 }}
          >
            {display}
          </text>
        )}
      </svg>
      {label && (
        <span className="text-[11px] text-text-muted">{label}</span>
      )}
    </div>
  );
}

function arcPath(cx: number, cy: number, r: number) {
  return `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
}
