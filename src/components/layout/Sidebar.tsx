"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Users,
  Home,
  Flag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui";
import type { RaceSummary } from "@/types";
import { countryFlag } from "@/lib/openf1/helpers";

interface SidebarProps {
  races: RaceSummary[];
}

export function Sidebar({ races }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-stroke-hairline bg-bg1 transition-[width] duration-[var(--ease-panel)]",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      {/* Logo + collapse */}
      <div className="flex h-14 items-center justify-between border-b border-stroke-hairline px-3">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-accent" />
            <span className="text-sm font-bold tracking-tight text-text-primary">
              F1 LIVE
            </span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-bg2 hover:text-text-secondary"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Global nav */}
      <nav className="flex flex-col gap-0.5 p-2">
        <NavItem
          href="/"
          icon={<Home className="h-4 w-4" />}
          label="Home"
          active={pathname === "/"}
          collapsed={collapsed}
        />
        <NavItem
          href="/standings/drivers"
          icon={<Trophy className="h-4 w-4" />}
          label="Drivers"
          active={pathname === "/standings/drivers"}
          collapsed={collapsed}
        />
        <NavItem
          href="/standings/constructors"
          icon={<Users className="h-4 w-4" />}
          label="Constructors"
          active={pathname === "/standings/constructors"}
          collapsed={collapsed}
        />
      </nav>

      {/* Divider */}
      <div className="mx-3 border-t border-stroke-hairline" />

      {/* Race list */}
      <div className="flex-1 overflow-y-auto p-2">
        {!collapsed && (
          <div className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
            2025 Season
          </div>
        )}
        <div className="flex flex-col gap-0.5">
          {races.map((race) => {
            const href = `/race/${race.slug}`;
            const isActive = pathname === href;
            return (
              <Link
                key={race.slug}
                href={href}
                className={cn(
                  "group flex items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-2 text-[13px] transition-colors duration-[var(--ease-hover)]",
                  isActive
                    ? "bg-accent-dim text-accent"
                    : "text-text-secondary hover:bg-bg2/60 hover:text-text-primary"
                )}
              >
                <span className="flex-shrink-0 text-base leading-none">
                  {countryFlag(race.countryCode)}
                </span>
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate">{race.name}</span>
                    {race.state === "live" && (
                      <Badge variant="red" className="ml-auto">
                        LIVE
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

/* ─── Nav item helper ─── */

function NavItem({
  href,
  icon,
  label,
  active,
  collapsed,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-2 text-[13px] font-medium transition-colors duration-[var(--ease-hover)]",
        active
          ? "bg-accent-dim text-accent"
          : "text-text-secondary hover:bg-bg2/60 hover:text-text-primary",
        collapsed && "justify-center px-0"
      )}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
