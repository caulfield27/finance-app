import { format, isToday, isYesterday, parseISO, startOfDay } from "date-fns";
import { ru } from "date-fns/locale";

export const todayISO = () => startOfDay(new Date()).toISOString();

export function humanDate(iso: string): string {
  const d = parseISO(iso);
  if (isToday(d)) return "Сегодня";
  if (isYesterday(d)) return "Вчера";
  return format(d, "d MMMM", { locale: ru });
}

export const monthKey = (iso: string) => format(parseISO(iso), "yyyy-MM");
