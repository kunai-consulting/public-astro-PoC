import { component$ } from "@builder.io/qwik";
import { Breadcrumb } from "@kunai-consulting/c1-design-system";

interface BreadcrumbProps {
	menuSections: Array<{
		heading: {
			depth: number;
			text: string;
			slug: string;
		};
		items: Array<{
			title: string;
			link: string;
		}>;
	}>;
	currentSlug: string;
	version: string | null;
}

export const BreadcrumbSeparator = component$(() => (
	<span class="mx-2 text-gray-400" aria-hidden="true">
		/
	</span>
));

export default component$<BreadcrumbProps>(({ menuSections, currentSlug }) => {
	const currentSection = menuSections.find((section) =>
		section.items.some((item) => item.link === currentSlug),
	);
	const currentPage = currentSection?.items.find(
		(item) => item.link === currentSlug,
	);

	return (
		<Breadcrumb.Root class="py-4">
			<Breadcrumb.List class="flex items-center list-none p-0 m-0">
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/">
						<HouseIcon aria-hidden="true" />
						<span class="sr-only">Home</span>
					</Breadcrumb.Link>
				</Breadcrumb.Item>
				{currentSection && (
					<>
						<BreadcrumbSeparator />
						<Breadcrumb.Item>
							<Breadcrumb.Link
								class="dark:text-gray-300"
								href={`${currentSection.heading.slug}`}
							>
								{currentSection.heading.text}
							</Breadcrumb.Link>
						</Breadcrumb.Item>
					</>
				)}
				{currentPage && (
					<>
						<BreadcrumbSeparator />
						<Breadcrumb.Item>
							<span class="text-gray-600 dark:text-gray-200">
								{currentPage.title}
							</span>
						</Breadcrumb.Item>
					</>
				)}
			</Breadcrumb.List>
		</Breadcrumb.Root>
	);
});

export const HouseIcon = component$(() => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 256 256"
			aria-hidden="true"
			class="dark:text-core-blue-20"
		>
			<path
				fill="currentColor"
				d="M224 120v96a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8v-52a4 4 0 0 0-4-4h-40a4 4 0 0 0-4 4v52a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8v-96a16 16 0 0 1 4.69-11.31l80-80a16 16 0 0 1 22.62 0l80 80A16 16 0 0 1 224 120"
			/>
		</svg>
	);
});
