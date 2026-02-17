/**
 * Centralised date/time formatting.
 * Every user-facing timestamp in the app should use these helpers so that
 * timezone + locale preferences are always respected.
 */

interface FormatOpts {
  locale: string;
  timezone: string;
  hour12: boolean;
}

/** Full date + time, e.g. "18 Feb 2026, 14:30" */
export function formatDateTime(date: Date | string, opts: FormatOpts): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(opts.locale, {
    timeZone: opts.timezone,
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: opts.hour12,
  }).format(d);
}

/** Time only, e.g. "14:30" */
export function formatTime(date: Date | string, opts: FormatOpts): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(opts.locale, {
    timeZone: opts.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: opts.hour12,
  }).format(d);
}

/** Short date, e.g. "18 Feb" */
export function formatDateShort(date: Date | string, opts: FormatOpts): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(opts.locale, {
    timeZone: opts.timezone,
    day: "numeric",
    month: "short",
  }).format(d);
}

/** Full date, e.g. "18 February 2026" */
export function formatDateLong(date: Date | string, opts: FormatOpts): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(opts.locale, {
    timeZone: opts.timezone,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** Relative time, e.g. "in 3 hours", "2 days ago" */
export function formatRelative(date: Date | string, opts: FormatOpts): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = d.getTime() - Date.now();
  const absDiff = Math.abs(diffMs);
  const rtf = new Intl.RelativeTimeFormat(opts.locale, { numeric: "auto" });

  if (absDiff < 60_000) return rtf.format(Math.round(diffMs / 1000), "second");
  if (absDiff < 3_600_000)
    return rtf.format(Math.round(diffMs / 60_000), "minute");
  if (absDiff < 86_400_000)
    return rtf.format(Math.round(diffMs / 3_600_000), "hour");
  return rtf.format(Math.round(diffMs / 86_400_000), "day");
}

/** Day of week short, e.g. "Fri" */
export function formatWeekday(date: Date | string, opts: FormatOpts): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(opts.locale, {
    timeZone: opts.timezone,
    weekday: "short",
  }).format(d);
}
