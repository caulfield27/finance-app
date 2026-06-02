import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["expense", "income"]),
  amount: z.coerce.number().positive("Сумма должна быть больше нуля"),
  categoryId: z.string().min(1, "Выбери категорию"),
  note: z.string().max(120, "Слишком длинное описание").optional(),
  date: z.string().min(1),
});

export type TransactionForm = z.infer<typeof transactionSchema>;
