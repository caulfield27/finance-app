import { storage } from "@/shared/lib/storage";
import type { Goal, Transaction } from "@/shared/model/types";
import { seedGoals, seedTransactions } from "./seed";

/**
 * Mock persistence layer. In production these functions would hit a REST/GraphQL
 * backend; here they read/write localStorage with simulated network latency so
 * TanStack Query caching, loading and mutation states behave realistically.
 */
const KEYS = { tx: "fa.transactions", goals: "fa.goals" } as const;
const latency = () => new Promise((r) => setTimeout(r, 250 + Math.random() * 250));

function ensureSeed() {
  if (localStorage.getItem(KEYS.tx) === null) storage.set(KEYS.tx, seedTransactions);
  if (localStorage.getItem(KEYS.goals) === null) storage.set(KEYS.goals, seedGoals);
}

export const db = {
  async getTransactions(): Promise<Transaction[]> {
    ensureSeed();
    await latency();
    return storage.get<Transaction[]>(KEYS.tx, []);
  },
  async saveTransactions(tx: Transaction[]): Promise<Transaction[]> {
    await latency();
    storage.set(KEYS.tx, tx);
    return tx;
  },
  async getGoals(): Promise<Goal[]> {
    ensureSeed();
    await latency();
    return storage.get<Goal[]>(KEYS.goals, []);
  },
  async saveGoals(goals: Goal[]): Promise<Goal[]> {
    await latency();
    storage.set(KEYS.goals, goals);
    return goals;
  },
};
