import { type ReactNode, useEffect } from "react";
import { cn } from "@/shared/lib/cn";

interface Props { open: boolean; onClose: () => void; title?: string; children: ReactNode; }

export function Modal({ open, onClose, title, children }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={cn("relative z-10 w-full max-w-md rounded-xl bg-surface-card p-6 border border-hairline-dark",
        "max-h-[90vh] overflow-y-auto")}>
        {title && <h2 className="mb-4 text-xl font-semibold text-white">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
