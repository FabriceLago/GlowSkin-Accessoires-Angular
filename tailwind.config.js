/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        sable: '#F7F2EB',
        ivory: '#FFFDF9',
        sauge: {
          DEFAULT: '#A3B18A',
          dark: '#8A9973',
          light: '#C1CBAE',
        },
        terracotta: {
          DEFAULT: '#C98B6B',
          dark: '#B5744F',
          light: '#DCAA8F',
        },
        brun: '#3B332C',
        dore: {
          DEFAULT: '#C9A24D',
          light: '#E0C685',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Cormorant Garamond', 'serif'],
        sans: ['Inter', 'DM Sans', 'sans-serif'],
      },
      borderRadius: {
        xl2: '24px',
      },
      boxShadow: {
        diffuse: '0 20px 60px -20px rgba(59, 51, 44, 0.18)',
        soft: '0 10px 30px -12px rgba(59, 51, 44, 0.12)',
      },
      transitionTimingFunction: {
        'out-smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        kenBurns: 'kenBurns 8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
