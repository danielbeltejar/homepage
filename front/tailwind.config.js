module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        'text': '#010a01',
        'text-light': '#010a01',
        'background': '#f1efe9',
        'primary-button': '#f8f7f2',
        'window': '#f8f7f2',
        'secondary-button': '#edebe4',
        'accent': '#452b1a',
        'accent-light': '#6b4532',
        'glow-amber': '#d4a574',
        'glow-rose': '#e8c4b8',
        'glow-sage': '#c5d5c0',
      },
      boxShadow: {
        'inner-lg': 'inset 0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        'lg': '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        'inner-outer-lg': '0 4px 8px 0 rgba(0, 0, 0, 0.2), inset 0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        'elevated': '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.04)',
        'glow': '0 0 40px -8px rgba(69,43,26,0.15), 0 0 80px -16px rgba(212,165,116,0.1)',
        'glow-lg': '0 0 60px -12px rgba(69,43,26,0.2), 0 0 120px -24px rgba(212,165,116,0.12)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05), 0 8px 24px rgba(69,43,26,0.04)',
        'card-hover': '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08), 0 16px 40px rgba(69,43,26,0.06)',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(1deg)' },
          '66%': { transform: 'translateY(10px) rotate(-1deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(30px, -30px) scale(1.05)' },
          '50%': { transform: 'translate(-10px, 20px) scale(0.95)' },
          '75%': { transform: 'translate(-20px, -10px) scale(1.02)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float-slow 20s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

