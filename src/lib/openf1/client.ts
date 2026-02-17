/**
 * OpenF1 API client.
 * Docs: https://openf1.org
 *
 * All functions return typed data from the public OpenF1 REST API.
 * In production, layer Redis caching over these calls.
 */

import type {
  OpenF1Driver,
  OpenF1Lap,
  OpenF1Position,
  OpenF1RaceControl,
  OpenF1Session,
  OpenF1Stint,
  OpenF1Weather,
} from "./types";

const BASE = "https://api.openf1.org/v1";

async function get<T>(path: string, params?: Record<string, string>): Promise<T[]> {
  const url = new URL(`${BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`OpenF1 ${path}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/* ─── Sessions ─── */

export async function getSessions(year?: number): Promise<OpenF1Session[]> {
  const params: Record<string, string> = {};
  if (year) params.year = String(year);
  return get<OpenF1Session>("/sessions", params);
}

export async function getSession(sessionKey: number): Promise<OpenF1Session[]> {
  return get<OpenF1Session>("/sessions", { session_key: String(sessionKey) });
}

/* ─── Drivers ─── */

export async function getDrivers(sessionKey: number): Promise<OpenF1Driver[]> {
  return get<OpenF1Driver>("/drivers", { session_key: String(sessionKey) });
}

/* ─── Positions ─── */

export async function getPositions(sessionKey: number): Promise<OpenF1Position[]> {
  return get<OpenF1Position>("/position", { session_key: String(sessionKey) });
}

/* ─── Laps ─── */

export async function getLaps(
  sessionKey: number,
  driverNumber?: number
): Promise<OpenF1Lap[]> {
  const params: Record<string, string> = { session_key: String(sessionKey) };
  if (driverNumber) params.driver_number = String(driverNumber);
  return get<OpenF1Lap>("/laps", params);
}

/* ─── Stints ─── */

export async function getStints(sessionKey: number): Promise<OpenF1Stint[]> {
  return get<OpenF1Stint>("/stints", { session_key: String(sessionKey) });
}

/* ─── Weather ─── */

export async function getWeather(sessionKey: number): Promise<OpenF1Weather[]> {
  return get<OpenF1Weather>("/weather", { session_key: String(sessionKey) });
}

/* ─── Race Control ─── */

export async function getRaceControl(
  sessionKey: number
): Promise<OpenF1RaceControl[]> {
  return get<OpenF1RaceControl>("/race_control", {
    session_key: String(sessionKey),
  });
}
