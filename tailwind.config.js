/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      "sans-condensed": '"Open Sans Condensed"',
    },
    extend: {
      colors: {
        white30: "#ffffff30",
        dewalt: "#febd17",
        neutral: {
          950: "#0c0c0c",
        },
        pagebg: "#ebebeb",
      },
      spacing: {
        "topbar-height": "var(--topbar-height)",
        inherit: "inherit",
      },
      width: {
        "content-max-width": "var(--content-max-width)",
      },
      maxWidth: {
        "content-max-width": "var(--content-max-width)",
      },
    },
  },
  plugins: [require("tailwindcss-hyphens"), require("@tailwindcss/line-clamp")],
};
