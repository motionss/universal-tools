/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white30: "#ffffff30",
        dewalt: "#febd16",
        neutral: {
          950: "#0c0c0c",
        },
      },
      spacing: {
        "topbar-height": "var(--topbar-height)",
        inherit: "inherit",
      },
    },
  },
  plugins: [],
};
