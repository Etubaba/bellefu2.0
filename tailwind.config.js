module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bellefuGreen: "#76BA1B",
        bellefuGreenWithOpacity: "rgba(118, 186, 27, 0.6)",
        bellefuOrange: "#FFA500",
        bellefuBackground: "#F9F9F9",
        bellefuWhite: "#FCFFF9",
        bellefuBlack1: "#3F3F3F",
        bellefuTitleBlack: "#383838",
      },
      fontFamily: {
        poppins: ["Poppins", "system-ui"],
      },



      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(-200px)",
            transform: "translateX(-200px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0px)",
            transform: "translateX(0px)",
          },
        },
        'shake': {
          "10%": { transform: "rotate(15deg)" },
          "20%": { transform: "rotate(-15deg)" },
          "30%": { transform: "rotate(15deg)" },
          "50%": { transform: "rotate(0deg)" },
        },

        "slide-fwd": {
          "0%": {
            "-webkit-transform": "translateZ(0px)",
            transform: "translateZ(0px)",
          },
          "100%": {
            "-webkit-transform": "translateZ(160px)",
            transform: "translateZ(160px)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
        "slide-fwd":
          " slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        'shake': "shake 1s ease-in-out infinite",
      },
      transitionProperty: {
        height: "height",
      },


















    },
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "active"],
  },
  plugins: [],
};
