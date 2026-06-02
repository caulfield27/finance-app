import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, type TransactionForm } from "./schema";
import { useAddTransaction } from "@/entities/transaction";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/shared/config/categories";
import { Button, Input } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

export function AddTransactionForm({ onDone }: { onDone?: () => void }) {
  const add = useAddTransaction();
  const { register, handleSubmit, watch, control, reset, formState: { errors, isSubmitting } } =
    useForm<TransactionForm>({
      resolver: zodResolver(transactionSchema),
      defaultValues: { type: "expense", date: new Date().toISOString().slice(0, 10), categoryId: "" },
    });

  const type = watch("type");
  const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const onSubmit = handleSubmit(async (values) => {
    await add.mutateAsync({ ...values, date: new Date(values.date).toISOString() });
    reset({ type: values.type, date: new Date().toISOString().slice(0, 10), categoryId: "", amount: undefined, note: "" });
    onDone?.();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <div className="grid grid-cols-2 gap-2 rounded-md bg-surface-elevated p-1">
            {(["expense", "income"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => field.onChange(t)}
                className={cn(
                  "h-9 rounded-sm text-sm font-semibold transition-colors",
                  field.value === t
                    ? t === "expense" ? "bg-trading-down text-white" : "bg-trading-up text-white"
                    : "text-muted hover:text-white",
                )}
              >
                {t === "expense" ? "Расход" : "Доход"}
              </button>
            ))}
          </div>
        )}
      />

      <Input label="Сумма" type="number" step="0.01" placeholder="0" error={errors.amount?.message} {...register("amount")} />

      <div>
        <span className="mb-1.5 block text-[13px] font-medium text-muted-strong">Категория</span>
        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => (
            <div className="grid grid-cols-4 gap-2">
              {categories.map((c) => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => field.onChange(c.id)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-md border p-2 text-[12px] transition-colors",
                      field.value === c.id
                        ? "border-primary bg-primary/10 text-white"
                        : "border-hairline-dark text-muted hover:border-muted",
                    )}
                  >
                    <Icon className="h-5 w-5" style={{ color: field.value === c.id ? c.color : undefined }} />
                    {c.label}
                  </button>
                );
              })}
            </div>
          )}
        />
        {errors.categoryId && <span className="mt-1 block text-[12px] text-trading-down">{errors.categoryId.message}</span>}
      </div>

      <Input label="Заметка (необязательно)" placeholder="За что?" error={errors.note?.message} {...register("note")} />
      <Input label="Дата" type="date" {...register("date")} />

      <Button type="submit" className="w-full" disabled={isSubmitting || add.isPending}>
        {add.isPending ? "Сохраняю…" : "Добавить"}
      </Button>
    </form>
  );
}
