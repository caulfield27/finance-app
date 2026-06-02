import { RouterProvider } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { router } from "@/app/router";

export function App() {
  return (
    <QueryProvider>
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
    </QueryProvider>
  );
}
