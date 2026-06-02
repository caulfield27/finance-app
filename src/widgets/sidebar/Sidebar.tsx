import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/cn";

const LINKS = [
  { to: "/", label: "Обзор", icon: "📊", end: true },
  { to: "/transactions", label: "Операции", icon: "💸" },
  { to: "/savings", label: "Накопления", icon: "🎯" },
  { to: "/settings", label: "Настройки", icon: "⚙️" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-hairline-dark bg-canvas-dark p-4 lg:flex">
      <div className="mb-8 flex items-center gap-2 px-2">
        <span className="text-2xl">💰</span>
        <span className="text-lg font-bold text-primary">Finance<span className="text-white">App</span></span>
      </div>
      <nav className="space-y-1">
        {LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end}
            className={({ isActive }) => cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              isActive ? "bg-surface-card text-white" : "text-muted hover:text-white",
            )}>
            <span>{l.icon}</span>{l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
