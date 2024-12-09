import type { MenuSection } from "@/pages/docs/[...slug].astro";

export function getPrevNextPages(menuSections: MenuSection[], currentSlug: string) {
    const allItems = menuSections.flatMap(section => 
      section.items.map(item => ({
        ...item,
        section: section.heading.text
      }))
    );
    
    const currentIndex = allItems.findIndex(item => item.link === currentSlug);
    
    return {
      prev: currentIndex > 0 ? allItems[currentIndex - 1] : null,
      next: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null
    };
  }