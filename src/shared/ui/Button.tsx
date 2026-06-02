import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "up" | "down";
type Size = "sm" | "md" | "lg";

interface Props extends HTMLMotionProps<"button"> {
  variant?: Variant;
  size?: Size;
  pill?: boolean;
}

const variants: Record<Variant, string> = {
  primary: "bg-primary text-ink hover:bg-primary-active disabled:bg-primary-disabled disabled:text-muted",
  secondary: "bg-surface-card text-white hover:bg-surface-elevated",
  ghost: "bg-transparent text-body hover:text-white",
  up: "bg-trading-up text-white hover:opacity-90",
  down: "bg-trading-down text-white hover:opacity-90",
};

const sizes: Record<Size, string> = {
  sm: "h-7 px-4 text-[13px]",
  md: "h-10 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", size = "md", pill, className, disabled, ...rest }, ref) => (
    <motion.button
      ref={ref}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info/50",
        "disabled:cursor-not-allowed",
        pill ? "rounded-pill" : "rounded-md",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    />
  ),
);
Button.displayName = "Button";
