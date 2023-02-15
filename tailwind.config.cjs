/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      aspectRatio: {
        imgv: "5/7",
        imgh: "7/5",
      },
    },
    colors: {
      black: "#121218",
      white: "#F5F5F5",
      lgr: "#99A0A9",
      yellow: "#EDFF00",
    },
  },
  plugins: [],
};
