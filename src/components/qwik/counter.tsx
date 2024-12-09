import { component$, useSignal } from "@builder.io/qwik";

export const QwikCounter = component$(() => {
	const count = useSignal(0);

	return (
		<button type="button" onClick$={() => count.value++}>
			{count.value}
		</button>
	);
});
