import { motion } from "framer-motion";
import { getCategory } from "@/shared/config/categories";
import { formatMoney } from "@/shared/config/currency";
import { humanDate } from "@/shared/lib/date";
import { cn } from "@/shared/lib/cn";
import { EASE } from "@/shared/ui/motion";
import { X } from "lucide-react";
import type { Transaction } from "@/shared/model/types";

export function TransactionItem({ tx, onDelete }: { tx: Transaction; onDelete?: (id: string) => void }) {
  const cat = getCategory(tx.categoryId);
  const Icon = cat.icon;
  const positive = tx.type === "income";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="group flex items-center gap-3 overflow-hidden border-b border-hairline-dark/60 py-3 last:border-0"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: `${cat.color}1a`, color: cat.color }}>
        <Icon className="h-[18px] w-[18px]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{tx.note || cat.label}</p>
        <p className="text-[12px] text-muted">{cat.label} · {humanDate(tx.date)}</p>
      </div>
      <span className={cn("tabular text-sm font-semibold", positive ? "text-trading-up" : "text-white")}>
        {positive ? "+" : "−"}{formatMoney(tx.amount)}
      </span>
      {onDelete && (
        <button onClick={() => onDelete(tx.id)} aria-label="Удалить"
          className="ml-1 text-muted opacity-0 transition-opacity hover:text-trading-down group-hover:opacity-100">
          <X className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
}
