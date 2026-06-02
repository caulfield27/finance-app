import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/app/AppLayout";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { TransactionsPage } from "@/pages/transactions/TransactionsPage";
import { SavingsPage } from "@/pages/savings/SavingsPage";
import { SettingsPage } from "@/pages/settings/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "transactions", element: <TransactionsPage /> },
      { path: "savings", element: <SavingsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
