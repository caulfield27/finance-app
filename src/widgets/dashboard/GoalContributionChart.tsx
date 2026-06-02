import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Card, CardTitle } from "@/shared/ui";
import { formatCompact, formatMoney } from "@/shared/config/currency";
import type { Goal } from "@/shared/model/types";
import { cumulativeSeries } from "@/entities/goal";

/** Cumulative savings curve across all goals — the "are we on track" view. */
export function GoalContributionChart({ goals }: { goals: Goal[] }) {
  const points = goals
    .flatMap((g) => cumulativeSeries(g).map((p) => ({ date: p.date, amount: p.amount })))
    .sort((a, b) => a.date.localeCompare(b.date));

  let running = 0;
  const data = points.map((p) => {
    running += p.amount;
    return { label: format(parseISO(p.date), "d MMM", { locale: ru }), total: running };
  });

  return (
    <Card>
      <CardTitle className="mb-1">Динамика накоплений</CardTitle>
      <p className="mb-4 text-[13px] text-muted">Совокупный рост всех твоих целей</p>
      {data.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted">Пополни любую цель — здесь появится график</p>
      ) : (
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: -16, right: 8, top: 8 }}>
              <CartesianGrid stroke="#2b3139" vertical={false} />
              <XAxis dataKey="label" stroke="#707a8a" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#707a8a" fontSize={12} tickFormatter={formatCompact} tickLine={false} axisLine={false} width={48} />
              <Tooltip contentStyle={{ background: "#1e2329", border: "1px solid #2b3139", borderRadius: 8 }}
                labelStyle={{ color: "#fff" }} formatter={(v: number) => formatMoney(v)} />
              <Line type="monotone" dataKey="total" name="Накоплено" stroke="#fcd535" strokeWidth={2.5} dot={{ r: 3, fill: "#fcd535" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
