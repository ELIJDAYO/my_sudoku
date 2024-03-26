/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit', // Enable Just-in-Time mode for faster builds
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx'], // Specify paths for Tailwind CSS to scan for classes
  darkMode: 'class', // Enable dark mode support
  theme: {
    extend: {
      // Add your custom theme extensions here
    },
  },
  variants: {
    extend: {
      // Add your custom variant extensions here
    },
  },
  plugins: [
    // Add any Tailwind CSS plugins you want to use here
    // For example, '@tailwindcss/typography', '@tailwindcss/forms', etc.
  ],
};
