/**
 * Higher-level helpers that normalise OpenF1 data into app types.
 */

import type { OpenF1Session } from "./types";
import type { RaceSummary, Session, SessionState, SessionType } from "@/types";

/** Derive session state from dates */
export function deriveState(dateStart: string, dateEnd: string): SessionState {
  const now = Date.now();
  const start = new Date(dateStart).getTime();
  const end = new Date(dateEnd).getTime();
  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "live";
  return "completed";
}

/** Map OpenF1 session_type string to our SessionType */
export function mapSessionType(raw: string): SessionType {
  const t = raw.toLowerCase();
  if (t.includes("practice 1") || t.includes("practice_1")) return "practice_1";
  if (t.includes("practice 2") || t.includes("practice_2")) return "practice_2";
  if (t.includes("practice 3") || t.includes("practice_3")) return "practice_3";
  if (t.includes("sprint") && t.includes("quali")) return "sprint_qualifying";
  if (t.includes("sprint") && t.includes("shoot")) return "sprint_qualifying";
  if (t.includes("sprint")) return "sprint";
  if (t.includes("quali")) return "qualifying";
  return "race";
}

/** Convert an OpenF1 session to our Session type */
export function toSession(s: OpenF1Session): Session {
  return {
    key: s.session_key,
    type: mapSessionType(s.session_type),
    name: s.session_name,
    dateStart: s.date_start,
    dateEnd: s.date_end,
    state: deriveState(s.date_start, s.date_end),
  };
}

/**
 * Group OpenF1 sessions into race weekends.
 * Sessions that share the same circuit + country in the same year
 * are grouped into one RaceSummary.
 */
export function groupIntoRaces(sessions: OpenF1Session[]): RaceSummary[] {
  const map = new Map<string, OpenF1Session[]>();

  for (const s of sessions) {
    const key = `${s.year}-${s.circuit_short_name}`;
    const existing = map.get(key) ?? [];
    existing.push(s);
    map.set(key, existing);
  }

  const races: RaceSummary[] = [];
  let round = 0;

  const sorted = [...map.entries()].sort((a, b) => {
    const aStart = a[1][0]?.date_start ?? "";
    const bStart = b[1][0]?.date_start ?? "";
    return aStart.localeCompare(bStart);
  });

  for (const [, group] of sorted) {
    round++;
    const first = group[0];
    const dates = group.map((s) => s.date_start).sort();
    const datesEnd = group.map((s) => s.date_end).sort();
    const dateStart = dates[0];
    const dateEnd = datesEnd[datesEnd.length - 1];

    const slug = first.circuit_short_name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    races.push({
      slug,
      round,
      name: first.circuit_short_name,
      officialName: `${first.country_name} Grand Prix`,
      country: first.country_name,
      countryCode: first.country_code,
      circuit: first.circuit_short_name,
      dateStart,
      dateEnd,
      state: deriveState(dateStart, dateEnd),
    });
  }

  return races;
}

/** Country code to flag emoji */
export function countryFlag(code: string): string {
  if (!code || code.length < 2) return "";
  const upper = code.toUpperCase().slice(0, 2);
  return String.fromCodePoint(
    ...upper.split("").map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}
