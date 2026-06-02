import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "./motion";

/**
 * Reveal — wraps children in a stagger container so each child marked with
 * `variants={fadeInUp}` animates in sequence. Honours prefers-reduced-motion
 * via the MotionConfig set at the app root.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerContainer} initial="hidden" animate="show">
      {children}
    </motion.div>
  );
}
