"use client";

import { Globe } from "lucide-react";
import { useLocale } from "@/lib/locale/context";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const COMMON_TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Rome",
  "Europe/Moscow",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
];

function tzLabel(tz: string) {
  return tz.replace(/_/g, " ").replace(/\//g, " / ");
}

export function TopBar() {
  const { timezone, hour12, setTimezone, setHour12 } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-12 items-center justify-end gap-3 border-b border-stroke-hairline bg-bg1 px-5">
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 rounded-full border border-stroke-hairline px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-stroke-strong hover:text-text-primary"
        >
          <Globe className="h-3.5 w-3.5" />
          <span className="tabular-nums">
            {tzLabel(timezone)}
          </span>
          <span className="text-text-muted">{hour12 ? "12h" : "24h"}</span>
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-1 w-64 rounded-[var(--radius-md)] border border-stroke-strong bg-bg1 p-2 shadow-xl">
            {/* 12h / 24h toggle */}
            <div className="mb-2 flex items-center justify-between px-2 py-1">
              <span className="text-[11px] font-medium text-text-muted">
                Format
              </span>
              <div className="flex gap-1">
                {[false, true].map((v) => (
                  <button
                    key={String(v)}
                    onClick={() => setHour12(v)}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
                      hour12 === v
                        ? "bg-accent-dim text-accent"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {v ? "12h" : "24h"}
                  </button>
                ))}
              </div>
            </div>
            <div className="border-t border-stroke-hairline" />
            {/* Timezone list */}
            <div className="max-h-64 overflow-y-auto pt-1">
              {COMMON_TIMEZONES.map((tz) => (
                <button
                  key={tz}
                  onClick={() => {
                    setTimezone(tz);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-xs transition-colors",
                    timezone === tz
                      ? "bg-accent-dim text-accent"
                      : "text-text-secondary hover:bg-bg2 hover:text-text-primary"
                  )}
                >
                  {tzLabel(tz)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
