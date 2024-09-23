/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm':'360px',
      'md':'640px',
      'lg':'1024px'
    },
    container: {
      center: true,
      padding: {
        md: "4rem",
        sm: "0.10rem",
      },
      screens: {
        "2xl": "1400px",
        'sm':'360px',
        'md':'640px',
        'lg':'1024px'
      },
    },
  },
  plugins: [],
};
