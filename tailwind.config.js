const { nextui } = require("@nextui-org/react");

import defaultConfig from "tailwindcss/defaultConfig"; // Import konfigurasi default Tailwind

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ungukalam: "#3F1199",
        ungutarang: "#7463FF",
        putihhijau: "#E0F4F4",
        hijautarang: "#6ADAC2",
        hijaukalam: "#00B790",
        bronze: "#964B00",
        greendark: "#263E3E",
        greenlight: "B3BA91",
        whitesedang: "F4F5EF",
        merahtua: "#FF0000",
        abuterang: "#A9A9A9",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        serif: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
        andika: ["Andika"],
      },
      fontSize: {
        // Tambahkan fontSize dari konfigurasi pertama di sini
        ...defaultConfig.theme.fontSize,
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["20px", "28px"],
        xl: ["24px", "32px"],
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover", "focus"],
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            customColor: "#FFAABB",
            anotherCustomColor: "#CCDDFF",
          },
        },
        dark: {
          colors: {
            customColor: "#FFAABB", // Tetapkan warna yang sesuai untuk tema gelap
            anotherCustomColor: "#CCDDFF",
          },
        },
      },
    }),
  ],
};
