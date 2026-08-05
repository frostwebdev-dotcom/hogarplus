import type { Config } from 'tailwindcss';

/**
 * HogarPlus Solutions — brand theme.
 *
 * The palette, radii, shadows, spacing scale and container widths defined here
 * are the single source of truth for the visual identity. Components should
 * always consume these tokens (`bg-navy`, `shadow-card`, `py-section`) rather
 * than raw hex values, so a brand refresh only ever touches this file.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem'
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1280px'
      }
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: '#071B4D',
          50: '#EEF2FB',
          100: '#D6E0F4',
          200: '#A9BCE6',
          300: '#7995D6',
          400: '#4A6CC0',
          500: '#2A4A9C',
          600: '#173377',
          700: '#0D255F',
          800: '#071B4D',
          900: '#041133',
          950: '#020A20'
        },
        brand: {
          blue: '#2A7DFF',
          purple: '#845EF7',
          orchid: '#C06CFF'
        },
        surface: {
          DEFAULT: '#F7F9FC',
          soft: '#EEF3FA',
          white: '#FFFFFF'
        }
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-poppins)', 'system-ui', 'sans-serif']
      },
      fontSize: {
        // Minimum readable body size on mobile — never go below `text-sm`.
        'display-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
        'display-xl': ['4.5rem', { lineHeight: '1.03', letterSpacing: '-0.02em' }]
      },
      maxWidth: {
        prose: '68ch',
        container: '1200px',
        'container-wide': '1400px'
      },
      spacing: {
        section: '5rem',
        'section-lg': '7rem',
        18: '4.5rem',
        22: '5.5rem'
      },
      borderRadius: {
        card: '1rem',
        panel: '1.5rem',
        pill: '9999px'
      },
      boxShadow: {
        card: '0 4px 24px -8px rgba(7, 27, 77, 0.12), 0 2px 6px -2px rgba(7, 27, 77, 0.06)',
        'card-hover':
          '0 20px 48px -16px rgba(7, 27, 77, 0.22), 0 4px 12px -4px rgba(7, 27, 77, 0.08)',
        header: '0 2px 20px -6px rgba(7, 27, 77, 0.14)',
        glow: '0 12px 40px -12px rgba(42, 125, 255, 0.55)',
        'glow-purple': '0 12px 40px -12px rgba(132, 94, 247, 0.5)',
        inset: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)'
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(115deg, #2A7DFF 0%, #845EF7 55%, #C06CFF 100%)',
        'gradient-brand-soft':
          'linear-gradient(115deg, rgba(42,125,255,0.12) 0%, rgba(132,94,247,0.12) 55%, rgba(192,108,255,0.12) 100%)',
        'gradient-navy': 'linear-gradient(160deg, #071B4D 0%, #0D255F 55%, #173377 100%)',
        'gradient-hero-overlay':
          'linear-gradient(180deg, rgba(4,17,51,0.86) 0%, rgba(7,27,77,0.78) 45%, rgba(7,27,77,0.94) 100%)',
        'gradient-surface': 'linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 100%)'
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(0, -24px, 0) scale(1.06)' }
        },
        'float-slower': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1.04)' },
          '50%': { transform: 'translate3d(18px, 18px, 0) scale(1)' }
        },
        'scroll-hint': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '35%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' }
        }
      },
      animation: {
        'float-slow': 'float-slow 14s ease-in-out infinite',
        'float-slower': 'float-slower 19s ease-in-out infinite',
        'scroll-hint': 'scroll-hint 2.2s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;
