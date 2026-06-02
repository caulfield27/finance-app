import { differenceInCalendarDays, isToday, parseISO } from "date-fns";
import type { Goal } from "@/shared/model/types";

export const progress = (g: Goal) => (g.target > 0 ? (g.saved / g.target) * 100 : 0);
export const isComplete = (g: Goal) => g.saved >= g.target;
export const contributedToday = (g: Goal) => g.contributions.some((c) => isToday(parseISO(c.date)));

export function daysLeft(g: Goal): number | null {
  if (!g.deadline) return null;
  return differenceInCalendarDays(parseISO(g.deadline), new Date());
}

/** Suggested daily contribution to hit the goal by its deadline. */
export function suggestedDaily(g: Goal): number | null {
  const left = daysLeft(g);
  if (left === null || left <= 0) return null;
  const remaining = Math.max(0, g.target - g.saved);
  return Math.ceil(remaining / left);
}

/** Goals that still need attention today (incomplete + not contributed today). */
export function goalsNeedingNudge(goals: Goal[]): Goal[] {
  return goals.filter((g) => !isComplete(g) && !contributedToday(g));
}

/** Cumulative contribution series for charting. */
export function cumulativeSeries(g: Goal) {
  const sorted = [...g.contributions].sort((a, b) => a.date.localeCompare(b.date));
  let running = 0;
  return sorted.map((c) => {
    running += c.amount;
    return { date: c.date, amount: c.amount, total: running };
  });
}
