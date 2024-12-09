import {
    CardColorBar,
    CardDescription,
    CardFooter,
    CardRoot,
    CardTitle,
  } from "@kunai-consulting/c1-design-system";
  
  import { component$, Slot } from "@builder.io/qwik";

  type CardProps = {
    title: string;
    description: string;
    footer: string;
  }
  
  export default component$(({ title, description, footer }: CardProps) => {
    return (
      <CardRoot class="prose-hr:m-0">
        <CardColorBar />
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
        {footer && <CardFooter>{footer}</CardFooter>}
        <Slot />
      </CardRoot>
    );
  });