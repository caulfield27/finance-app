import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContribute } from "@/entities/goal";
import { Button, Input } from "@/shared/ui";

const schema = z.object({ amount: z.coerce.number().positive("Введите сумму") });
type Form = z.infer<typeof schema>;

const QUICK = [500, 1000, 5000, 10000];

export function ContributeForm({ goalId, onDone }: { goalId: string; onDone?: () => void }) {
  const contribute = useContribute();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async ({ amount }) => {
    await contribute.mutateAsync({ goalId, amount });
    onDone?.();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {QUICK.map((q) => (
          <button key={q} type="button" onClick={() => setValue("amount", q, { shouldValidate: true })}
            className="rounded-sm border border-hairline-dark px-3 py-1.5 text-[13px] text-body hover:border-primary hover:text-primary">
            +{q.toLocaleString("ru-RU")}
          </button>
        ))}
      </div>
      <Input label="Сумма пополнения" type="number" placeholder="0" error={errors.amount?.message} {...register("amount")} />
      <Button type="submit" className="w-full" variant="up" disabled={contribute.isPending}>
        {contribute.isPending ? "Пополняю…" : "Пополнить"}
      </Button>
    </form>
  );
}
