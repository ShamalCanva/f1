import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Optional title shown in the card header */
  title?: string;
  /** Optional subtitle shown beside the title */
  subtitle?: string;
  /** Optional right-aligned header controls */
  actions?: ReactNode;
  /** Remove internal padding (useful for tables that go edge-to-edge) */
  flush?: boolean;
}

export function Card({
  children,
  className,
  title,
  subtitle,
  actions,
  flush = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-stroke-hairline bg-bg1",
        "shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-[box-shadow,border-color] duration-[var(--ease-hover)]",
        "hover:border-stroke-strong hover:shadow-[0_2px_8px_rgba(0,0,0,0.5)]",
        "relative overflow-hidden",
        /* subtle radial gradient */
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]",
        "before:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_60%)]",
        className
      )}
    >
      {(title || actions) && (
        <div className="flex items-center justify-between border-b border-stroke-hairline px-5 py-3.5">
          <div className="flex items-baseline gap-2">
            {title && (
              <h3 className="text-sm font-semibold text-text-primary">
                {title}
              </h3>
            )}
            {subtitle && (
              <span className="text-xs text-text-muted">{subtitle}</span>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={cn("relative", !flush && "p-5")}>{children}</div>
    </div>
  );
}
