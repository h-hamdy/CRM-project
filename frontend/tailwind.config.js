/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			'primary': '#1677ff',
			'whiteBackground': '#f0f2f5',
			'white': '#ffffff'
		  },
	  extend: {},
	},
	plugins: [],
  }