/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

module.exports = {
	darkMode: "class",
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		colors: {
			"dark-grey": "#202123",
			grey: "#343541",
			"light-grey": "#444654",
			white: "#ffffff",
			light: "#F6FCFC",
			...colors,
		},
		extend: {},
	},
	plugins: [],
};
