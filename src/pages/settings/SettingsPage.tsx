import { useSettings } from "@/entities/account";
import { notifications } from "@/features/reminders";
import { Button, Card, CardTitle, Input } from "@/shared/ui";
import { useState } from "react";

export function SettingsPage() {
  const s = useSettings();
  const [permState, setPermState] = useState(notifications.permission());

  const enableNotifications = async () => {
    const ok = await notifications.request();
    setPermState(notifications.permission());
    if (ok) notifications.show("Уведомления включены ✅", "Будем напоминать про цели, если ты забудешь пополнить.");
  };

  return (
    <div className="max-w-lg space-y-5">
      <Card>
        <CardTitle className="mb-4">Профиль</CardTitle>
        <div className="space-y-3">
          <Input label="Имя" value={s.userName} onChange={(e) => s.setUserName(e.target.value)} />
          <Input label="Месячный бюджет на расходы" type="number"
            value={s.monthlyBudget} onChange={(e) => s.setMonthlyBudget(Number(e.target.value))} />
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-muted-strong">Валюта</span>
            <select value={s.currency} onChange={(e) => s.setCurrency(e.target.value)}
              className="h-10 w-full rounded-md border border-hairline-dark bg-surface-elevated px-4 text-sm text-white">
              <option value="RUB">₽ Рубль</option>
              <option value="USD">$ Доллар</option>
              <option value="EUR">€ Евро</option>
              <option value="KZT">₸ Тенге</option>
            </select>
          </label>
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-1">Напоминания о целях</CardTitle>
        <p className="mb-4 text-[13px] text-muted">
          Если ты не пополнил цель за день, приложение пришлёт push-уведомление в заданное время.
        </p>
        <div className="flex items-center justify-between rounded-md bg-surface-elevated px-4 py-3">
          <span className="text-sm text-body">Напоминания включены</span>
          <button onClick={() => s.setRemindersEnabled(!s.remindersEnabled)}
            className={`relative h-6 w-11 rounded-pill transition-colors ${s.remindersEnabled ? "bg-trading-up" : "bg-muted"}`}>
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${s.remindersEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>
        {permState !== "granted" && (
          <Button variant="secondary" className="mt-3 w-full" onClick={enableNotifications}>
            Разрешить push-уведомления в браузере
          </Button>
        )}
        {permState === "granted" && (
          <p className="mt-3 text-[13px] text-trading-up">✅ Браузер разрешил уведомления</p>
        )}
        {permState === "denied" && (
          <p className="mt-2 text-[12px] text-muted">Уведомления заблокированы в настройках браузера — включи их вручную.</p>
        )}
      </Card>
    </div>
  );
}
