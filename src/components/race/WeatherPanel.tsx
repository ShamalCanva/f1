"use client";

import { Card, Gauge } from "@/components/ui";
import { Thermometer, Droplets, Wind, CloudRain } from "lucide-react";
import type { OpenF1Weather } from "@/lib/openf1/types";

interface Props {
  weather: OpenF1Weather[];
}

export function WeatherPanel({ weather }: Props) {
  if (weather.length === 0) {
    return (
      <Card title="Weather">
        <p className="text-sm text-text-muted">No weather data available.</p>
      </Card>
    );
  }

  // Show the latest weather reading
  const latest = weather[weather.length - 1];

  return (
    <Card title="Weather" subtitle="Latest reading">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <WeatherStat
          icon={<Thermometer className="h-4 w-4 text-f1-red" />}
          label="Air Temp"
          value={`${latest.air_temperature.toFixed(1)}°C`}
        />
        <WeatherStat
          icon={<Thermometer className="h-4 w-4 text-accent" />}
          label="Track Temp"
          value={`${latest.track_temperature.toFixed(1)}°C`}
        />
        <WeatherStat
          icon={<Droplets className="h-4 w-4 text-[#5b9bd5]" />}
          label="Humidity"
          value={`${latest.humidity.toFixed(0)}%`}
        />
        <WeatherStat
          icon={<Wind className="h-4 w-4 text-text-secondary" />}
          label="Wind"
          value={`${latest.wind_speed.toFixed(1)} km/h`}
        />
      </div>
      <div className="mt-5 flex items-center justify-center">
        <Gauge
          value={latest.humidity}
          max={100}
          label="Humidity"
          display={`${latest.humidity.toFixed(0)}%`}
          size={100}
        />
        <Gauge
          value={latest.track_temperature}
          max={60}
          label="Track Temp"
          display={`${latest.track_temperature.toFixed(0)}°`}
          size={100}
        />
      </div>
      {latest.rainfall > 0 && (
        <div className="mt-4 flex items-center gap-2 rounded-[var(--radius-sm)] bg-f1-yellow-dim px-3 py-2 text-xs font-medium text-f1-yellow">
          <CloudRain className="h-4 w-4" />
          Rain detected
        </div>
      )}
    </Card>
  );
}

function WeatherStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      {icon}
      <span className="text-lg font-semibold tabular-nums text-text-primary">
        {value}
      </span>
      <span className="text-[11px] text-text-muted">{label}</span>
    </div>
  );
}
