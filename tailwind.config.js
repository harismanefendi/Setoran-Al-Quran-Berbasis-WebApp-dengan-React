const { nextui } = require("@nextui-org/react");
const defaultConfig = require("tailwindcss/defaultConfig");

module.exports = {
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
        //setoran color
        greendark: "#1C422D",
        biru: "#042E33",
        krem: "#EFEFCD",
        kuning: "#F5CE12",
        hijau: "#8CB120",
        hijaupakek: "#05704E",
        //
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
    // require("@tailwindcss/forms"),
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
            customColor: "#FFAABB",
            anotherCustomColor: "#CCDDFF",
          },
        },
      },
    }),
  ],
};
