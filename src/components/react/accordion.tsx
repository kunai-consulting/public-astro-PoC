import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn("border-b", className)}
		{...props}
	/>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(
				"flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
		{...props}
	>
		<div className={cn("pb-4 pt-0", className)}>{children}</div>
	</AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

export const FAQAccordion = () => {
	const faqItems = [
		{
			question: "Is it accessible?",
			answer: "Yes. It adheres to the WAI-ARIA design pattern.",
		},
		{
			question: "Can I customize the styling?",
			answer:
				"Yes. The component uses Tailwind CSS classes and accepts className props for customization.",
		},
		// Add more FAQ items as needed
	];

	return (
		<Accordion type="single" collapsible>
			{Array.from(faqItems, (item, index) => (
				<AccordionItem key={`item-${index + 1}`} value={`item-${index + 1}`}>
					<AccordionTrigger>{item.question}</AccordionTrigger>
					<AccordionContent>{item.answer}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
};
