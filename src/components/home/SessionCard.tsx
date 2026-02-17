"use client";

import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import { useLocale } from "@/lib/locale/context";
import { formatDateShort, formatTime, formatRelative } from "@/lib/locale/format";
import { countryFlag } from "@/lib/openf1/helpers";
import type { RaceSummary } from "@/types";

interface SessionCardProps {
  race: RaceSummary;
}

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

export function SessionCard({ race }: SessionCardProps) {
  const locale = useLocale();
  const fmtOpts = {
    locale: locale.locale,
    timezone: locale.timezone,
    hour12: locale.hour12,
  };

  return (
    <Link href={`/race/${race.slug}`} className="block">
      <Card className="group cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{countryFlag(race.countryCode)}</span>
            <div>
              <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                {race.officialName}
              </h3>
              <div className="mt-0.5 flex items-center gap-3 text-xs text-text-secondary">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {race.circuit}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDateShort(race.dateStart, fmtOpts)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(race.dateStart, fmtOpts)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant={stateVariant[race.state]}>
              {stateLabel[race.state]}
            </Badge>
            {race.state === "upcoming" && (
              <span className="text-[11px] text-text-muted">
                {formatRelative(race.dateStart, fmtOpts)}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
