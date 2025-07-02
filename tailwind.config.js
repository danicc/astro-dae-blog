export default {
  content: ["./src/**/*.{astro,html,js,ts,md,mdx}"],
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#0ea5e9",
              marginBottom: "0.5rem",
              lineHeight: "1.2",
            },
            h2: {
              marginBottom: "0.5rem",
            },
            h3: {
              marginBottom: "0.5rem",
            },
            blockquote: {
              backgroundColor: "#f3f4f6",
              padding: "1rem",
              borderRadius: "0.5rem",
            },
          },
        },
      },
    },
  },
};
