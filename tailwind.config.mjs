/** @type {import('tailwindcss').Config} */
import { tailwindConfig as c1TailwindConfig } from "@kunai-consulting/c1-design-system";

export default {
	darkMode: ["class"],
	content: [
		"./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
		"./node_modules/@kunai-consulting/c1-design-system/lib/**/*",
		"./node_modules/@kunai-consulting/c1-design-system/src/**/*",
	],
	theme: {
		extend: {
			fontFamily: {
				system: [
					"Seravek",
					"Gill Sans Nova",
					"Ubuntu",
					"Calibri",
					"DejaVu Sans",
					"source-sans-pro",
					"sans-serif",
				],
			},
			colors: {
				docs: {
					neutral: "#18181B",
				},
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
	presets: [c1TailwindConfig],
};
