import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format, parse } from "date-fns";
import { ru } from "date-fns/locale";
import { Card, CardTitle } from "@/shared/ui";
import { formatCompact, formatMoney } from "@/shared/config/currency";
import type { Transaction } from "@/shared/model/types";
import { monthlyTrend } from "@/entities/transaction";

export function CashflowTrend({ tx }: { tx: Transaction[] }) {
  const data = monthlyTrend(tx).map((d) => ({
    ...d,
    label: format(parse(d.month, "yyyy-MM", new Date()), "LLL", { locale: ru }),
  }));

  return (
    <Card>
      <CardTitle className="mb-4">Доходы и расходы по месяцам</CardTitle>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -16, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="inc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ecb81" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#0ecb81" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f6465d" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#f6465d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#2b3139" vertical={false} />
            <XAxis dataKey="label" stroke="#707a8a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#707a8a" fontSize={12} tickFormatter={formatCompact} tickLine={false} axisLine={false} width={48} />
            <Tooltip
              contentStyle={{ background: "#1e2329", border: "1px solid #2b3139", borderRadius: 8 }}
              labelStyle={{ color: "#fff" }} formatter={(v: number) => formatMoney(v)} />
            <Area type="monotone" dataKey="income" name="Доходы" stroke="#0ecb81" fill="url(#inc)" strokeWidth={2} />
            <Area type="monotone" dataKey="expense" name="Расходы" stroke="#f6465d" fill="url(#exp)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
