import { Card } from "@/shared/ui";
import { motion } from "framer-motion";
import { Reveal } from "@/shared/ui/Reveal";
import { fadeInUp } from "@/shared/ui/motion";
import { formatMoney } from "@/shared/config/currency";
import { cn } from "@/shared/lib/cn";
import type { Totals } from "@/entities/transaction";

export function StatCards({ totals, budget }: { totals: Totals; budget: number }) {
  const budgetLeft = budget - totals.expense;
  const items = [
    { label: "Баланс", value: totals.balance, tone: "text-white" },
    { label: "Доходы", value: totals.income, tone: "text-trading-up" },
    { label: "Расходы", value: totals.expense, tone: "text-trading-down" },
    { label: "Остаток бюджета", value: budgetLeft, tone: budgetLeft < 0 ? "text-trading-down" : "text-primary" },
  ];
  return (
    <Reveal className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((i) => (
        <motion.div key={i.label} variants={fadeInUp}>
          <Card className="p-5">
            <p className="text-[13px] text-muted">{i.label}</p>
            <p className={cn("tabular mt-1 text-2xl font-bold", i.tone)}>{formatMoney(i.value)}</p>
          </Card>
        </motion.div>
      ))}
    </Reveal>
  );
}
