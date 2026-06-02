import { useMemo, useState } from "react";
import { useTransactions, useDeleteTransaction, TransactionItem } from "@/entities/transaction";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/shared/config/categories";
import { humanDate } from "@/shared/lib/date";
import { Card } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import { AnimatePresence } from "framer-motion";
import type { TransactionType } from "@/shared/model/types";

type Filter = "all" | TransactionType;

export function TransactionsPage() {
  const { data: tx = [], isLoading } = useTransactions();
  const del = useDeleteTransaction();
  const [filter, setFilter] = useState<Filter>("all");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(
    () => tx.filter((t) => (filter === "all" || t.type === filter) && (category === "all" || t.categoryId === category)),
    [tx, filter, category],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const t of filtered) {
      const key = t.date.slice(0, 10);
      map.set(key, [...(map.get(key) ?? []), t]);
    }
    return [...map.entries()].sort(([a], [b]) => b.localeCompare(a));
  }, [filtered]);

  const cats = filter === "income" ? INCOME_CATEGORIES : filter === "expense" ? EXPENSE_CATEGORIES : [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

  if (isLoading) return <p className="text-muted">Загрузка…</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {(["all", "expense", "income"] as Filter[]).map((f) => (
          <button key={f} onClick={() => { setFilter(f); setCategory("all"); }}
            className={cn("rounded-pill px-4 py-1.5 text-[13px] font-medium transition-colors",
              filter === f ? "bg-primary text-ink" : "bg-surface-card text-muted hover:text-white")}>
            {f === "all" ? "Все" : f === "expense" ? "Расходы" : "Доходы"}
          </button>
        ))}
        <select value={category} onChange={(e) => setCategory(e.target.value)}
          className="ml-auto h-9 rounded-md border border-hairline-dark bg-surface-card px-3 text-[13px] text-white">
          <option value="all">Все категории</option>
          {cats.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>

      {grouped.length === 0 ? (
        <Card><p className="py-12 text-center text-sm text-muted">Ничего не найдено</p></Card>
      ) : (
        grouped.map(([date, items]) => (
          <Card key={date}>
            <p className="mb-2 text-[12px] font-medium uppercase tracking-wide text-muted">{humanDate(date + "T00:00:00.000Z")}</p>
            <AnimatePresence initial={false}>
              {items.map((t) => <TransactionItem key={t.id} tx={t} onDelete={del.mutate} />)}
            </AnimatePresence>
          </Card>
        ))
      )}
    </div>
  );
}
