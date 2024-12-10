import { component$ } from "@builder.io/qwik";
import { Modal } from "@qwik-ui/headless";
import type { MenuItems } from "@/layouts/docs-layout.astro";
import { Sidebar } from "../sidebar/sidebar";

export const MobileMenu = component$((props: MenuItems) => {
	return (
		<Modal.Root>
			<Modal.Trigger>
				<MenuIcon />
			</Modal.Trigger>
			<Modal.Panel class="w-full h-full fixed right-0 m-0">
				<Sidebar
					menuItems={props.menuItems || []}
					version={props.version}
					currentSlug={props.currentSlug}
					data-mobile
				/>
				<Modal.Close class="absolute top-4 right-4">
					<CloseIcon />
				</Modal.Close>
			</Modal.Panel>
		</Modal.Root>
	);
});

export const MenuIcon = component$(() => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.5em"
			height="1.5em"
			viewBox="0 0 256 256"
			aria-hidden="true"
		>
			<path
				fill="currentColor"
				d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12M40 76h176a12 12 0 0 0 0-24H40a12 12 0 0 0 0 24m176 104H40a12 12 0 0 0 0 24h176a12 12 0 0 0 0-24"
			/>
		</svg>
	);
});

export const CloseIcon = component$(() => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.5em"
			height="1.5em"
			viewBox="0 0 256 256"
			aria-hidden="true"
		>
			<path
				fill="currentColor"
				d="M204.24 195.76a6 6 0 1 1-8.48 8.48L128 136.49l-67.76 67.75a6 6 0 0 1-8.48-8.48L119.51 128L51.76 60.24a6 6 0 0 1 8.48-8.48L128 119.51l67.76-67.75a6 6 0 0 1 8.48 8.48L136.49 128Z"
			/>
		</svg>
	);
});
