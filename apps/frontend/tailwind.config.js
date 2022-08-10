module.exports = {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: { center: true },
    extend: {
      fontSize: {
        body: "16px",
      },
      fontFamily: {
        manrope: ["Manrope", "system-ui"],
      },
      colors: {
        gray: "#676767",
      },
      padding: {
        section: "24px",
      },
      letterSpacing: {
        base: "-0.02em",
      },
      lineHeight: {
        primary: "26px",
      },
    },
  },
  plugins: [],
};
