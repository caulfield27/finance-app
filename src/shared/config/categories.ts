import {
  Utensils, Car, Home, ShoppingBag, Gamepad2, HeartPulse, Repeat, Package,
  Banknote, Laptop, Gift, TrendingUp, PiggyBank, type LucideIcon,
} from "lucide-react";

export interface CategoryMeta {
  id: string;
  label: string;
  color: string;
  icon: LucideIcon;
}

export const EXPENSE_CATEGORIES: CategoryMeta[] = [
  { id: "food", label: "Еда", color: "#f6465d", icon: Utensils },
  { id: "transport", label: "Транспорт", color: "#3b82f6", icon: Car },
  { id: "housing", label: "Жильё", color: "#2dbdb6", icon: Home },
  { id: "shopping", label: "Покупки", color: "#fcd535", icon: ShoppingBag },
  { id: "entertainment", label: "Развлечения", color: "#a855f7", icon: Gamepad2 },
  { id: "health", label: "Здоровье", color: "#0ecb81", icon: HeartPulse },
  { id: "subscriptions", label: "Подписки", color: "#f0b90b", icon: Repeat },
  { id: "other", label: "Другое", color: "#707a8a", icon: Package },
];

export const INCOME_CATEGORIES: CategoryMeta[] = [
  { id: "salary", label: "Зарплата", color: "#0ecb81", icon: Banknote },
  { id: "freelance", label: "Фриланс", color: "#2dbdb6", icon: Laptop },
  { id: "gift", label: "Подарок", color: "#fcd535", icon: Gift },
  { id: "investment", label: "Инвестиции", color: "#3b82f6", icon: TrendingUp },
  { id: "other-income", label: "Другое", color: "#707a8a", icon: PiggyBank },
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export function getCategory(id: string): CategoryMeta {
  return ALL_CATEGORIES.find((c) => c.id === id) ?? EXPENSE_CATEGORIES[7];
}
