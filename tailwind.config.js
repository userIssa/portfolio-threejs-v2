/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#05070a",       // Obsidian Base
          dark: "#0a0d14",     // Obsidian Dark
          card: "rgba(10, 13, 20, 0.65)",
          green: "#0f766e",    // Surgical Teal
          purple: "#8b5cf6",   // Violet/Indigo
          pink: "#ff2a6d",     // Sakura Red/Pink
          cyan: "#00e5ff",     // Liquid Cyan
          ivory: "#d9b885",    // Warm Ivory/Gold
          gray: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-fira-code)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "blink": "blink 1s step-end infinite",
        "float": "float 6s ease-in-out infinite",
        "radar-sweep": "radar-sweep 4s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "radar-sweep": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      boxShadow: {
        "neon-green": "0 0 20px rgba(15, 118, 110, 0.3)",
        "neon-purple": "0 0 20px rgba(139, 92, 246, 0.3)",
        "neon-cyan": "0 0 20px rgba(0, 229, 255, 0.35)",
        "neon-pink": "0 0 20px rgba(255, 42, 109, 0.35)",
        "neon-ivory": "0 0 20px rgba(217, 184, 133, 0.25)",
      },
    },
  },
  plugins: [],
};
