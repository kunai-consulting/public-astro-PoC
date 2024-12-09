# Astro vs Docusaurus Documentation POC

A proof-of-concept comparing Astro and Docusaurus for building documentation sites, with a focus on component integration and framework flexibility.

## 🚀 Features

- Multi-framework support (Qwik, React)
- Server-side interactive components
- Documentation versioning
- Full-text search with Pagefind
- Dark/Light mode theming
- MDX support
- Syntax highlighting
- Table of contents navigation

## 🛠️ Tech Stack

- [Astro](https://astro.build) v5.0.2
- [Qwik](https://qwik.builder.io) v1.11.0
- [React](https://reactjs.org) v18.3.1
- [Tailwind CSS](https://tailwindcss.com) v3.4.15
- [MDX](https://mdxjs.com) v4.0.1
- [Pagefind](https://pagefind.app) v1.2.0

## 🏃‍♂️ Getting Started

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Build for production:
```bash
pnpm build
```

## 📜 Available Scripts

```bash
pnpm dev         # Start development server
pnpm build       # Build for production (includes type checking)
pnpm preview     # Preview production build
pnpm docs:version # Create a new documentation version
```

## 📦 Project Structure

```
/
├── docs/                # Current documentation
├── docs-versions/       # Versioned documentation
├── src/
│   ├── components/     
│   │   ├── qwik/       # Qwik components
│   │   └── react/      # React components
│   ├── layouts/        # Astro layouts
│   └── pages/          # Routes
└── astro.config.mjs    # Astro configuration
```

## 🔍 Key Differences from Docusaurus

- **Framework Flexibility**: Mix Qwik and React components
- **Performance**: Zero JavaScript by default with selective hydration
- **Server-First**: Interactive components that work without client-side hydration
- **Customization**: Greater control over implementation details

## 🔧 Dependencies

### Core
- `astro` - Core framework
- `@astrojs/mdx` - MDX support
- `@astrojs/react` - React integration
- `@qwikdev/astro` - Qwik integration

### Styling
- `@astrojs/tailwind` - Tailwind CSS integration
- `tailwindcss` - Utility-first CSS
- `@tailwindcss/typography` - Typography plugin

### Development
- `typescript` - Type checking
- `@astrojs/check` - Astro type checking
- `tsx` - TypeScript execution
- `pagefind` - Search functionality
