import {
	$,
	component$,
	useOnWindow,
	useSignal,
	useTask$,
} from "@builder.io/qwik";
import { Modal } from "@qwik-ui/headless";
import { Field } from "@kunai-consulting/c1-design-system";
import { isServer } from "@builder.io/qwik/build";

interface SearchResult {
	url: string;
	meta: {
		title: string;
	};
	excerpt?: string;
}

export const SearchModal = component$(() => {
	const results = useSignal<SearchResult[]>([]);
	const isOpen = useSignal(false);
	const isInitialized = useSignal(false);

	useOnWindow(
		"searchResults",
		$(async (event: CustomEvent) => {
			const newResults = [];
			const currentVersion = localStorage.getItem("docs-version") || "";

			for (const result of event.detail) {
				const url = result.url;
				const isVersionedPath = /\/docs\/\d+\.\d+\//.test(url);

				const shouldIncludeResult =
					// Latest version: show only root docs paths (no version prefix)
					(currentVersion === "" &&
						!url.includes("/docs/current/") &&
						!isVersionedPath) ||
					// Current version: show only current docs
					(currentVersion === "current" && url.includes("/docs/current/")) ||
					// Specific version: show only that version
					url.includes(`/docs/${currentVersion}/`);

				if (shouldIncludeResult) {
					newResults.push(result);
				}
			}
			results.value = newResults;
		}),
	);

	useTask$(({ track }) => {
		track(() => isOpen.value);

		if (isServer) return;

		if (isOpen.value && !isInitialized.value) {
			window.dispatchEvent(new CustomEvent("initPagefind"));
			isInitialized.value = true;
		}
	});

	return (
		<Modal.Root bind:show={isOpen}>
			<Modal.Trigger class="px-3 py-2 rounded-md gap-2 flex items-center border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 dark:text-white">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<g
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
					>
						<circle cx="11" cy="11" r="8" />
						<path d="m21 21l-4.3-4.3" />
					</g>
				</svg>
				<span> Search</span>
			</Modal.Trigger>
			<Modal.Panel class="p-4 rounded-md my-0 fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-10 max-w-2xl w-full bg-white dark:bg-gray-900 dark:text-white shadow-xl border border-gray-200 dark:border-gray-600">
				<Field.Root class="mb-4">
					<Field.Box class="py-3 dark:bg-gray-900 dark:focus-within:border-interaction-blue-60 dark:border-gray-700">
						<Field.Input
							placeholder="Search..."
							class="text-base dark:bg-gray-900"
							autocomplete="off"
							data-id="search"
							type="text"
							onInput$={() => {
								results.value = [];
							}}
						/>
					</Field.Box>
				</Field.Root>
				<ul class="mt-4 space-y-2">
					{results.value.map((result: SearchResult) => (
						<a key={result.url} href={result.url}>
							<li
								key={result.url}
								class="p-3 rounded-lg hoover:bg-interaction-blue-10 dark:hover:bg-core-blue-60 cursor-pointer hover:bg-interaction-blue-10"
							>
								<h3 class="font-medium">{result.meta.title}</h3>
								{result.excerpt && (
									<p
										class="text-sm text-gray-500 dark:text-gray-400"
										// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
										dangerouslySetInnerHTML={result.excerpt.replace(
											/<mark>(.*?)<\/mark>/g,
											'<mark class="bg-yellow-200 dark:bg-yellow-700 rounded px-0.5 font-medium dark:text-white">$1</mark>',
										)}
									/>
								)}
							</li>
						</a>
					))}
				</ul>
			</Modal.Panel>
		</Modal.Root>
	);
});
