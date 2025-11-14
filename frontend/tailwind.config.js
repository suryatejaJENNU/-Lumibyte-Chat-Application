// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366F1", // main
          600: "#4F46E5", // hover/darker
        },
        accent: {
          50: "#EEF2FF", // sidebar active
          100: "#F3F4FF",
          500: "#6366F1", // same as primary
        },
        ui: {
          bg: "#F9FAFB",
          panel: "#FFFFFF",
          text: "#374151",
        },
      },
      boxShadow: {
        subtle: "0 6px 20px rgba(16,24,40,0.06)",
      },
    },
  },
  plugins: [],
};
