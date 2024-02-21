/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'main': 'linear-gradient(266deg, #4E0A7A 0%, #A23BCC 100%);',
        'mains': 'linear-gradient(180deg, #A23BCC 0%, #611C84 90%, #2A0840 100%);',
        'second-main': 'linear-gradient(to left top, #1d266a, #16205a, #0f1b4b, #0a153c, #080d2e);',
        
      },
      backgroundColor: {
        'purple-main': '#721EB1',
        'main-transparent': 'rgba(0, 0, 0, 0.40);',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
      }
    },
  },
  plugins: [

  ],
}

