import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardTitle } from "@/shared/ui";
import { formatMoney } from "@/shared/config/currency";
import type { Transaction } from "@/shared/model/types";
import { byCategory } from "@/entities/transaction";

export function SpendingByCategory({ tx }: { tx: Transaction[] }) {
  const data = byCategory(tx);
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <Card>
      <CardTitle className="mb-4">Расходы по категориям</CardTitle>
      {data.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted">Пока нет расходов</p>
      ) : (
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="relative h-44 w-44 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" innerRadius={58} outerRadius={80} paddingAngle={2} stroke="none">
                  {data.map((d) => <Cell key={d.id} fill={d.color} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#1e2329", border: "1px solid #2b3139", borderRadius: 8, color: "#fff" }}
                  formatter={(v: number) => formatMoney(v)}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[11px] text-muted">Всего</span>
              <span className="tabular text-sm font-semibold text-white">{formatMoney(total)}</span>
            </div>
          </div>
          <ul className="flex-1 space-y-2">
            {data.slice(0, 6).map((d) => (
              <li key={d.id} className="flex items-center gap-2 text-sm">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="flex-1 text-body">{d.emoji} {d.label}</span>
                <span className="tabular text-muted-strong">{((d.value / total) * 100).toFixed(0)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
