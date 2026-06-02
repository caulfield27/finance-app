import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/cn";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, id, ...rest }, ref) => (
    <label className="block">
      {label && <span className="mb-1.5 block text-[13px] font-medium text-muted-strong">{label}</span>}
      <input
        ref={ref}
        id={id}
        className={cn(
          "h-10 w-full rounded-md bg-surface-elevated px-4 text-sm text-white placeholder:text-muted",
          "border border-hairline-dark focus:border-info focus:outline-none focus:ring-2 focus:ring-info/40",
          error && "border-trading-down focus:border-trading-down focus:ring-trading-down/40",
          className,
        )}
        {...rest}
      />
      {error && <span className="mt-1 block text-[12px] text-trading-down">{error}</span>}
    </label>
  ),
);
Input.displayName = "Input";
