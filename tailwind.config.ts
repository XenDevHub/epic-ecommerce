import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6C47FF",
          light: "#8B6BFF",
          dark: "#4D2EE8",
        },
        accent: {
          DEFAULT: "#00D4AA",
          2: "#FF3D71",
          3: "#FF6B35",
        },
        bg: {
          primary: "#0A0A0F",
          secondary: "#12121A",
          card: "#1A1A28",
          "card-hover": "#20203A",
        },
        text: {
          primary: "#F0F0FF",
          secondary: "#9494B8",
          muted: "#5A5A7A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 1.5s infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "rotate-slow": "rotateSlow 8s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(108, 71, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(108, 71, 255, 0.6)" },
        },
        rotateSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(108, 71, 255, 0.15)",
        "glow-accent": "0 0 30px rgba(0, 212, 170, 0.2)",
        card: "0 8px 32px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
