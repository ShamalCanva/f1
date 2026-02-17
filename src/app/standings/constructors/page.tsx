import { Card } from "@/components/ui";
import { ConstructorStandingsTable } from "@/components/standings/ConstructorStandingsTable";
import { getConstructorStandings } from "@/lib/openf1/standings";

export default function ConstructorsPage() {
  const standings = getConstructorStandings();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          Constructors Championship
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          2025 FIA Formula One World Championship standings
        </p>
      </div>

      <Card flush>
        <ConstructorStandingsTable standings={standings} />
      </Card>
    </div>
  );
}
