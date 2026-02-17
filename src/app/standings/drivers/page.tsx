import { Card } from "@/components/ui";
import { DriverStandingsTable } from "@/components/standings/DriverStandingsTable";
import { getDriverStandings } from "@/lib/openf1/standings";

export default function DriversPage() {
  const standings = getDriverStandings();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          Drivers Championship
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          2025 FIA Formula One World Championship standings
        </p>
      </div>

      <Card flush>
        <DriverStandingsTable standings={standings} />
      </Card>
    </div>
  );
}
