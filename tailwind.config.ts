import type { Config } from "tailwindcss";

/**
 * Design tokens derived from the Binance design system analysis.
 * Single accent (Binance Yellow) carries all primary CTAs and brand voltage.
 * Trading green/red are semantic price-direction tokens only.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#fcd535", active: "#f0b90b", disabled: "#3a3a1f" },
        ink: "#181a20",
        body: "#eaecef",
        muted: { DEFAULT: "#707a8a", strong: "#929aa5" },
        canvas: { dark: "#0b0e11", light: "#ffffff" },
        surface: {
          card: "#1e2329",
          elevated: "#2b3139",
          soft: "#fafafa",
          strong: "#f5f5f5",
        },
        hairline: { dark: "#2b3139", light: "#eaecef" },
        trading: { up: "#0ecb81", down: "#f6465d" },
        info: "#3b82f6",
        turquoise: "#2dbdb6",
      },
      fontFamily: {
        // BinanceNova first, Inter as the open-source substitute
        sans: ["BinanceNova", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        // BinancePlex first, IBM Plex Sans (its open-source basis) as substitute
        number: ["BinancePlex", "IBM Plex Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        xs: "2px", sm: "4px", md: "6px", lg: "8px", xl: "12px", pill: "9999px",
      },
      spacing: {
        section: "80px",
      },
      fontSize: {
        "hero": ["64px", { lineHeight: "1.1", letterSpacing: "-1px", fontWeight: "700" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.5px", fontWeight: "700" }],
        "display-md": ["40px", { lineHeight: "1.15", letterSpacing: "-0.3px", fontWeight: "600" }],
        "display-sm": ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        "number-display": ["40px", { lineHeight: "1.1", letterSpacing: "-0.3px", fontWeight: "700" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
