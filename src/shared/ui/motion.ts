import { type Variants } from "framer-motion";

/** Shared easing — a soft "out" curve used across the app for consistency. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: EASE } },
};

/** Container that staggers its direct motion children. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

/** Page-transition variants for route changes. */
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: EASE } },
};
