"use client";

import { Card, Badge } from "@/components/ui";
import { useLocale } from "@/lib/locale/context";
import { formatWeekday, formatTime, formatRelative } from "@/lib/locale/format";
import { Clock } from "lucide-react";
import type { Session } from "@/types";

interface Props {
  sessions: Session[];
}

const sessionLabel: Record<string, string> = {
  practice_1: "Practice 1",
  practice_2: "Practice 2",
  practice_3: "Practice 3",
  qualifying: "Qualifying",
  sprint_qualifying: "Sprint Qualifying",
  sprint: "Sprint",
  race: "Race",
};

const stateVariant = {
  upcoming: "default" as const,
  live: "red" as const,
  completed: "green" as const,
};

export function SchedulePanel({ sessions }: Props) {
  const locale = useLocale();
  const fmtOpts = {
    locale: locale.locale,
    timezone: locale.timezone,
    hour12: locale.hour12,
  };

  if (sessions.length === 0) {
    return (
      <Card title="Schedule">
        <p className="text-sm text-text-muted">No session data available.</p>
      </Card>
    );
  }

  return (
    <Card title="Schedule" subtitle={`${sessions.length} sessions`}>
      <div className="space-y-2">
        {sessions.map((s) => (
          <div
            key={s.key}
            className="flex items-center justify-between rounded-[var(--radius-sm)] border border-stroke-hairline bg-bg0/50 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-bg2 text-[11px] font-bold uppercase text-text-muted">
                {formatWeekday(s.dateStart, fmtOpts)}
              </div>
              <div>
                <div className="text-sm font-medium text-text-primary">
                  {sessionLabel[s.type] ?? s.name}
                </div>
                <div className="flex items-center gap-1 text-xs text-text-secondary">
                  <Clock className="h-3 w-3" />
                  {formatTime(s.dateStart, fmtOpts)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {s.state === "upcoming" && (
                <span className="text-xs text-text-muted">
                  {formatRelative(s.dateStart, fmtOpts)}
                </span>
              )}
              <Badge variant={stateVariant[s.state]}>
                {s.state.toUpperCase()}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
