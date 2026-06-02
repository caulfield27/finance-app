import { useEffect, useRef } from "react";
import { useGoals } from "@/entities/goal";
import { goalsNeedingNudge } from "@/entities/goal/selectors";
import { useSettings } from "@/entities/account";
import { notifications } from "./notify";

const CHECK_INTERVAL = 60_000; // re-check every minute

/**
 * Background reminder loop. While the app is open it checks once a minute
 * whether any active goal has not received a contribution today and, once the
 * goal's reminderTime has passed, fires a single push per goal per day.
 *
 * A real product would register a Service Worker + Push API so reminders fire
 * even when the tab is closed; this client-side loop is the in-app equivalent.
 */
export function useReminders() {
  const { data: goals = [] } = useGoals();
  const remindersEnabled = useSettings((s) => s.remindersEnabled);
  const firedToday = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!remindersEnabled) return;

    const tick = () => {
      const now = new Date();
      const stamp = now.toISOString().slice(0, 10);
      for (const goal of goalsNeedingNudge(goals)) {
        const key = `${goal.id}:${stamp}`;
        if (firedToday.current.has(key)) continue;
        const [h, m] = (goal.reminderTime ?? "20:00").split(":").map(Number);
        const due = now.getHours() > h || (now.getHours() === h && now.getMinutes() >= m);
        if (due) {
          notifications.show(
            `Не забудь про цель «${goal.title}» ${goal.emoji}`,
            "Ты ещё не пополнял её сегодня. Даже небольшой вклад приближает результат!",
          );
          firedToday.current.add(key);
        }
      }
    };

    tick();
    const interval = setInterval(tick, CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, [goals, remindersEnabled]);
}
