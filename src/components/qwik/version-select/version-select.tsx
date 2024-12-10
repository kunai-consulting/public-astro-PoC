import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Select } from "@kunai-consulting/c1-design-system";
import { isDev } from "@builder.io/qwik/build";
import versionsData from "../../../../docs-versions/versions.json";

type VersionSelectProps = {
	url: string;
};

export default component$<VersionSelectProps>(({ url }) => {
	const parts = url.split("/");
	const urlVersion = parts[2];

	const version = useSignal("");

	useVisibleTask$(() => {
		const storedVersion = localStorage.getItem("docs-version");
		version.value = storedVersion || (
			urlVersion === "current" || versionsData.includes(urlVersion)
				? urlVersion
				: versionsData[0]
		);
	});

	const handleVersionChange = $((newVersion: string) => {
		version.value = newVersion;
		// Store version in localStorage
		localStorage.setItem(
			"docs-version",
			newVersion === versionsData[0] ? "" : newVersion,
		);

		let routePath: string;
		const parts = url.split("/");
		if (parts[2] === "current" || versionsData.includes(parts[2])) {
			// if we're in a versioned path (/docs/current/x or /docs/0.1/x)
			routePath = parts.slice(3).join("/");
		} else {
			// if we're in latest version path (/docs/x)
			routePath = parts.slice(2).join("/");
		}

		const newUrl =
			newVersion === "current"
				? `/docs/current/${routePath}`
				: newVersion === versionsData[0]
					? `/docs/${routePath}`
					: `/docs/${newVersion}/${routePath}`;

		window.location.href = newUrl;
	});

	return (
		<Select.Root
			density="compact"
			// @ts-expect-error Core team is working on fixing Select types
			onChange$={handleVersionChange}
		>
			<Select.Trigger class="dark:bg-gray-950 dark:text-white border dark:hover:border-interaction-blue-20 dark:focus:border-interaction-blue-20 text-base dark:border-gray-700 border-gray-200 outline-0 focus-visible:outline-interaction-blue-50 hover:outline-0 py-5">
				<Select.DisplayValue placeholder={version.value} />
			</Select.Trigger>
			<Select.Popover>
				{isDev && (
					<Select.Item key="current" value="current">
						<Select.ItemLabel>Current</Select.ItemLabel>
						<Select.ItemIndicator />
					</Select.Item>
				)}
				{versionsData.map((v) => (
					<Select.Item key={v} value={v}>
						<Select.ItemLabel>{v}</Select.ItemLabel>
						<Select.ItemIndicator />
					</Select.Item>
				))}
			</Select.Popover>
		</Select.Root>
	);
});
