import { subDays } from "date-fns";
import type { Goal, Transaction } from "@/shared/model/types";
import { uid } from "@/shared/lib/id";

const iso = (daysAgo: number) => subDays(new Date(), daysAgo).toISOString();

export const seedTransactions: Transaction[] = [
  { id: uid(), type: "income", amount: 180000, categoryId: "salary", note: "Зарплата за месяц", date: iso(2), createdAt: iso(2) },
  { id: uid(), type: "expense", amount: 1290, categoryId: "food", note: "Продукты", date: iso(0), createdAt: iso(0) },
  { id: uid(), type: "expense", amount: 590, categoryId: "transport", note: "Такси", date: iso(0), createdAt: iso(0) },
  { id: uid(), type: "expense", amount: 35000, categoryId: "housing", note: "Аренда", date: iso(1), createdAt: iso(1) },
  { id: uid(), type: "expense", amount: 999, categoryId: "subscriptions", note: "Стриминг", date: iso(3), createdAt: iso(3) },
  { id: uid(), type: "expense", amount: 4500, categoryId: "shopping", note: "Одежда", date: iso(4), createdAt: iso(4) },
  { id: uid(), type: "expense", amount: 2100, categoryId: "entertainment", note: "Кино + ужин", date: iso(5), createdAt: iso(5) },
  { id: uid(), type: "expense", amount: 1850, categoryId: "health", note: "Аптека", date: iso(6), createdAt: iso(6) },
];

export const seedGoals: Goal[] = [
  {
    id: uid(), title: "Подушка безопасности", target: 300000, saved: 145000,
    icon: "shield", color: "#0ecb81", deadline: subDays(new Date(), -120).toISOString(),
    createdAt: iso(60), reminderTime: "20:00",
    contributions: [
      { id: uid(), amount: 50000, date: iso(45) },
      { id: uid(), amount: 45000, date: iso(20) },
      { id: uid(), amount: 50000, date: iso(2) },
    ],
  },
  {
    id: uid(), title: "Отпуск в Японии", target: 250000, saved: 60000,
    icon: "plane", color: "#f6465d", deadline: subDays(new Date(), -200).toISOString(),
    createdAt: iso(40), reminderTime: "21:00",
    contributions: [
      { id: uid(), amount: 30000, date: iso(30) },
      { id: uid(), amount: 30000, date: iso(7) },
    ],
  },
  {
    id: uid(), title: "MacBook Pro", target: 220000, saved: 220000,
    icon: "laptop", color: "#fcd535", createdAt: iso(90),
    contributions: [{ id: uid(), amount: 220000, date: iso(10) }],
  },
];
