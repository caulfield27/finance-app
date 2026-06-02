export type TransactionType = "expense" | "income";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  categoryId: string;
  note?: string;
  date: string; // ISO
  createdAt: string;
}

export interface Goal {
  id: string;
  title: string;
  target: number;
  saved: number;
  emoji: string;
  color: string;
  deadline?: string; // ISO
  createdAt: string;
  contributions: Contribution[];
  /** reminders fire daily at this HH:mm if no contribution today */
  reminderTime?: string;
}

export interface Contribution {
  id: string;
  amount: number;
  date: string; // ISO
}
