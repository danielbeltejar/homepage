/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js,svg}"],
  theme: {
    extend: {
      colors: {
        'text': '#010a01',
        'background': '#f1efe9',
        'primary-button': '#bb9681',
        'window': '#f8f7f2',
        'secondary-button': '#E2DED1',
        'accent': '#452b1a',
      },
      spacing: {
        '3xs': 'var(--space-3xs)',
        '2xs': 'var(--space-2xs)',
        xs: 'var(--space-xs)',
        s: 'var(--space-s)',
        m: 'var(--space-m)',
        l: 'var(--space-l)',
        xl: 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
        '3xs-2xs': 'var(--space-3xs-2xs)',
        '2xs-xs': 'var(--space-2xs-xs)',
        'xs-s': 'var(--space-xs-s)',
        's-m': 'var(--space-s-m)',
        'm-l': 'var(--space-m-l)',
        'l-xl': 'var(--space-l-xl)',
        'xl-2xl': 'var(--space-xl-2xl)',
        '2xl-3xl': 'var(--space-2xl-3xl)',
        's-l': 'var(--space-s-l)',
      },
      fontSize: {
        '12': 'var(--step--2)',
        '11': 'var(--step--1)',
        '0': 'var(--step-0)',
        '1': 'var(--step-1)',
        '2': 'var(--step-2)',
        '3': 'var(--step-3)',
        '4': 'var(--step-4)',
        '5': 'var(--step-5)',
      },

    },
  },
  plugins: [],
}

