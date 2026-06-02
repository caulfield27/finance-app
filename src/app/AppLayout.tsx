import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/widgets/sidebar/Sidebar";
import { MobileNav } from "@/widgets/sidebar/MobileNav";
import { Header } from "@/widgets/header/Header";
import { Modal } from "@/shared/ui";
import { AddTransactionForm } from "@/features/add-transaction/AddTransactionForm";
import { useReminders } from "@/features/reminders";

export function AppLayout() {
  const [quickAdd, setQuickAdd] = useState(false);
  useReminders(); // background nudge loop

  return (
    <div className="flex min-h-screen bg-canvas-dark">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onQuickAdd={() => setQuickAdd(true)} />
        <main className="flex-1 p-5 pb-24 lg:pb-5">
          <Outlet />
        </main>
      </div>
      <MobileNav />

      <Modal open={quickAdd} onClose={() => setQuickAdd(false)} title="Новая операция">
        <AddTransactionForm onDone={() => setQuickAdd(false)} />
      </Modal>
    </div>
  );
}
