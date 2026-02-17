/**
 * Standings helpers.
 *
 * OpenF1 doesn't provide championship standings directly.
 * We build mock standings from session/driver data for now.
 * In production, scrape ergast or another source, or calculate from results.
 */

import type { DriverStanding, ConstructorStanding } from "@/types";

// Hard-coded 2025 standings as placeholder data.
// These will be replaced with real API data as results come in.

export function getDriverStandings(): DriverStanding[] {
  return [
    ds(1, 1, "MAX", "Max", "Verstappen", "Red Bull Racing", "#3671C6", "NL", 51, 2, 3, [1, 2, 1, 3, 1]),
    ds(2, 4, "NOR", "Lando", "Norris", "McLaren", "#FF8000", "GB", 42, 1, 2, [2, 1, 3, 1, 2]),
    ds(3, 16, "LEC", "Charles", "Leclerc", "Ferrari", "#E8002D", "MC", 38, 1, 3, [3, 3, 2, 2, 3]),
    ds(4, 44, "HAM", "Lewis", "Hamilton", "Ferrari", "#E8002D", "GB", 32, 0, 2, [4, 4, 4, 5, 4]),
    ds(5, 81, "PIA", "Oscar", "Piastri", "McLaren", "#FF8000", "AU", 30, 0, 2, [5, 5, 5, 4, 5]),
    ds(6, 63, "RUS", "George", "Russell", "Mercedes", "#27F4D2", "GB", 28, 0, 1, [6, 6, 6, 6, 6]),
    ds(7, 55, "SAI", "Carlos", "Sainz", "Williams", "#1868DB", "ES", 22, 0, 0, [7, 8, 7, 7, 7]),
    ds(8, 14, "ALO", "Fernando", "Alonso", "Aston Martin", "#229971", "ES", 18, 0, 0, [8, 7, 8, 8, 9]),
    ds(9, 23, "ALB", "Alexander", "Albon", "Williams", "#1868DB", "TH", 14, 0, 0, [9, 10, 10, 9, 8]),
    ds(10, 11, "PER", "Sergio", "Perez", "Red Bull Racing", "#3671C6", "MX", 12, 0, 0, [10, 9, 9, 10, 10]),
  ];
}

export function getConstructorStandings(): ConstructorStanding[] {
  return [
    cs(1, "McLaren", "#FF8000", 72, 1, ["NOR", "PIA"], [1, 1, 2, 1, 2]),
    cs(2, "Ferrari", "#E8002D", 70, 1, ["LEC", "HAM"], [2, 2, 1, 2, 1]),
    cs(3, "Red Bull Racing", "#3671C6", 63, 2, ["VER", "PER"], [1, 3, 3, 3, 3]),
    cs(4, "Mercedes", "#27F4D2", 28, 0, ["RUS", "ANT"], [4, 4, 4, 4, 4]),
    cs(5, "Aston Martin", "#229971", 18, 0, ["ALO", "STR"], [5, 5, 5, 5, 5]),
    cs(6, "Williams", "#1868DB", 36, 0, ["SAI", "ALB"], [3, 3, 3, 3, 3]),
  ];
}

function ds(
  position: number,
  number: number,
  code: string,
  firstName: string,
  lastName: string,
  teamName: string,
  teamColor: string,
  countryCode: string,
  points: number,
  wins: number,
  podiums: number,
  recentResults: number[]
): DriverStanding {
  return {
    position,
    driver: { number, code, firstName, lastName, teamName, teamColor, countryCode },
    points,
    wins,
    podiums,
    recentResults,
  };
}

function cs(
  position: number,
  name: string,
  color: string,
  points: number,
  wins: number,
  drivers: string[],
  recentResults: number[]
): ConstructorStanding {
  return {
    position,
    constructor: { name, color },
    points,
    wins,
    drivers,
    recentResults,
  };
}
