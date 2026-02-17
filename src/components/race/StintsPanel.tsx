"use client";

import { Card } from "@/components/ui";
import type { OpenF1Stint, OpenF1Driver } from "@/lib/openf1/types";

interface Props {
  stints: OpenF1Stint[];
  drivers: OpenF1Driver[];
}

const compoundColors: Record<string, string> = {
  SOFT: "#FF3333",
  MEDIUM: "#FFD700",
  HARD: "#CCCCCC",
  INTERMEDIATE: "#3BE37A",
  WET: "#339BFF",
};

export function StintsPanel({ stints, drivers }: Props) {
  if (stints.length === 0) {
    return (
      <Card title="Strategy">
        <p className="text-sm text-text-muted">No stint data available yet.</p>
      </Card>
    );
  }

  const driverMap = new Map(
    drivers.map((d) => [d.driver_number, d])
  );

  // Group by driver
  const grouped = new Map<number, OpenF1Stint[]>();
  for (const s of stints) {
    const arr = grouped.get(s.driver_number) ?? [];
    arr.push(s);
    grouped.set(s.driver_number, arr);
  }

  const maxLap = Math.max(...stints.map((s) => s.lap_end || s.lap_start));

  return (
    <Card title="Strategy" subtitle="Tyre stints">
      <div className="space-y-2">
        {Array.from(grouped.entries()).map(([num, driverStints]) => {
          const driver = driverMap.get(num);
          return (
            <div key={num} className="flex items-center gap-3">
              <div className="w-16 text-right text-xs font-semibold text-text-secondary tabular-nums">
                {driver?.name_acronym ?? num}
              </div>
              <div className="flex flex-1 gap-[1px]">
                {driverStints.map((stint) => {
                  const width =
                    ((stint.lap_end - stint.lap_start + 1) / maxLap) * 100;
                  const color =
                    compoundColors[stint.compound?.toUpperCase()] ?? "#666";
                  return (
                    <div
                      key={stint.stint_number}
                      className="relative flex h-6 items-center justify-center rounded-sm text-[10px] font-bold text-bg0"
                      style={{
                        width: `${width}%`,
                        backgroundColor: color,
                        minWidth: "20px",
                      }}
                      title={`${stint.compound} | Laps ${stint.lap_start}–${stint.lap_end}`}
                    >
                      {width > 8 && (
                        <span className="truncate px-1">
                          {stint.compound?.[0]}
                          {stint.lap_end - stint.lap_start + 1}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
