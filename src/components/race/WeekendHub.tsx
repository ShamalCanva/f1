"use client";

import { useState } from "react";
import { Tabs, Card, Badge } from "@/components/ui";
import { SchedulePanel } from "./SchedulePanel";
import { WeatherPanel } from "./WeatherPanel";
import { StintsPanel } from "./StintsPanel";
import { ControlFeed } from "./ControlFeed";
import { DriversGrid } from "./DriversGrid";
import { countryFlag } from "@/lib/openf1/helpers";
import { useLocale } from "@/lib/locale/context";
import { formatDateShort, formatDateLong } from "@/lib/locale/format";
import { MapPin, Calendar } from "lucide-react";
import type { RaceSummary, Session } from "@/types";
import type { OpenF1Driver, OpenF1Weather, OpenF1Stint, OpenF1RaceControl } from "@/lib/openf1/types";

interface WeekendHubProps {
  race: RaceSummary;
  sessions: Session[];
  drivers: OpenF1Driver[];
  weather: OpenF1Weather[];
  stints: OpenF1Stint[];
  raceControl: OpenF1RaceControl[];
}

const HUB_TABS = [
  { id: "overview", label: "Overview" },
  { id: "schedule", label: "Schedule" },
  { id: "drivers", label: "Drivers" },
  { id: "weather", label: "Weather" },
  { id: "strategy", label: "Strategy" },
  { id: "feed", label: "Race Control" },
];

const stateVariant = {
  upcoming: "default" as const,
  live: "red" as const,
  completed: "green" as const,
};
const stateLabel = {
  upcoming: "UPCOMING",
  live: "LIVE",
  completed: "COMPLETED",
};

export function WeekendHub({
  race,
  sessions,
  drivers,
  weather,
  stints,
  raceControl,
}: WeekendHubProps) {
  const [tab, setTab] = useState("overview");
  const locale = useLocale();
  const fmtOpts = {
    locale: locale.locale,
    timezone: locale.timezone,
    hour12: locale.hour12,
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{countryFlag(race.countryCode)}</span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
              {race.officialName}
            </h1>
            <div className="mt-1 flex items-center gap-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {race.circuit}, {race.country}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDateShort(race.dateStart, fmtOpts)} &ndash;{" "}
                {formatDateLong(race.dateEnd, fmtOpts)}
              </span>
            </div>
          </div>
        </div>
        <Badge variant={stateVariant[race.state]}>
          {stateLabel[race.state]}
        </Badge>
      </div>

      {/* Tabs */}
      <Tabs tabs={HUB_TABS} active={tab} onChange={setTab} />

      {/* Tab content */}
      {tab === "overview" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <SchedulePanel sessions={sessions} />
          <WeatherPanel weather={weather} />
          {drivers.length > 0 && (
            <div className="lg:col-span-2">
              <DriversGrid drivers={drivers} />
            </div>
          )}
        </div>
      )}

      {tab === "schedule" && <SchedulePanel sessions={sessions} />}

      {tab === "drivers" && <DriversGrid drivers={drivers} />}

      {tab === "weather" && <WeatherPanel weather={weather} />}

      {tab === "strategy" && <StintsPanel stints={stints} drivers={drivers} />}

      {tab === "feed" && <ControlFeed events={raceControl} />}
    </div>
  );
}
