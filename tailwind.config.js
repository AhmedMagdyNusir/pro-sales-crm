import { breakboints } from './src/utils/utils';

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: breakboints,
    extend: {
      colors: {
        pro: {
          50: '#F2F0FF', // Light Background
          100: '#ECE8FF', // Light Background Hover
          200: '#8065FF', // Dark Background Hover
          300: '#7050FF', // Dark Background (Default Color)
        },
      },
      animation: {
        'spin-fast': 'spin 0.5s linear infinite',
        'spin-medium': 'spin 1.5s linear infinite',
        'spin-slow': 'spin 2.5s linear infinite',
        'fade-in-fast': 'fade-in 0.25s',
        'fade-in-medium': 'fade-in 0.5s',
        'fade-in-slow': 'fade-in 1s',
        'fade-out-fast': 'fade-out 0.25s',
        'fade-out-medium': 'fade-out 0.5s',
        'fade-out-slow': 'fade-out 1s',
        'progress-fast': 'progress 0.25s',
        'progress-medium': 'progress 0.5s',
        'progress-slow': 'progress 1s',
      },
    },
  },
};
