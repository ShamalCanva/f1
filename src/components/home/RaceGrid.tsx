"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui";
import { SessionCard } from "./SessionCard";
import type { RaceSummary } from "@/types";

interface RaceGridProps {
  races: RaceSummary[];
}

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "live", label: "Live" },
  { id: "completed", label: "Completed" },
];

export function RaceGrid({ races }: RaceGridProps) {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? races : races.filter((r) => r.state === filter);

  // Put live first, then upcoming, then completed
  const sorted = [...filtered].sort((a, b) => {
    const order = { live: 0, upcoming: 1, completed: 2 };
    return order[a.state] - order[b.state];
  });

  return (
    <div>
      <Tabs tabs={FILTER_TABS} active={filter} onChange={setFilter} />
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((race) => (
          <SessionCard key={race.slug} race={race} />
        ))}
      </div>
      {sorted.length === 0 && (
        <div className="py-16 text-center text-sm text-text-muted">
          No races match this filter.
        </div>
      )}
    </div>
  );
}
