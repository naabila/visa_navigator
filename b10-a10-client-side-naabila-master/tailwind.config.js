/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'komla':'#ff4500',
      'nil':'#2c3f69'
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui:{
    themes: [
      {
        light: {
          primary: "#2c3f69",
          secondary: "#ff4500",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          "bulu":"#172554",
          error: "#f87272",
        },
        dark: {
          primary: "#ff4500",
          secondary: "#2c3f69",
          neutral: "#ffffff",
          "base-100": "#111827",
          info: "#3abff8",
          "bulu":"#f8fafc",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  }
}
