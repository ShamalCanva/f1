import { getSessions, getDrivers, getWeather, getStints, getRaceControl } from "@/lib/openf1/client";
import { groupIntoRaces, toSession } from "@/lib/openf1/helpers";
import { WeekendHub } from "@/components/race/WeekendHub";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function RacePage({ params }: Props) {
  const { slug } = await params;

  let allSessions: import("@/lib/openf1/types").OpenF1Session[] = [];
  try {
    allSessions = await getSessions(2025);
  } catch {
    allSessions = [];
  }

  const races = groupIntoRaces(allSessions);
  const race = races.find((r) => r.slug === slug);
  if (!race) return notFound();

  // Get sessions for this race weekend
  const raceSessions = allSessions
    .filter(
      (s) =>
        s.circuit_short_name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") === slug
    )
    .map(toSession);

  // Get drivers from the latest session
  const latestSession = allSessions
    .filter(
      (s) =>
        s.circuit_short_name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") === slug
    )
    .sort((a, b) => b.session_key - a.session_key)[0];

  let drivers: import("@/lib/openf1/types").OpenF1Driver[] = [];
  let weather: import("@/lib/openf1/types").OpenF1Weather[] = [];
  let stints: import("@/lib/openf1/types").OpenF1Stint[] = [];
  let raceControl: import("@/lib/openf1/types").OpenF1RaceControl[] = [];

  if (latestSession) {
    try {
      [drivers, weather, stints, raceControl] = await Promise.all([
        getDrivers(latestSession.session_key),
        getWeather(latestSession.session_key),
        getStints(latestSession.session_key),
        getRaceControl(latestSession.session_key),
      ]);
    } catch {
      // Partial data is fine
    }
  }

  return (
    <WeekendHub
      race={race}
      sessions={raceSessions}
      drivers={drivers}
      weather={weather}
      stints={stints}
      raceControl={raceControl}
    />
  );
}
