import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_CURRENCY } from "@/shared/config/currency";

interface SettingsState {
  currency: string;
  monthlyBudget: number;
  remindersEnabled: boolean;
  userName: string;
  setCurrency: (c: string) => void;
  setMonthlyBudget: (n: number) => void;
  setRemindersEnabled: (v: boolean) => void;
  setUserName: (n: string) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      currency: DEFAULT_CURRENCY,
      monthlyBudget: 120000,
      remindersEnabled: true,
      userName: "Гость",
      setCurrency: (currency) => set({ currency }),
      setMonthlyBudget: (monthlyBudget) => set({ monthlyBudget }),
      setRemindersEnabled: (remindersEnabled) => set({ remindersEnabled }),
      setUserName: (userName) => set({ userName }),
    }),
    { name: "fa.settings" },
  ),
);
