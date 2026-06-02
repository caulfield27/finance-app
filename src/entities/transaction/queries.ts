import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "@/shared/api/db";
import { uid } from "@/shared/lib/id";
import type { Transaction } from "@/shared/model/types";

const KEY = ["transactions"] as const;

export function useTransactions() {
  return useQuery({ queryKey: KEY, queryFn: db.getTransactions });
}

export type NewTransaction = Omit<Transaction, "id" | "createdAt">;

export function useAddTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: NewTransaction) => {
      const current = qc.getQueryData<Transaction[]>(KEY) ?? (await db.getTransactions());
      const tx: Transaction = { ...input, id: uid(), createdAt: new Date().toISOString() };
      return db.saveTransactions([tx, ...current]);
    },
    onSuccess: (data) => qc.setQueryData(KEY, data),
  });
}

export function useDeleteTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const current = qc.getQueryData<Transaction[]>(KEY) ?? (await db.getTransactions());
      return db.saveTransactions(current.filter((t) => t.id !== id));
    },
    onSuccess: (data) => qc.setQueryData(KEY, data),
  });
}
