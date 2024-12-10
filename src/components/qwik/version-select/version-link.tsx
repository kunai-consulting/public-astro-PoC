import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { useSignal } from '@builder.io/qwik';

export const VersionLink = component$((props: {
    text: string; path: string 
}) => {
  const versionedPath = useSignal(props.path);
  
  useVisibleTask$(() => {
    const version = localStorage.getItem('docs-version');
    if (version) {
      const cleanPath = props.path.replace(/^\/docs\//, '/');
      versionedPath.value = `/docs/${version}${cleanPath}`;
    }
  });

  return (
    <a href={versionedPath.value}>{props.text}</a>
  );
});