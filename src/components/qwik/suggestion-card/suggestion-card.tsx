import { component$ } from "@builder.io/qwik";

type SuggestionCardProps = {
	type: "prev" | "next";
	link: string;
	title: string;
	section: string;
};

export const SuggestionCard = component$<SuggestionCardProps>(
	({ type, link, title, section }) => {
		const isNext = type === "next";

		return (
			<a
				href={`/docs/${link}`}
				class={`flex items-center group bg-digital-gray-10 dark:bg-gray-900 w-full rounded-lg p-4 no-underline ${isNext ? "text-right ml-auto flex justify-end" : ""} hover:bg-interaction-blue-10 border-2 border-transparent hover:border-interaction-blue-20 dark:hover:bg-interaction-blue-70`}
			>
				{!isNext && <span class="mr-2 dark:text-white">←</span>}
				<div>
					<div class="text-sm text-gray-500 dark:text-gray-400">
						{isNext ? "Next" : "Previous"}
					</div>
					<div class="font-medium dark:text-white">{title}</div>
					<div class="text-sm text-gray-500 dark:text-gray-400">{section}</div>
				</div>
				{isNext && <span class="ml-2 dark:text-white">→</span>}
			</a>
		);
	},
);
