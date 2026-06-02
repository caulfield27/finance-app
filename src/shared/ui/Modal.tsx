import { type ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./motion";
import { cn } from "@/shared/lib/cn";

interface Props { open: boolean; onClose: () => void; title?: string; children: ReactNode; }

export function Modal({ open, onClose, title, children }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className={cn("relative z-10 w-full max-w-md rounded-xl bg-surface-card p-6 border border-hairline-dark",
              "max-h-[90vh] overflow-y-auto")}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {title && <h2 className="mb-4 text-xl font-semibold text-white">{title}</h2>}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
