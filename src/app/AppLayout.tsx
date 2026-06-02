import { useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "@/widgets/sidebar/Sidebar";
import { MobileNav } from "@/widgets/sidebar/MobileNav";
import { Header } from "@/widgets/header/Header";
import { Modal } from "@/shared/ui";
import { pageVariants } from "@/shared/ui/motion";
import { AddTransactionForm } from "@/features/add-transaction/AddTransactionForm";
import { useReminders } from "@/features/reminders";

export function AppLayout() {
  const [quickAdd, setQuickAdd] = useState(false);
  const location = useLocation();
  const outlet = useOutlet();
  useReminders(); // background nudge loop

  return (
    <div className="flex min-h-screen bg-canvas-dark">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onQuickAdd={() => setQuickAdd(true)} />
        <main className="flex-1 p-5 pb-24 lg:pb-5">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} variants={pageVariants} initial="hidden" animate="show" exit="exit">
              {outlet}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <MobileNav />

      <Modal open={quickAdd} onClose={() => setQuickAdd(false)} title="Новая операция">
        <AddTransactionForm onDone={() => setQuickAdd(false)} />
      </Modal>
    </div>
  );
}
