import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "default" | "accent" | "green" | "yellow" | "red";

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-stroke-hairline bg-bg2 text-text-secondary",
  accent: "border-accent/30 bg-accent-dim text-accent",
  green: "border-f1-green/30 bg-f1-green-dim text-f1-green",
  yellow: "border-f1-yellow/30 bg-f1-yellow-dim text-f1-yellow",
  red: "border-f1-red/30 bg-f1-red-dim text-f1-red",
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium leading-none",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
