import {
	$,
	type QwikIntrinsicElements,
	component$,
	useSignal,
	useOnWindow,
} from "@builder.io/qwik";
import type { MarkdownHeading } from "astro";
import { cn } from "../../../lib/utils";

export const TOC = component$(
	({ headings }: { headings: MarkdownHeading[] }) => {
		const itemIds = headings.map((item) => item.slug);
		const activeHeading = useActiveItem(itemIds);

		return (
			<div class="sticky top-[5.75rem] max-h-[calc(100vh-6rem)] overflow-y-auto space-y-2 col-span-1 hidden lg:block dark:bg-[hsl(223, 70%, 4%)] dark:text-white dark:bg-gray-950">
				<div class="border-l dark:border-gray-700 p-6">
					<div class="text-xl font-bold text-cool-700">On This Page</div>
					{headings.length === 0 ? (
						<p class="text-cool-700 mt-2">No headings available</p>
					) : (
						<Tree headings={headings} activeItem={activeHeading.value} />
					)}
				</div>
			</div>
		);
	},
);

const useActiveItem = (itemIds: string[]) => {
	const activeId = useSignal<string>();

	useOnWindow(
		"scroll",
		$(() => {
			const observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							activeId.value = entry.target.id;
						}
					}
				},
				{ rootMargin: "0% 0% -85% 0%" },
			);

			for (const id of itemIds) {
				const element = document.getElementById(id);
				if (element) {
					observer.observe(element);
				}
			}

			return () => {
				for (const id of itemIds) {
					const element = document.getElementById(id);
					if (element) {
						observer.unobserve(element);
					}
				}
			};
		}),
	);

	return activeId;
};

type TreeProps = QwikIntrinsicElements["ul"] & {
	headings: MarkdownHeading[];
	level?: number;
	activeItem?: string;
};

const Tree = component$<TreeProps>(({ headings, level = 1, activeItem }) => {
	return headings.length > 0 && level < 3 ? (
		<ul class={cn("m-0 list-none", { "pl-4": level !== 1 })}>
			{headings.map((heading) => {
				return (
					<li
						key={heading.slug}
						class={cn(
							"mt-0 pt-2 text-cool-700 hover:text-cool-900 hover:text-gray-600 dark:hover:text-gray-400",
						)}
					>
						<a
							href={`#${heading.slug}`}
							onClick$={[
								$(() => {
									const element = document.getElementById(heading.slug);
									if (element) {
										const navbarHeight = 90;
										const elementPosition =
											element.getBoundingClientRect().top +
											window.scrollY -
											navbarHeight;
										window.scrollTo({
											top: elementPosition,
											behavior: "smooth",
										});
									}
								}),
							]}
							class={cn(
								heading.depth > 2 ? "ml-4" : null,
								"inline-block no-underline",
								heading.slug === `${activeItem}` &&
									"text-interaction-blue-50 dark:text-interaction-blue-20",
							)}
						>
							{heading.text}
						</a>
					</li>
				);
			})}
		</ul>
	) : null;
});
