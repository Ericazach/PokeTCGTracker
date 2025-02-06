/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

const colors = require("tailwindcss/colors");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sea_green: { DEFAULT: '#4F9263', 100: '#101d14', 200: '#1f3a27', 300: '#2f583b', 400: '#3f754f', 500: '#4f9263', 600: '#6aaf7f', 700: '#90c39f', 800: '#b5d7bf', 900: '#daebdf' },
        light_sea_green: { DEFAULT: '#40AFA6', 100: '#0d2321', 200: '#1a4642', 300: '#276963', 400: '#348c85', 500: '#40afa6', 600: '#61c5bc', 700: '#89d3cd', 800: '#b0e2de', 900: '#d8f0ee' },
        verdigris: { DEFAULT: '#32A0A4', 100: '#0a2021', 200: '#144042', 300: '#1e6062', 400: '#288083', 500: '#32a0a4', 600: '#4ac3c7', 700: '#77d2d5', 800: '#a4e1e3', 900: '#d2f0f1' },
        sage: { DEFAULT: '#B4B477', 100: '#272715', 200: '#4e4e2b', 300: '#747440', 400: '#9b9b55', 500: '#b4b477', 600: '#c4c493', 700: '#d2d2ae', 800: '#e1e1c9', 900: '#f0f0e4' },
        carrot_orange: { DEFAULT: '#F1983D', 100: '#381e04', 200: '#713c08', 300: '#a95a0c', 400: '#e17810', 500: '#f1983d', 600: '#f4ab63', 700: '#f7c08a', 800: '#fad5b1', 900: '#fcead8' }
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ["var(--font-dm-serif-text)", "serif"], // Add DM Serif Text
      },
    },
  },
  plugins: [addVariablesForColors],
};


function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}