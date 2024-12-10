import { component$, type PropsOf } from "@builder.io/qwik";
import { Accordion } from "@qwik-ui/headless";

export interface MenuItem {
	title: string;
	link: string;
}

export interface Heading {
	depth: number;
	slug: string;
	text: string;
}

interface MenuSection {
	heading: Heading;
	items: MenuItem[];
}

type SidebarProps = {
	menuItems: MenuSection[];
	version?: string | null;
	currentSlug?: string;
} & PropsOf<"aside">;

export const Sidebar = component$((props: SidebarProps) => {
	const { menuItems, version, currentSlug } = props;

	// Find the current section based on currentSlug
	const currentSection = menuItems.find((section) =>
		section.items.some((item) => item.link === currentSlug),
	);

	return (
		<aside
			class="flex-col hidden lg:flex dark:bg-gray-950 dark:text-white col-span-1 h-auto group data-[mobile]:flex data-[mobile]:items-center data-[mobile]:justify-center data-[mobile]:h-full data-[mobile]:mt-8"
			{...props}
		>
			<div class="w-fit p-6 border-r dark:border-gray-700 group-data-[mobile]:border-none sticky top-24 h-[calc(100vh-10rem)] group-data">
				<Accordion.Root
					class="flex flex-col gap-4"
					value={currentSection?.heading.slug}
				>
					{menuItems.map((section) => (
						<Accordion.Item
							key={section.heading.slug}
							value={section.heading.slug}
							class="group"
						>
							<Accordion.Trigger class="flex items-center justify-between gap-2 text-lg font-medium bg-digital-gray-10 px-2 py-1 rounded-md dark:bg-gray-900">
								<span>{section.heading.text}</span>
								<span class={["rotate-90"].join(" ")}>
									<ChevronRight />
								</span>
							</Accordion.Trigger>
							<Accordion.Content>
								<ul>
									{section.items.map((item) => (
										<li class="px-2 py-1" key={item.link}>
											<a
												href={
													version
														? `/docs/${version}/${item.link}`
														: `/docs/${item.link}`
												}
												class={currentSlug === item.link ? "font-bold" : ""}
											>
												{item.title}
											</a>
										</li>
									))}
								</ul>
							</Accordion.Content>
						</Accordion.Item>
					))}
				</Accordion.Root>
			</div>
		</aside>
	);
});

export const ChevronRight = component$(() => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="m9 18l6-6l-6-6"
			/>
		</svg>
	);
});
