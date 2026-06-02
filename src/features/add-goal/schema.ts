import { z } from "zod";

export const goalSchema = z.object({
  title: z.string().min(2, "Минимум 2 символа").max(40, "Слишком длинно"),
  target: z.coerce.number().positive("Цель должна быть больше нуля"),
  emoji: z.string().min(1).max(4).default("🎯"),
  color: z.string().default("#fcd535"),
  deadline: z.string().optional(),
  reminderTime: z.string().default("20:00"),
});

export type GoalForm = z.infer<typeof goalSchema>;
