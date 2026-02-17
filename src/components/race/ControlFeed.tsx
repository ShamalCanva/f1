"use client";

import { Card, Badge } from "@/components/ui";
import { useLocale } from "@/lib/locale/context";
import { formatTime } from "@/lib/locale/format";
import { AlertTriangle, Flag, Info, ShieldAlert } from "lucide-react";
import type { OpenF1RaceControl } from "@/lib/openf1/types";

interface Props {
  events: OpenF1RaceControl[];
}

function eventVariant(flag: string) {
  const f = flag?.toLowerCase() ?? "";
  if (f.includes("yellow")) return "yellow" as const;
  if (f.includes("red")) return "red" as const;
  if (f.includes("green")) return "green" as const;
  return "default" as const;
}

function eventIcon(category: string) {
  const c = category?.toLowerCase() ?? "";
  if (c.includes("flag")) return <Flag className="h-3.5 w-3.5" />;
  if (c.includes("safety") || c.includes("vsc"))
    return <ShieldAlert className="h-3.5 w-3.5" />;
  if (c.includes("penalty") || c.includes("investigation"))
    return <AlertTriangle className="h-3.5 w-3.5" />;
  return <Info className="h-3.5 w-3.5" />;
}

export function ControlFeed({ events }: Props) {
  const locale = useLocale();
  const fmtOpts = {
    locale: locale.locale,
    timezone: locale.timezone,
    hour12: locale.hour12,
  };

  if (events.length === 0) {
    return (
      <Card title="Race Control">
        <p className="text-sm text-text-muted">
          No race control messages yet.
        </p>
      </Card>
    );
  }

  // Show most recent first
  const sorted = [...events].reverse();

  return (
    <Card title="Race Control" subtitle={`${events.length} events`}>
      <div className="space-y-1.5 max-h-[500px] overflow-y-auto">
        {sorted.map((e, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-[var(--radius-sm)] border border-stroke-hairline bg-bg0/50 px-3 py-2.5"
          >
            <span className="mt-0.5 flex-shrink-0 text-text-muted">
              {eventIcon(e.category)}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary">{e.message}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[11px] tabular-nums text-text-muted">
                  {formatTime(e.date, fmtOpts)}
                </span>
                {e.flag && (
                  <Badge variant={eventVariant(e.flag)}>
                    {e.flag}
                  </Badge>
                )}
                {e.lap_number && (
                  <span className="text-[11px] text-text-muted">
                    Lap {e.lap_number}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
