import defaultConfig from "tailwindcss/defaultConfig"; // Import konfigurasi default Tailwind

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
  plugins: [],
};
