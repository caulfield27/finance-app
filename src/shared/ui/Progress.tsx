import { cn } from "@/shared/lib/cn";

export function Progress({ value, color = "#fcd535", className }: { value: number; color?: string; className?: string }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-pill bg-surface-elevated", className)}>
      <div className="h-full rounded-pill transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}
