"use client";

import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex gap-1", className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "h-8 rounded-full px-4 text-xs font-medium transition-colors duration-[var(--ease-hover)]",
              "border outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              isActive
                ? "border-accent/30 bg-accent-dim text-accent"
                : "border-stroke-hairline bg-transparent text-text-secondary hover:border-stroke-strong hover:text-text-primary"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
