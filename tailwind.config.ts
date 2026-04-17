import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a2a66',
        sand: '#ffffff',
        stone: '#3f69ad',
        cement: '#dbeafe',
        clay: '#3b82f6',
        steel: '#0a2a66',
        moss: '#1f4f9d',
        metallic: '#5f8fd6',
        carbon: '#030712'
      },
      boxShadow: {
        lift: '0 24px 60px rgba(3, 7, 18, 0.22)',
        panel: '0 18px 40px rgba(3, 7, 18, 0.14)'
      },
      backgroundImage: {
        'hero-grid': 'linear-gradient(rgba(10, 42, 102, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(10, 42, 102, 0.08) 1px, transparent 1px)',
        'concrete-glow': 'radial-gradient(circle at top left, rgba(79, 179, 255, 0.30), transparent 35%), radial-gradient(circle at 80% 20%, rgba(10, 42, 102, 0.22), transparent 32%), radial-gradient(circle at 50% 100%, rgba(31, 79, 157, 0.16), transparent 42%)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -12px, 0)' }
        },
        rise: {
          '0%': { opacity: '0', transform: 'translate3d(0, 32px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' }
        },
        pulseLine: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '0.7' }
        }
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        rise: 'rise 0.8s ease-out both',
        'pulse-line': 'pulseLine 4s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;