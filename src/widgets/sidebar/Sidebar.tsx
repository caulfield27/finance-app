import { NavLink } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Target, Settings, Wallet } from "lucide-react";
import { cn } from "@/shared/lib/cn";

const LINKS = [
  { to: "/", label: "Обзор", icon: LayoutDashboard, end: true },
  { to: "/transactions", label: "Операции", icon: ArrowLeftRight },
  { to: "/savings", label: "Накопления", icon: Target },
  { to: "/settings", label: "Настройки", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-hairline-dark bg-canvas-dark p-4 lg:flex">
      <div className="mb-8 flex items-center gap-2 px-2">
        <Wallet className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold text-primary">Finance<span className="text-white">App</span></span>
      </div>
      <nav className="space-y-1">
        {LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) => cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              isActive ? "bg-surface-card text-white" : "text-muted hover:text-white",
            )}>
            <Icon className="h-[18px] w-[18px]" />{label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
