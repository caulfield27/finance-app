import type { ComponentType } from "react";

export interface CategoryMeta {
  id: string;
  label: string;
  color: string;
  emoji: string;
}

export const EXPENSE_CATEGORIES: CategoryMeta[] = [
  { id: "food", label: "Еда", color: "#f6465d", emoji: "🍔" },
  { id: "transport", label: "Транспорт", color: "#3b82f6", emoji: "🚗" },
  { id: "housing", label: "Жильё", color: "#2dbdb6", emoji: "🏠" },
  { id: "shopping", label: "Покупки", color: "#fcd535", emoji: "🛍️" },
  { id: "entertainment", label: "Развлечения", color: "#a855f7", emoji: "🎮" },
  { id: "health", label: "Здоровье", color: "#0ecb81", emoji: "💊" },
  { id: "subscriptions", label: "Подписки", color: "#f0b90b", emoji: "🔁" },
  { id: "other", label: "Другое", color: "#707a8a", emoji: "📦" },
];

export const INCOME_CATEGORIES: CategoryMeta[] = [
  { id: "salary", label: "Зарплата", color: "#0ecb81", emoji: "💰" },
  { id: "freelance", label: "Фриланс", color: "#2dbdb6", emoji: "💻" },
  { id: "gift", label: "Подарок", color: "#fcd535", emoji: "🎁" },
  { id: "investment", label: "Инвестиции", color: "#3b82f6", emoji: "📈" },
  { id: "other-income", label: "Другое", color: "#707a8a", emoji: "📦" },
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export function getCategory(id: string): CategoryMeta {
  return ALL_CATEGORIES.find((c) => c.id === id) ?? EXPENSE_CATEGORIES[7];
}

export type IconType = ComponentType<{ className?: string }>;
