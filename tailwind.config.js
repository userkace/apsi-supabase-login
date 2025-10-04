/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#3B82F6', // A nice blue color
            dark: '#2563EB',
            light: '#60A5FA',
          },
          dark: '#1F2937', // For text
          light: '#F9FAFB', // For backgrounds
        },
      },
    },
  }
