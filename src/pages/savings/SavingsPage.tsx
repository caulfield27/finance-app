import { useState } from "react";
import { useGoals, useDeleteGoal, GoalCard } from "@/entities/goal";
import { AddGoalForm } from "@/features/add-goal/AddGoalForm";
import { ContributeForm } from "@/features/contribute-goal/ContributeForm";
import { Button, Card, Modal } from "@/shared/ui";
import { formatMoney } from "@/shared/config/currency";
import { Plus, Target } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export function SavingsPage() {
  const { data: goals = [], isLoading } = useGoals();
  const del = useDeleteGoal();
  const [addOpen, setAddOpen] = useState(false);
  const [contributeId, setContributeId] = useState<string | null>(null);

  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = goals.reduce((s, g) => s + g.target, 0);

  if (isLoading) return <p className="text-muted">Загрузка…</p>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Card className="flex-1">
          <p className="text-[13px] text-muted">Накоплено по всем целям</p>
          <p className="tabular mt-1 text-3xl font-bold text-primary">{formatMoney(totalSaved)}</p>
          <p className="tabular mt-1 text-[13px] text-muted">из {formatMoney(totalTarget)}</p>
        </Card>
        <Button className="ml-4" onClick={() => setAddOpen(true)}><Plus className="h-4 w-4" /> Новая цель</Button>
      </div>

      {goals.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 py-12">
          <Target className="h-8 w-8 text-muted" />
          <p className="text-sm text-muted">Создай первую цель и начни копить</p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {goals.map((g) => (
              <GoalCard key={g.id} goal={g} onContribute={setContributeId} onDelete={del.mutate} />
            ))}
          </AnimatePresence>
        </div>
      )}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Новая цель">
        <AddGoalForm onDone={() => setAddOpen(false)} />
      </Modal>

      <Modal open={contributeId !== null} onClose={() => setContributeId(null)} title="Пополнить цель">
        {contributeId && <ContributeForm goalId={contributeId} onDone={() => setContributeId(null)} />}
      </Modal>
    </div>
  );
}
