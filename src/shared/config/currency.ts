export const DEFAULT_CURRENCY = "RUB";

const FORMATTERS: Record<string, Intl.NumberFormat> = {};

export function formatMoney(value: number, currency = DEFAULT_CURRENCY): string {
  if (!FORMATTERS[currency]) {
    FORMATTERS[currency] = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });
  }
  return FORMATTERS[currency].format(value);
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat("ru-RU", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}
