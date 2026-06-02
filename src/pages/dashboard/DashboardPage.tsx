import { useTransactions, getTotals, TransactionItem, useDeleteTransaction } from "@/entities/transaction";
import { useGoals, GoalCard, goalsNeedingNudge } from "@/entities/goal";
import { useSettings } from "@/entities/account";
import { StatCards } from "@/widgets/dashboard/StatCards";
import { SpendingByCategory } from "@/widgets/dashboard/SpendingByCategory";
import { CashflowTrend } from "@/widgets/dashboard/CashflowTrend";
import { GoalContributionChart } from "@/widgets/dashboard/GoalContributionChart";
import { Card, CardTitle } from "@/shared/ui";
import { Bell } from "lucide-react";

export function DashboardPage() {
  const { data: tx = [], isLoading } = useTransactions();
  const { data: goals = [] } = useGoals();
  const del = useDeleteTransaction();
  const budget = useSettings((s) => s.monthlyBudget);

  const totals = getTotals(tx);
  const nudges = goalsNeedingNudge(goals);

  if (isLoading) return <p className="text-muted">Загрузка…</p>;

  return (
    <div className="space-y-5">
      <StatCards totals={totals} budget={budget} />

      {nudges.length > 0 && (
        <Card className="flex items-center gap-3 border-primary/30 bg-primary/5">
          <Bell className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-body">
            У тебя <span className="font-semibold text-primary">{nudges.length}</span>{" "}
            {nudges.length === 1 ? "цель ждёт" : "целей ждут"} пополнения сегодня:{" "}
            {nudges.map((g) => g.title).join(", ")}
          </p>
        </Card>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        <CashflowTrend tx={tx} />
        <SpendingByCategory tx={tx} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <GoalContributionChart goals={goals} />
        <Card>
          <CardTitle className="mb-3">Последние операции</CardTitle>
          <div>
            {tx.slice(0, 6).map((t) => <TransactionItem key={t.id} tx={t} onDelete={del.mutate} />)}
            {tx.length === 0 && <p className="py-8 text-center text-sm text-muted">Нет операций</p>}
          </div>
        </Card>
      </div>

      {goals.length > 0 && (
        <div>
          <h2 className="mb-3 text-base font-semibold text-white">Твои цели</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((g) => <GoalCard key={g.id} goal={g} />)}
          </div>
        </div>
      )}
    </div>
  );
}
