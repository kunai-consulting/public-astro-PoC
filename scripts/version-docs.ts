import fs from "fs-extra";
import path from "node:path";
import kleur from "kleur";

const version = process.argv[2];

if (!version) {
	console.error(
		kleur.red(
			"Please provide a version number: npm run docs:version <version>",
		),
	);
	process.exit(1);
}

async function createVersionedDocs(version: string): Promise<void> {
	const siteDir = process.cwd();
	const docsDir = path.join(siteDir, "docs");
	const docsVersionsDir = path.join(siteDir, "docs-versions");
	const menuVersionsDir = path.join(siteDir, "menu-versions");

	// Validate version format
	if (!/^\d+\.\d+(\.\d+)?(-\w+)?$/.test(version)) {
		throw new Error(
			"Invalid version format. Please use semantic versioning (e.g., 1.3.0)",
		);
	}

	// Read or create versions.json
	const versionsPath = path.join(docsVersionsDir, "versions.json");
	const versions: string[] = (await fs.pathExists(versionsPath))
		? JSON.parse(await fs.readFile(versionsPath, "utf-8"))
		: [];

	if (versions.includes(version)) {
		throw new Error(`Version ${version} already exists`);
	}

	// Add new version at the beginning (newest first)
	versions.unshift(version);

	// Create version directories if they don't exist
	const versionedDocsDir = path.join(docsVersionsDir, `v${version}`);
	const versionedMenuDir = path.join(menuVersionsDir, `v${version}`);

	await fs.ensureDir(versionedDocsDir);
	await fs.ensureDir(versionedMenuDir);

	// Copy current docs to versioned directory
	if (!(await fs.pathExists(docsDir))) {
		throw new Error(`No docs found in ${docsDir}`);
	}

	// Copy docs content
	await fs.copy(docsDir, versionedDocsDir);

	// Copy menu if it exists
	const menuSource = path.join(siteDir, "menu-current", "menu.json");
	const menuTarget = path.join(versionedMenuDir, "menu.json");

	if (await fs.pathExists(menuSource)) {
		await fs.copy(menuSource, menuTarget);
	} else {
		throw new Error("menu.json not found in menu-current directory");
	}

	// Ensure docs-versions directory exists before writing versions.json
	await fs.ensureDir(docsVersionsDir);

	// Write updated versions file
	await fs.writeFile(versionsPath, `${JSON.stringify(versions, null, 2)}\n`);

	console.log(kleur.green().bold(`✓ Version ${version} created successfully`));
	console.log(kleur.blue(`Docs copied to: ${versionedDocsDir}`));
	console.log(kleur.blue(`Menu copied to: ${versionedMenuDir}`));
}

createVersionedDocs(version).catch((err) => {
	console.error(kleur.red(err.message));
	process.exit(1);
});
