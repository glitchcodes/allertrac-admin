/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  darkMode: 'selector',
  daisyui: {
    themes: [
      {
        allertrac: {
          "primary": "#336267",
          "secondary": "#244648",
          "accent": "#343f67",
          "neutral": "#E8EDDF",
          "base-100": "#eceff4",
          "info": "#1c64f2",
          "success": "#057a55",
          "warning": "#e3a008",
          "error": "#e02424",
        },
      }
      // 'nord'
    ]
  },
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    daisyui,
  ],
}

