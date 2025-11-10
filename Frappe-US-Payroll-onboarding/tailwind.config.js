/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    {
      pattern:
        /(bg|text|border|hover:bg|hover:text|focus:ring)-(frappe-blue|frappe-gray|red|green|yellow|gray|indigo)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /(rounded|shadow|ring|transition|duration-\d+|opacity-\d+|focus:outline-none|focus:ring-offset-2|cursor-not-allowed|disabled|p-\d+|px-\d+|py-\d+)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        "frappe-gray": {
          50: "#fafafa",
          100: "#f4f5f7",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        "frappe-blue": {
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
    },
  },
  plugins: [],
};
