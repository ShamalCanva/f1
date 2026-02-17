import { getSessions } from "@/lib/openf1/client";
import { groupIntoRaces } from "@/lib/openf1/helpers";
import { RaceGrid } from "@/components/home/RaceGrid";
import { Card } from "@/components/ui";
import { Flag, Trophy, Timer } from "lucide-react";

export default async function HomePage() {
  let races: import("@/types").RaceSummary[] = [];
  try {
    const sessions = await getSessions(2025);
    races = groupIntoRaces(sessions);
  } catch {
    races = [];
  }

  const liveCount = races.filter((r) => r.state === "live").length;
  const upcomingCount = races.filter((r) => r.state === "upcoming").length;
  const completedCount = races.filter((r) => r.state === "completed").length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          2025 Formula 1 World Championship
        </p>
      </div>

      {/* Stats row */}
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          icon={<Timer className="h-5 w-5 text-f1-red" />}
          label="Live Now"
          value={liveCount}
        />
        <StatCard
          icon={<Flag className="h-5 w-5 text-accent" />}
          label="Upcoming"
          value={upcomingCount}
        />
        <StatCard
          icon={<Trophy className="h-5 w-5 text-f1-green" />}
          label="Completed"
          value={completedCount}
        />
      </div>

      {/* Race grid */}
      <RaceGrid races={races} />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-bg2">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold tabular-nums text-text-primary">
            {value}
          </div>
          <div className="text-xs text-text-muted">{label}</div>
        </div>
      </div>
    </Card>
  );
}
