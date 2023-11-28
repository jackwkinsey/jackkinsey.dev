import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
	content: ['./app/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {},
		},
		fontFamily: {
			mono: ['"Source Code Pro"', ...defaultTheme.fontFamily.mono],
			sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
			serif: ['"Josefin Sans"', ...defaultTheme.fontFamily.serif],
		},
	},
	plugins: [],
} satisfies Config
