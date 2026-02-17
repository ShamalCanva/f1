"use client";

import { Card } from "@/components/ui";
import type { OpenF1Driver } from "@/lib/openf1/types";

interface Props {
  drivers: OpenF1Driver[];
}

export function DriversGrid({ drivers }: Props) {
  if (drivers.length === 0) {
    return (
      <Card title="Drivers">
        <p className="text-sm text-text-muted">No driver data available.</p>
      </Card>
    );
  }

  // Deduplicate by driver_number
  const unique = Array.from(
    new Map(drivers.map((d) => [d.driver_number, d])).values()
  );

  return (
    <Card title="Drivers" subtitle={`${unique.length} entries`}>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {unique.map((d) => (
          <div
            key={d.driver_number}
            className="flex items-center gap-3 rounded-[var(--radius-sm)] border border-stroke-hairline bg-bg0/50 px-3 py-2.5"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: `#${d.team_colour}` }}
            >
              {d.driver_number}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-text-primary">
                {d.first_name}{" "}
                <span className="uppercase">{d.last_name}</span>
              </div>
              <div className="truncate text-[11px] text-text-muted">
                {d.team_name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
