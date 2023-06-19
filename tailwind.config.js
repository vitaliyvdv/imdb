/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/**/*.html'],
	theme: {
		extend: {},
		screens: {
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '768px',
			// => @media (min-width: 768px) { ... }

			xl: '1024px',
			// => @media (min-width: 768px) { ... }

			'2xl': '1024px'
			// => @media (min-width: 768px) { ... }
		}
	},
	plugins: []
}
