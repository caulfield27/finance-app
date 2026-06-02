import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { goalSchema, type GoalForm } from "./schema";
import { useAddGoal } from "@/entities/goal";
import { GOAL_ICONS } from "@/shared/config/goalIcons";
import { Button, Input } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

const COLORS = ["#fcd535", "#0ecb81", "#f6465d", "#3b82f6", "#2dbdb6", "#a855f7"];

export function AddGoalForm({ onDone }: { onDone?: () => void }) {
  const add = useAddGoal();
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<GoalForm>({
    resolver: zodResolver(goalSchema),
    defaultValues: { icon: "target", color: "#fcd535", reminderTime: "20:00" },
  });

  const onSubmit = handleSubmit(async (values) => {
    await add.mutateAsync({
      ...values,
      deadline: values.deadline ? new Date(values.deadline).toISOString() : undefined,
    });
    reset();
    onDone?.();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input label="Название цели" placeholder="Например, отпуск" error={errors.title?.message} {...register("title")} />
      <Input label="Сумма цели" type="number" placeholder="0" error={errors.target?.message} {...register("target")} />

      <div>
        <span className="mb-1.5 block text-[13px] font-medium text-muted-strong">Иконка</span>
        <Controller
          control={control}
          name="icon"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {GOAL_ICONS.map(({ key, icon: Icon }) => (
                <button key={key} type="button" onClick={() => field.onChange(key)}
                  className={cn("flex h-10 w-10 items-center justify-center rounded-md border transition-colors",
                    field.value === key ? "border-primary bg-primary/10 text-primary" : "border-hairline-dark text-muted hover:border-muted hover:text-white")}>
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          )}
        />
      </div>

      <div>
        <span className="mb-1.5 block text-[13px] font-medium text-muted-strong">Цвет</span>
        <Controller
          control={control}
          name="color"
          render={({ field }) => (
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button key={c} type="button" onClick={() => field.onChange(c)}
                  style={{ backgroundColor: c }}
                  className={cn("h-8 w-8 rounded-full transition-transform", field.value === c && "ring-2 ring-white scale-110")} />
              ))}
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input label="Дедлайн (необязательно)" type="date" {...register("deadline")} />
        <Input label="Напоминание в" type="time" {...register("reminderTime")} />
      </div>

      <Button type="submit" className="w-full" disabled={add.isPending}>
        {add.isPending ? "Создаю…" : "Создать цель"}
      </Button>
    </form>
  );
}
