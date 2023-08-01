/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: '#15202b',
        secondaryBg: '#192734',
        hoverBg: '#22303c',
        primaryTxt: '#ffffff',
        secondaryTxt: '#8899a6',
        primaryTone: "#818cf8",
      },
      fontFamily: {
        nunito: ['Nunito'],
        lexend: ['Lexend'],
      }
    },
  },
  plugins: [],
}
