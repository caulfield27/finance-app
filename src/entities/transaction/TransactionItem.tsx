import { getCategory } from "@/shared/config/categories";
import { formatMoney } from "@/shared/config/currency";
import { humanDate } from "@/shared/lib/date";
import { cn } from "@/shared/lib/cn";
import type { Transaction } from "@/shared/model/types";

export function TransactionItem({ tx, onDelete }: { tx: Transaction; onDelete?: (id: string) => void }) {
  const cat = getCategory(tx.categoryId);
  const positive = tx.type === "income";
  return (
    <div className="group flex items-center gap-3 border-b border-hairline-dark/60 py-3 last:border-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg"
        style={{ backgroundColor: `${cat.color}1a` }}>{cat.emoji}</div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{tx.note || cat.label}</p>
        <p className="text-[12px] text-muted">{cat.label} · {humanDate(tx.date)}</p>
      </div>
      <span className={cn("tabular text-sm font-semibold", positive ? "text-trading-up" : "text-white")}>
        {positive ? "+" : "−"}{formatMoney(tx.amount)}
      </span>
      {onDelete && (
        <button onClick={() => onDelete(tx.id)} aria-label="Удалить"
          className="ml-1 text-muted opacity-0 transition-opacity hover:text-trading-down group-hover:opacity-100">✕</button>
      )}
    </div>
  );
}
