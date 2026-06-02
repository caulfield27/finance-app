import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "@/shared/api/db";
import { uid } from "@/shared/lib/id";
import type { Contribution, Goal } from "@/shared/model/types";

const KEY = ["goals"] as const;

export function useGoals() {
  return useQuery({ queryKey: KEY, queryFn: db.getGoals });
}

export type NewGoal = Pick<Goal, "title" | "target" | "icon" | "color" | "deadline" | "reminderTime">;

export function useAddGoal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: NewGoal) => {
      const current = qc.getQueryData<Goal[]>(KEY) ?? (await db.getGoals());
      const goal: Goal = { ...input, id: uid(), saved: 0, contributions: [], createdAt: new Date().toISOString() };
      return db.saveGoals([...current, goal]);
    },
    onSuccess: (data) => qc.setQueryData(KEY, data),
  });
}

export function useContribute() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ goalId, amount }: { goalId: string; amount: number }) => {
      const current = qc.getQueryData<Goal[]>(KEY) ?? (await db.getGoals());
      const contribution: Contribution = { id: uid(), amount, date: new Date().toISOString() };
      const next = current.map((g) =>
        g.id === goalId
          ? { ...g, saved: g.saved + amount, contributions: [...g.contributions, contribution] }
          : g,
      );
      return db.saveGoals(next);
    },
    onSuccess: (data) => qc.setQueryData(KEY, data),
  });
}

export function useDeleteGoal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const current = qc.getQueryData<Goal[]>(KEY) ?? (await db.getGoals());
      return db.saveGoals(current.filter((g) => g.id !== id));
    },
    onSuccess: (data) => qc.setQueryData(KEY, data),
  });
}
