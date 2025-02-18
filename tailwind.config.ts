import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindTypography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        grayish: "#F0F2F5",
        white: "#fefefe",
        blue: "#000E5C",
        "gray-50": "#F9FAFB",
        "gray-75": "#F7F9FC",
        "gray-100": "#F7F9FC",
        "gray-200": "#F0F2F5",
        "gray-300": "#E4E7EC",
        "gray-400": "#D0D5DD",
        "gray-500": "#667185",
        "gray-600": "#475367",
        "gray-700": "#344054",
        "gray-800": "#1D2739",
        "gray-900": "#101928",
        "main-color-50": "#FFF8ED",
        "main-color-100": "#FFEED4",
        "main-color-200": "#FFE4BA",
        "main-color-300": "#FFCF87",
        "main-color-400": "#FFBB54",
        "main-color-500": "#FFA722",
        "main-color-600": "#CC7D06",
        "main-color-700": "#995E05",
        "main-color-800": "#663F03",
        "main-color-900": "#331F02",
        "success-200": "#5FC381",
        "success-600": "#04802E",
        "success-700": "#036B26",
        "success-800": "#015B20",
        "success-900": "#04172B",
        "warning-200": "#F7C164",
        "warning-600": "#AD6F07",
        "warning-700": "#865503",
        "warning-800": "#664101",
        "warning-900": "#523300",
        "error-200": "#E26E6A",
        "error-600": "#BA110B",
        "error-700": "#9E0A05",
        "error-800": "#800501",
        "error-900": "#591000",
        "shadow-xl":
          "box-shadow: 0px 8px 8px -4px #10192808,0px 24px 32px -4px #10192814",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        varela: ["var(--font-varela-round)"],
        sora: ["var(--font-sora)"],
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindTypography],
} satisfies Config;
