/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      inset: {
        "top-safe-6": ["theme(inset.6)", "calc(env(safe-area-inset-top) + 1.5rem)"],
        "bottom-safe-6": ["theme(inset.6)", "calc(env(safe-area-inset-bottom) + theme(inset.6))"]
      }
    },
  },
  plugins: [],
}
