module.exports = {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: { center: true },
    extend: {
      fontSize: {
        "heading-1": [
          "112px",
          {
            lineHeight: "160%",
            letterSpacing: "-2%",
          },
        ],
        "heading-2": [
          "86px",
          {
            lineHeight: "160%",
            letterSpacing: "-2%",
          },
        ],
        "heading-3": [
          "64px",
          {
            lineHeight: "120%",
            letterSpacing: "-2%",
          },
        ],
        "heading-4": [
          "48px",
          {
            lineHeight: "140%",
            letterSpacing: "-2%",
          },
        ],
        "heading-5": [
          "36px",
          {
            lineHeight: "95%",
            letterSpacing: "-2%",
          },
        ],
        "heading-6": [
          "32px",
          {
            lineHeight: "95%",
            letterSpacing: "-2%",
          },
        ],
        "body-1": [
          "16px",
          {
            letterSpacing: "0%",
            lineHeight: "160%",
          },
        ],
        "body-2": [
          "14px",
          {
            letterSpacing: "0%",
            lineHeight: "150%",
          },
        ],
        "body-3": [
          "12px",
          {
            letterSpacing: "0%",
            lineHeight: "155%",
          },
        ],
        "body-4": [
          "10px",
          {
            letterSpacing: "0%",
            lineHeight: "155%",
          },
        ],
      },
      fontFamily: {
        manrope: ["Manrope", "system-ui"],
      },
      colors: {
        "gray--700": "#4D4D4D",
        "gray--400": "#999999",
        "gray--200": "#CCCCCC",
        skyblue: "#74A0C1",
        "leaf-green": "#176100",
        "peach--blossom": "#C59986",
        "red-love": "#DE5742",
        motherland: "#292221",
        vulcanic: "#F3F2EC",
      },
      padding: {
        max: "224px",
        section: "24px",
        xxl: "126px",
        xl: "84px",
        x: "56px",
        lg: "28px",
        md: "24px",
      },
      margin: {
        section: "24px",
        xxl: "126px",
        xl: "84px",
        x: "56px",
        lg: "28px",
        md: "24px",
      },
      letterSpacing: {
        base: "-0.02em",
      },
      lineHeight: {
        primary: "26px",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
