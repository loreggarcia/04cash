import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        success: "var(--success)",
        "success-foreground": "var(--success-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart1: "var(--chart-1)",
        chart2: "var(--chart-2)",
        chart3: "var(--chart-3)",
        chart4: "var(--chart-4)",
        chart5: "var(--chart-5)",
        panel: "var(--card)",
        panelAlt: "var(--secondary)",
        line: "var(--border)",
        text: "var(--foreground)",
        cyan: "var(--primary)",
        green: "var(--success)",
        amber: "#f6b663",
        critical: "#ff7a7a"
      },
      boxShadow: {
        glow: "0 0 40px rgba(131, 110, 249, 0.18), 0 20px 80px rgba(8, 8, 10, 0.55)"
      },
      backgroundImage: {
        "mesh-radial":
          "radial-gradient(circle at top left, rgba(131, 110, 249, 0.14), transparent 35%), radial-gradient(circle at top right, rgba(0, 209, 111, 0.08), transparent 30%), linear-gradient(180deg, rgba(14, 14, 16, 1) 0%, rgba(10, 10, 12, 1) 100%)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
