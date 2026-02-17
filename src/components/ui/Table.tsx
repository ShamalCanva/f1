import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ─── Table Root ─── */

interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

/* ─── Head ─── */

export function TableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="border-b border-stroke-hairline text-[11px] font-medium uppercase tracking-wider text-text-muted">
      {children}
    </thead>
  );
}

/* ─── Header Cell ─── */

interface ThProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

export function Th({ children, className, align = "left" }: ThProps) {
  return (
    <th
      className={cn(
        "px-4 py-2.5 font-medium",
        align === "right" && "text-right",
        align === "center" && "text-center",
        className
      )}
    >
      {children}
    </th>
  );
}

/* ─── Body ─── */

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-stroke-hairline">{children}</tbody>;
}

/* ─── Row ─── */

interface TrProps {
  children: ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Tr({ children, active, className, onClick }: TrProps) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        "transition-colors duration-[var(--ease-hover)]",
        "hover:bg-bg2/60",
        active && "border-l-2 border-l-accent bg-bg2/40",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </tr>
  );
}

/* ─── Cell ─── */

interface TdProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  mono?: boolean;
}

export function Td({ children, className, align = "left", mono }: TdProps) {
  return (
    <td
      className={cn(
        "px-4 py-3 text-text-primary",
        align === "right" && "text-right",
        align === "center" && "text-center",
        mono && "tabular-nums font-mono text-[13px]",
        className
      )}
    >
      {children}
    </td>
  );
}
