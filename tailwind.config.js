/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "var(--bg)",
          dark: "var(--bg-2)",
          card: "var(--surface)",
          green: "var(--accent-green)",
          purple: "#8b5cf6",
          pink: "var(--accent-pink)",
          red: "#ff003c",
          cyan: "var(--accent-cyan)",
          ivory: "#d9b885",
          gray: "var(--muted)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-fira-code)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        blink: "blink 1s step-end infinite",
        float: "float 6s ease-in-out infinite",
        "radar-sweep": "radar-sweep 4s linear infinite",
        "fade-in": "fadeIn 0.3s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
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
        "neon-red": "0 0 20px rgba(255, 0, 60, 0.35)",
        "neon-ivory": "0 0 20px rgba(217, 184, 133, 0.25)",
      },
    },
  },
  plugins: [],
};
