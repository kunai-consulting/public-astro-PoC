import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const docs = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./docs" }),
});

const docsVersions = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./docs-versions" }),
});

const menuVersions = defineCollection({
	loader: glob({ pattern: "**/menu.json", base: "./menu-versions" }),
});

export const collections = {
	docs,
	"docs-versions": docsVersions,
	"menu-versions": menuVersions,
};
