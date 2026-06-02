import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/cn";

const LINKS = [
  { to: "/", label: "Обзор", icon: "📊", end: true },
  { to: "/transactions", label: "Операции", icon: "💸" },
  { to: "/savings", label: "Цели", icon: "🎯" },
  { to: "/settings", label: "Ещё", icon: "⚙️" },
];

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-hairline-dark bg-canvas-dark lg:hidden">
      {LINKS.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.end}
          className={({ isActive }) => cn(
            "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px]",
            isActive ? "text-primary" : "text-muted",
          )}>
          <span className="text-lg">{l.icon}</span>{l.label}
        </NavLink>
      ))}
    </nav>
  );
}
