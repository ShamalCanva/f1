"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface LocaleSettings {
  timezone: string;
  locale: string;
  hour12: boolean;
}

interface LocaleContextValue extends LocaleSettings {
  setTimezone: (tz: string) => void;
  setLocale: (locale: string) => void;
  setHour12: (v: boolean) => void;
}

const STORAGE_KEY = "f1-locale";

function getDefaults(): LocaleSettings {
  if (typeof window === "undefined") {
    return { timezone: "UTC", locale: "en-GB", hour12: false };
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    /* ignore */
  }
  const resolved = Intl.DateTimeFormat().resolvedOptions();
  return {
    timezone: resolved.timeZone ?? "UTC",
    locale: navigator.language ?? "en-GB",
    hour12: resolved.hour12 ?? false,
  };
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<LocaleSettings>(getDefaults);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  const setTimezone = useCallback(
    (timezone: string) => setSettings((s) => ({ ...s, timezone })),
    []
  );
  const setLocale = useCallback(
    (locale: string) => setSettings((s) => ({ ...s, locale })),
    []
  );
  const setHour12 = useCallback(
    (hour12: boolean) => setSettings((s) => ({ ...s, hour12 })),
    []
  );

  return (
    <LocaleContext.Provider
      value={{ ...settings, setTimezone, setLocale, setHour12 }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be inside <LocaleProvider>");
  return ctx;
}
