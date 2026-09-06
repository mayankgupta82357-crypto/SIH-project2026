/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#060913",
          900: "#0b1120",
          850: "#10182c",
          800: "#15213b",
          700: "#1e3156",
          600: "#2a4374"
        },
        cascade: {
          red: "#ef4444",
          amber: "#f59e0b",
          cyan: "#06b6d4",
          emerald: "#10b981",
          purple: "#8b5cf6",
          blue: "#3b82f6"
        }
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "flow": "flow 2s linear infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite"
      },
      keyframes: {
        flow: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      }
    },
  },
  plugins: [],
}
