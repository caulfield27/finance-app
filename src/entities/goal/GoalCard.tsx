import { formatMoney } from "@/shared/config/currency";
import { getGoalIcon } from "@/shared/config/goalIcons";
import { Progress } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import { Lightbulb, Trash2 } from "lucide-react";
import type { Goal } from "@/shared/model/types";
import { contributedToday, daysLeft, isComplete, progress, suggestedDaily } from "./selectors";

interface Props { goal: Goal; onContribute?: (id: string) => void; onDelete?: (id: string) => void; }

export function GoalCard({ goal, onContribute, onDelete }: Props) {
  const Icon = getGoalIcon(goal.icon);
  const pct = progress(goal);
  const done = isComplete(goal);
  const left = daysLeft(goal);
  const daily = suggestedDaily(goal);
  const needsNudge = !done && !contributedToday(goal);

  return (
    <div className="group rounded-xl bg-surface-card p-5 border border-hairline-dark/60">
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${goal.color}1a`, color: goal.color }}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-white">{goal.title}</h3>
            {done && <span className="rounded-sm bg-trading-up/15 px-1.5 py-0.5 text-[11px] font-semibold text-trading-up">Готово</span>}
            {needsNudge && <span className="rounded-sm bg-primary/15 px-1.5 py-0.5 text-[11px] font-semibold text-primary">Сегодня без пополнения</span>}
          </div>
          <p className="tabular text-[13px] text-muted">
            {formatMoney(goal.saved)} <span className="text-muted/60">из</span> {formatMoney(goal.target)}
          </p>
        </div>
        {onDelete && (
          <button onClick={() => onDelete(goal.id)} aria-label="Удалить цель"
            className="text-muted opacity-0 transition-opacity hover:text-trading-down group-hover:opacity-100">
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <Progress value={pct} color={goal.color} className="mb-2" />

      <div className="mb-4 flex items-center justify-between text-[12px]">
        <span className="tabular font-medium" style={{ color: goal.color }}>{pct.toFixed(0)}%</span>
        {left !== null && (
          <span className={cn("text-muted", left < 0 && "text-trading-down")}>
            {left < 0 ? "просрочено" : `${left} дн. осталось`}
          </span>
        )}
      </div>

      {daily && !done && (
        <p className="mb-3 flex items-center gap-2 rounded-md bg-surface-elevated px-3 py-2 text-[12px] text-muted-strong">
          <Lightbulb className="h-3.5 w-3.5 shrink-0 text-primary" />
          Откладывай по <span className="tabular text-white">{formatMoney(daily)}</span>/день, чтобы успеть
        </p>
      )}

      {onContribute && !done && (
        <button onClick={() => onContribute(goal.id)}
          className="h-9 w-full rounded-md bg-trading-up text-sm font-semibold text-white transition-opacity hover:opacity-90">
          Пополнить
        </button>
      )}
    </div>
  );
}
