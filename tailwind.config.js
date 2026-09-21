/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // User-Requested Primary & Brand Colors
        primary: {
          DEFAULT: '#FF5722', // Primary Brand Color
          hover: '#E64A19',
          light: '#FBE9E7',
          dark: '#D84315',
        },
        secondary: {
          DEFAULT: '#0F172A',
          hover: '#1E293B',
          light: '#F8FAFC',
        },
        accent: {
          DEFAULT: '#FF9800', // Vibrant Orange Accent
          hover: '#F57C00',
          light: '#FFF3E0',
          dark: '#E65100',
        },
        gold: {
          DEFAULT: '#FFC107', // Amber / Gold
          hover: '#FFA000',
          light: '#FFF8E1',
          dark: '#FF8F00',
        },
        success: {
          DEFAULT: '#4CAF50', // Fresh Green / In Stock
          hover: '#388E3C',
          light: '#E8F5E9',
          dark: '#2E7D32',
        },
        info: {
          DEFAULT: '#2196F3', // Material Sky Blue
          hover: '#1976D2',
          light: '#E3F2FD',
          dark: '#1565C0',
        },
        brand: {
          deepOrange: '#FF5722',
          orange: '#FF9800',
          amber: '#FFC107',
          green: '#4CAF50',
          blue: '#2196F3',
        },
        danger: '#F44336',
        bdgreen: '#4CAF50',
        bdred: '#FF5722',
      },
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
        'glow': '0 0 25px rgba(255, 87, 34, 0.35)',
        'glow-accent': '0 0 25px rgba(255, 152, 0, 0.35)',
      },
      borderRadius: {
        'card': '14px',
      }
    },
  },
  plugins: [],
}
