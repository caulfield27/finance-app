import {
  Target, Shield, Plane, Car, Home, Laptop, GraduationCap, Gem, Smartphone,
  PiggyBank, type LucideIcon,
} from "lucide-react";

/** Goals persist to storage, so they store an icon *key* (string), not a component. */
export const GOAL_ICONS: { key: string; icon: LucideIcon }[] = [
  { key: "target", icon: Target },
  { key: "shield", icon: Shield },
  { key: "plane", icon: Plane },
  { key: "car", icon: Car },
  { key: "home", icon: Home },
  { key: "laptop", icon: Laptop },
  { key: "education", icon: GraduationCap },
  { key: "gem", icon: Gem },
  { key: "phone", icon: Smartphone },
  { key: "piggy", icon: PiggyBank },
];

export function getGoalIcon(key: string): LucideIcon {
  return GOAL_ICONS.find((g) => g.key === key)?.icon ?? Target;
}
