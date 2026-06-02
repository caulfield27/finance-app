import { monthKey } from "@/shared/lib/date";
import { getCategory } from "@/shared/config/categories";
import type { Transaction } from "@/shared/model/types";

export interface Totals { income: number; expense: number; balance: number; }

export function getTotals(tx: Transaction[]): Totals {
  const income = tx.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expense = tx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return { income, expense, balance: income - expense };
}

export function byCategory(tx: Transaction[]) {
  const map = new Map<string, number>();
  for (const t of tx.filter((x) => x.type === "expense")) {
    map.set(t.categoryId, (map.get(t.categoryId) ?? 0) + t.amount);
  }
  return [...map.entries()]
    .map(([id, value]) => ({ ...getCategory(id), value }))
    .sort((a, b) => b.value - a.value);
}

export function monthlyTrend(tx: Transaction[]) {
  const map = new Map<string, { income: number; expense: number }>();
  for (const t of tx) {
    const k = monthKey(t.date);
    const cur = map.get(k) ?? { income: 0, expense: 0 };
    cur[t.type] += t.amount;
    map.set(k, cur);
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([month, v]) => ({ month, ...v }));
}
