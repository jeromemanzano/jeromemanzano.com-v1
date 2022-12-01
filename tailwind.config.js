const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors:{
      transparent: 'transparent',
      currentColor: 'currentColor',
      'mainColor': '#FCEE0A',
      'secondaryColor': '#00F0FF',
      'mainBgColor': '#181818',
      'textColor': '#FFFFFF',
      'textActiveColor': '#FCEE0A',
      'secondaryTextColor': '#CDCDCD',
      'contentBgColor': '#FCEE0A',
      'contentTextColor': '#181818',
      'contentActiveBgColor': '#D40B05',
      'borderColor': '#CDCDCD',
      'activeBorderColor': '#00F0FF',

    },

    extend: {
      fontFamily: {
        'sans': ['Raleway', ...defaultTheme.fontFamily.sans],
        'roboto': ['Roboto', ...defaultTheme.fontFamily.sans]
      },
      screens : {
        'xs' : '420px',
        ...defaultTheme.screens,
      }
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('from', '&.from'),
      addVariant('not-active', '&:not(.active)')
    })
  ],
}

// TODO: Light mode
// 'mainColor': '#FD0130',
// 'secondaryColor': '#CB1DCD',
// 'mainBgColor': '#FCEE0A',
// 'textColor': '#181818',
// 'textActiveColor': '#FCEE0A',
// 'contentBgColor': '#00F0FF',
// 'contentTextColor': '#181818',
// 'contentActiveBgColor': '#D40B05',
// 'borderColor': '#181818',
// 'black': '#181818',
// 'white': '#FFFFFF',
// 'aureolin': '#FCEE0A',
// 'aqua': '#00F0FF',
// 'candyAppleRed': '#D40B05',
// 'steelPink': '#CB1DCD',
// 'frostBite': '#E455AE',
// 'blushingPurple': '#9370DB'

