import { NavLink } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Target, Settings } from "lucide-react";
import { cn } from "@/shared/lib/cn";

const LINKS = [
  { to: "/", label: "Обзор", icon: LayoutDashboard, end: true },
  { to: "/transactions", label: "Операции", icon: ArrowLeftRight },
  { to: "/savings", label: "Цели", icon: Target },
  { to: "/settings", label: "Ещё", icon: Settings },
];

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-hairline-dark bg-canvas-dark lg:hidden">
      {LINKS.map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end}
          className={({ isActive }) => cn(
            "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px]",
            isActive ? "text-primary" : "text-muted",
          )}>
          <Icon className="h-5 w-5" />{label}
        </NavLink>
      ))}
    </nav>
  );
}
