/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.vue', './src/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-nav-bg-light': '#F1F1F1',
        'logo-container-bg': '#D9D9D9',
        'brand-blue': {
          400: '#3db8ff',
          500: '#1DA1F2',
          600: '#168bca'
        },
        'brand-green': {
          400: '#2df08e',
          500: '#17BF63',
          600: '#128a4f'
        },
        'dark-bg': '#121212',
        'dark-accent': '#1F1F1F',
        'dark-txt': '#EAEAEA',
        success: {
          50: '#EAFCF2',
          100: '#D6FAE4',
          200: '#ACF5C9',
          300: '#83F0AE',
          400: '#59EA93',
          500: '#1CE26B',
          600: '#118C42',
          700: '#0E7537',
          800: '#0C5D2C',
          900: '#094621'
        },
        error: {
          50: '#FCF2F4',
          100: '#FAE5E9',
          200: '#F5CCD3',
          300: '#F0B2BD',
          400: '#EB99A6',
          500: '#E37285',
          600: '#D42A46',
          700: '#B0233A',
          800: '#8D1C2F',
          900: '#6A1523'
        },
        warning: {
          50: '#FDF8EF',
          100: '#FBF2DE',
          200: '#F7E4BE',
          300: '#F4D79D',
          400: '#F0C97D',
          500: '#EAB54C',
          600: '#C48A17',
          700: '#9A6E13',
          800: '#71530F',
          900: '#49370B'
        }
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
