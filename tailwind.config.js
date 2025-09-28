/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#bae0ff',
          300: '#7cc7ff',
          400: '#36a9ff',
          500: '#0088ff',
          600: '#0072d6',
          700: '#0058a8',
          800: '#004385',
          900: '#003972',
          950: '#00254d',
        },
        secondary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        categories: {
          physical: {
            light: '#ebf5ff',
            DEFAULT: '#3b82f6',
            dark: '#1d4ed8'
          },
          mental: {
            light: '#faf5ff',
            DEFAULT: '#8b5cf6',
            dark: '#6d28d9'
          },
          social: {
            light: '#ecfdf5',
            DEFAULT: '#10b981',
            dark: '#047857'
          },
          skill: {
            light: '#fff7ed',
            DEFAULT: '#f97316',
            dark: '#c2410c'
          },
          financial: {
            light: '#f0fdfa',
            DEFAULT: '#14b8a6',
            dark: '#0f766e'
          },
          personal: {
            light: '#fdf2f8',
            DEFAULT: '#ec4899',
            dark: '#be185d'
          }
        },
        accent: {
          purple: '#8b5cf6',
          blue: '#3b82f6',
          green: '#10b981',
          orange: '#f97316',
          teal: '#14b8a6',
          pink: '#ec4899',
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
