/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main':'#06B1CF',
        'secondary':'#8CD50A',
        'brand-teal': '#00A896',
        'brand-navy': '#022B3A',
      },
      fontFamily: {
        // Add custom font families
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        // Add custom spacing
        '128': '32rem',
      },
    },
  },
  plugins: [
    // Optional: Add plugins like form styling
    // require('@tailwindcss/forms'),
  ],
}