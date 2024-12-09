import { component$, $, useStyles$ } from "@builder.io/qwik";
import { SunAndMoon } from "./theme-icons";
import themeToggle from "./theme-toggle.css?inline";

export const ThemeToggle = component$(() => {
	useStyles$(themeToggle);

	const onClick$ = $(() => {
		const theme = document.documentElement.className;
		if (theme === "light") {
			document.documentElement.className = "dark";
			localStorage.setItem("darkMode", "dark");
		} else {
			document.documentElement.className = "light";
			localStorage.setItem("darkMode", "light");
		}
	});

	return (
		<button
			type="button"
			class="theme-toggle"
			id="theme-checked"
			title="Toggles light & dark"
			aria-label={"Toggles light & dark"}
			aria-live="polite"
			onClick$={onClick$}
		>
			<SunAndMoon />
		</button>
	);
});
