import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{tsx,jsx,js,ts}",
  ],
  theme: {
    extend: {
      animation: {
        'swap-out': 'swap_out 0.5s ease-out forwards',
        'swap-in': 'swap_in 0.5s ease-in forwards',
        'compress': 'compress 1s cubic-bezier(.42,0,.58,1) forwards',
        'shrink': 'shrink 1s cubic-bezier(.42,0,.58,1) forwards',
        'fade-out': 'fade_out 0.6s cubic-bezier(.42,0,.58,1) forwards',
      },
      keyframes: {
        swap_out: {
          '0%' : { transform: 'translateX(0%) scale(1)', opacity: 1},
          '20%': { transform: 'scale(0.9)'},
          '40%': { transform: 'scale(0.8)'},
          '100%': {transform: 'translateX(100%)', opacity: 0}
        },
        swap_in: {
          '0%' : { transform: 'translateX(-100%) scale(0.7)', opacity: 0},
          '40%': { transform: 'scale(0.8)'},
          '70%': { transform: 'scale(0.9)'},
          '100%': {transform: 'translateX(0%) scale(1)', opacity: 1}
        },
        shrink: {
          '0%' : { transform: 'translateX(100%)', opacity: 0.8},
          '100%': {transform: 'translateX(0%)', opacity: 1}
        },
        compress: {
          '0%' : { width: '100%'},
          '100%': {width: '33%'}
        },
        fade_out: {
          '0%' : { opacity: 1},
          '100%': {opacity: 0, visibility: 'hidden'}
        },
      }
    },
  },
  plugins: [
    require("daisyui"),
  ],
}

