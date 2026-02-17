/* ─── Shared application types ─── */

export type SessionState = "upcoming" | "live" | "completed";

export type SessionType =
  | "practice_1"
  | "practice_2"
  | "practice_3"
  | "qualifying"
  | "sprint_qualifying"
  | "sprint"
  | "race";

export interface Season {
  year: number;
  races: RaceSummary[];
}

export interface RaceSummary {
  slug: string;
  round: number;
  name: string;
  officialName: string;
  country: string;
  countryCode: string;
  circuit: string;
  dateStart: string;
  dateEnd: string;
  state: SessionState;
}

export interface Session {
  key: number;
  type: SessionType;
  name: string;
  dateStart: string;
  dateEnd: string;
  state: SessionState;
}

export interface Driver {
  number: number;
  code: string;
  firstName: string;
  lastName: string;
  teamName: string;
  teamColor: string;
  headshotUrl?: string;
  countryCode: string;
}

export interface DriverStanding {
  position: number;
  driver: Driver;
  points: number;
  wins: number;
  podiums: number;
  recentResults: number[];
}

export interface Constructor {
  name: string;
  color: string;
  logoUrl?: string;
}

export interface ConstructorStanding {
  position: number;
  constructor: Constructor;
  points: number;
  wins: number;
  drivers: string[];
  recentResults: number[];
}

export interface TimingRow {
  position: number;
  driver: Driver;
  gap: string;
  interval: string;
  lastLap: string;
  bestLap: string;
  sector1: string;
  sector2: string;
  sector3: string;
  tyre: TyreCompound;
  stint: number;
  pits: number;
  status: "running" | "pit" | "out" | "retired";
}

export type TyreCompound = "soft" | "medium" | "hard" | "intermediate" | "wet";

export interface RaceControlEvent {
  timestamp: string;
  type: "yellow" | "green" | "red" | "sc" | "vsc" | "penalty" | "info";
  message: string;
  driver?: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  rainfall: boolean;
  trackTemp: number;
}

export interface TrackProfile {
  name: string;
  country: string;
  length: number;
  turns: number;
  firstGrandPrix: number;
  lapRecord: { time: string; driver: string; year: number };
}
