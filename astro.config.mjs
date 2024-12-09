import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import qwik from "@qwikdev/astro";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	build: {
		format: "file",
	},
	integrations: [
		mdx(),
		tailwind({
			applyBaseStyles: false,
		}),
		qwik({ include: "**/qwik/**/*" }),
		react({
			include: "**/react/*",
		}),
	],
});
