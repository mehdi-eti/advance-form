# Setup and Development Guide

## Project Structure

```
advance-form-monorepo
├── packages/
│   └── core/              # Main library (TypeScript)
│       ├── src/
│       │   ├── index.ts            # Entry point
│       │   ├── types.ts            # TypeScript type definitions
│       │   ├── validators/         # Validation system
│       │   ├── registry.ts         # Component registry with lazy loading
│       │   ├── renderer.tsx        # Core rendering engine
│       │   └── components/         # shadcn/ui adapters
│       ├── dist/                   # Compiled output (ESM/CJS)
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsup.config.ts          # Build configuration
│       └── README.md
└── apps/
    └── example/           # Example Vite + React app
        ├── src/
        │   ├── main.tsx
        │   ├── App.tsx
        │   ├── pages/
        │   └── components/
        ├── index.html
        ├── package.json
        ├── tsconfig.json
        ├── vite.config.ts
        └── README.md
```

## Installation

### 1. Install Dependencies

From the root directory:

```bash
npm install
# or
yarn install
```

This will:

- Install all monorepo dependencies using Turbo workspaces
- Set up both the core library and example app

### 2. Build the Core Library

```bash
npm run build
```

Or for watch mode during development:

```bash
npm run dev
```

This will:

- Compile TypeScript to ESM and CommonJS
- Generate type definitions (.d.ts)
- Create source maps for debugging

## Development

### Run Example App

From the root or `apps/example` directory:

```bash
npm run dev
```

This starts the Vite dev server at `http://localhost:3000`.

### Run Tests

```bash
npm run test
```

### Linting

```bash
npm run lint
```

## Core Library Features

### 1. Config-Driven Component Rendering

```tsx
import { renderComponent } from 'advance-form';

const config = {
  type: 'button',
  props: {
    label: 'Click me',
    variant: 'default',
    size: 'md',
  },
};

export default function App() {
  return renderComponent(config);
}
```

### 2. TypeScript IntelliSense

All components are fully typed with discriminated unions:

```tsx
// IntelliSense suggests valid props for each component type
const buttonConfig: ComponentConfig<'button'> = {
  type: 'button',
  props: {
    variant: 'default', // 'default' | 'destructive' | 'outline' | ...
    size: 'md', // 'sm' | 'md' | 'lg'
  },
};
```

### 3. Built-in Validation

```tsx
import { validators, validateValue } from 'advance-form/validators';

const config = {
  type: 'input',
  props: { name: 'email' },
  validation: {
    required: true,
    pattern: 'email',
    maxLength: 100,
  },
};

// Validate a value
const error = validateValue('invalid', {
  pattern: 'email',
});
```

### 4. Custom Component Registration

```tsx
import { registerComponents } from 'advance-form';

registerComponents({
  'my-custom-card': MyCustomCard,
  'my-button': MyButton,
});

const config = {
  type: 'my-custom-card',
  props: { title: 'Custom' },
};
```

### 5. Lazy Loading

Components are automatically lazy-loaded when needed:

```tsx
import { registerComponent } from 'advance-form';

// Lazy load expensive components
registerComponent('chart', () => import('./ExpensiveChart').then((m) => ({ default: m.Chart })));
```

### 6. Handler Binding

```tsx
const config = {
  type: 'button',
  props: {
    label: 'Submit',
    onClick: 'handleSubmit', // Handler name as string
  },
};

const handlers = {
  handleSubmit: () => console.log('Submitted!'),
};

renderComponent(config, { handlers });
```

## File Structure Details

### `src/types.ts`

- Contains all TypeScript type definitions
- Discriminated unions for component-specific props
- Generic types for IntelliSense support

### `src/validators/index.ts`

- Built-in validators (required, email, minLength, etc.)
- `validateValue()` function
- Custom validator function support

### `src/registry.ts`

- `ComponentRegistry` class for managing components
- Lazy loading support with React.lazy
- `registerComponent()` and `registerComponents()` functions

### `src/renderer.tsx`

- `ComponentRenderer` component for rendering config objects
- `renderComponent()` and `renderPage()` functions
- Handler context for prop binding

### `src/components/`

- Adapters for shadcn/ui components
- Button, Input, Card, Form, Select, Checkbox, etc.
- Layout components: Container, Grid, Flex
- All fully typed with TypeScript

## Building for Production

### Build Core Library

```bash
npm run build
```

This creates:

- `dist/index.mjs` - ESM module
- `dist/index.cjs` - CommonJS module
- `dist/index.d.ts` - TypeScript definitions
- Source maps for debugging

### Build Example App

```bash
npm run build
```

Creates optimized production build in `apps/example/dist/`.

## Publishing to npm

1. Update version in `packages/core/package.json`
2. Run `npm run build` to ensure everything compiles
3. From `packages/core`: `npm publish`

## Next Steps

1. **Implement More Components** - Add more shadcn/ui adapters as needed
2. **Add Tests** - Write unit tests for components and validators
3. **Add Documentation** - Create detailed API docs and examples
4. **Demo App** - Build interactive demo with all components
5. **React 17 Compatibility** - Ensure React 17 support

## Troubleshooting

### Components not found

Make sure components are registered:

```tsx
import { registerComponents, ShadcnComponents } from 'advance-form';
registerComponents(ShadcnComponents);
```

### Lazy loading issues in Next.js

For Next.js with SSR, use Next.js dynamic imports instead of React.lazy:

```tsx
import dynamic from 'next/dynamic';
registerComponent(
  'chart',
  dynamic(() => import('./Chart'))
);
```

### TypeScript errors

Ensure you're using TypeScript 5.3+:

```bash
npm install -D typescript@^5.3
```

## Support

For issues or questions, check the README.md in the respective package folders.
