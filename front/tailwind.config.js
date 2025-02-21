module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#010a01',
        'text-light': '#010a01',
        'background': '#f1efe9',
        'primary-button': '#f8f7f2',
        'window': '#f8f7f2',
        'secondary-button': '#edebe4',
        'accent': '#452b1a',
      },
      boxShadow: {
        'inner-lg': 'inset 0 4px 8px 0 rgba(0, 0, 0, 0.2)', // Increase opacity for better visibility in dark mode
        'lg': '0 4px 8px 0 rgba(0, 0, 0, 0.2)', // Increase opacity for better visibility in dark mode
        'inner-outer-lg': '0 4px 8px 0 rgba(0, 0, 0, 0.2), inset 0 4px 8px 0 rgba(0, 0, 0, 0.2)', // Increase opacity for better visibility in dark mode
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

