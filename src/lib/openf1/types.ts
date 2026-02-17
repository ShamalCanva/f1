/* ─── OpenF1 API Response Types ─── */

export interface OpenF1Session {
  session_key: number;
  session_name: string;
  session_type: string;
  date_start: string;
  date_end: string;
  gmt_offset: string;
  circuit_key: number;
  circuit_short_name: string;
  country_key: number;
  country_code: string;
  country_name: string;
  location: string;
  year: number;
}

export interface OpenF1Driver {
  driver_number: number;
  broadcast_name: string;
  full_name: string;
  name_acronym: string;
  first_name: string;
  last_name: string;
  team_name: string;
  team_colour: string;
  headshot_url: string;
  country_code: string;
  session_key: number;
}

export interface OpenF1Position {
  session_key: number;
  driver_number: number;
  position: number;
  date: string;
}

export interface OpenF1Lap {
  session_key: number;
  driver_number: number;
  lap_number: number;
  lap_duration: number | null;
  duration_sector_1: number | null;
  duration_sector_2: number | null;
  duration_sector_3: number | null;
  is_pit_out_lap: boolean;
  st_speed: number | null;
  date_start: string;
}

export interface OpenF1Stint {
  session_key: number;
  driver_number: number;
  stint_number: number;
  compound: string;
  tyre_age_at_start: number;
  lap_start: number;
  lap_end: number;
}

export interface OpenF1Weather {
  session_key: number;
  date: string;
  air_temperature: number;
  humidity: number;
  pressure: number;
  rainfall: number;
  track_temperature: number;
  wind_direction: number;
  wind_speed: number;
}

export interface OpenF1RaceControl {
  session_key: number;
  date: string;
  category: string;
  flag: string;
  message: string;
  scope: string;
  driver_number: number | null;
  lap_number: number | null;
}
