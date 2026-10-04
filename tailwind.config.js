/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
                serif: ['"Source Serif 4"', 'Georgia', 'serif'],
                mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
            },
            // Colours are CSS variables (see index.css) so light/dark is one swap, not a dark: class per element
            colors: {
                paper: 'rgb(var(--paper) / <alpha-value>)',
                surface: 'rgb(var(--surface) / <alpha-value>)',
                ink: 'rgb(var(--ink) / <alpha-value>)',
                muted: 'rgb(var(--muted) / <alpha-value>)',
                rule: 'rgb(var(--rule) / <alpha-value>)',
                accent: 'rgb(var(--accent) / <alpha-value>)',
                signal: 'rgb(var(--signal) / <alpha-value>)',
            },
            maxWidth: {
                page: '72rem',
            },
        },
    },
    plugins: [],
}
