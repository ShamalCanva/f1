"use client";

import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { LocaleProvider } from "@/lib/locale/context";
import type { RaceSummary } from "@/types";
import type { ReactNode } from "react";

interface AppShellProps {
  races: RaceSummary[];
  children: ReactNode;
}

export function AppShell({ races, children }: AppShellProps) {
  return (
    <LocaleProvider>
      <div className="flex h-screen overflow-hidden bg-bg0">
        <Sidebar races={races} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </LocaleProvider>
  );
}
