import { useSettings } from "@/entities/account";
import { Button } from "@/shared/ui";

export function Header({ onQuickAdd }: { onQuickAdd: () => void }) {
  const userName = useSettings((s) => s.userName);
  return (
    <header className="flex h-16 items-center justify-between border-b border-hairline-dark px-5">
      <div>
        <p className="text-[13px] text-muted">Привет,</p>
        <h1 className="text-base font-semibold text-white">{userName} 👋</h1>
      </div>
      <Button size="sm" onClick={onQuickAdd}>+ Операция</Button>
    </header>
  );
}
