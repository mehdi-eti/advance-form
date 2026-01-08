# advance-form

A powerful TypeScript React library for rendering shadcn/ui components via configuration objects with full IntelliSense support. Build complex UI pages without writing JSX!

## Features

✨ **Config-Driven Rendering** - Render shadcn/ui components using plain JavaScript/TypeScript objects  
🚀 **Lazy Loading** - Components only load when used, reducing bundle size  
📝 **TypeScript IntelliSense** - Full autocomplete and type-safe prop suggestions  
✔️ **Built-in Validation** - Required fields, type checking, length validation, custom validators  
🎨 **Extensible** - Register custom components alongside shadcn/ui  
📱 **Responsive** - Support for Container, Grid, Flex layouts  
📋 **Form Integration** - Seamless react-hook-form integration with Zod validation  
🌐 **SSR Ready** - Works with React and Next.js (with SSR considerations)

## Installation

```bash
npm install advance-form shadcn-ui react react-dom
# or
yarn add advance-form shadcn-ui react react-dom
```

## Quick Start

### Basic Button

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

### Complete Login Form

```tsx
import { renderPage } from 'advance-form';

const loginPageConfig = {
  layout: 'container',
  props: { maxWidth: 'sm', padding: 'lg' },
  children: [
    {
      type: 'card',
      props: {
        title: 'Sign In',
        description: 'Enter your email and password to login',
      },
      children: [
        {
          type: 'form',
          props: { onSubmit: 'handleSubmit' },
          children: [
            {
              type: 'input',
              props: {
                name: 'email',
                placeholder: 'Email',
                type: 'email',
              },
              validation: {
                required: true,
                pattern: 'email',
              },
            },
            {
              type: 'input',
              props: {
                name: 'password',
                placeholder: 'Password',
                type: 'password',
              },
              validation: {
                required: true,
                minLength: 8,
              },
            },
            {
              type: 'button',
              props: {
                label: 'Sign In',
                type: 'submit',
              },
            },
          ],
        },
      ],
    },
  ],
};

export default function App() {
  const handlers = {
    handleSubmit: (data) => console.log('Form submitted:', data),
  };

  return renderPage(loginPageConfig, { handlers });
}
```

## Supported Components

**Layout**: Container, Grid, Flex  
**Form**: Form, Input, Textarea, Select, Checkbox, Toggle, Radio Group  
**Data Display**: Card, Table, Accordion, Tabs, Collapsible, Carousel  
**Feedback**: Alert, Badge, Progress, Skeleton, Spinner, Toast  
**Navigation**: Breadcrumb, Pagination, Menubar, Navigation Menu, Sidebar  
**Overlay**: Dialog, Drawer, Popover, Tooltip, Context Menu, Dropdown Menu  
**And more**: Button, Label, Separator, Avatar, Calendar, Date Picker, Command, Combobox...

> Note: The library auto-registers the core shadcn-based components on import (they are registered lazily). Use `listRegisteredComponents()` to inspect which components are currently registered, or call `registerComponents()` / `registerComponent()` to add/override registrations.

## TypeScript IntelliSense

All configurations are fully typed with discriminated unions and generics for prop suggestions:

```tsx
const config: ComponentConfig<'button'> = {
  type: 'button',
  props: {
    // IntelliSense suggests: variant, size, disabled, className, etc.
    variant: 'default', // 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size: 'md', // 'sm' | 'md' | 'lg'
  },
};
```

## Custom Components

Register your custom components alongside shadcn/ui:

```tsx
import { registerComponents, renderComponent } from 'advance-form';
import MyCustomCard from './MyCustomCard';

registerComponents({
  'custom-card': MyCustomCard,
});

const config = {
  type: 'custom-card',
  props: { title: 'My Custom Component' },
};

export default function App() {
  return renderComponent(config);
}
```

## Validation

Built-in validators with support for custom functions:

```tsx
const config = {
  type: 'input',
  props: { name: 'email' },
  validation: {
    required: true,
    pattern: 'email',
    maxLength: 100,
  },
};

// Or custom validator
const customValidator = (value) => {
  if (!value.startsWith('user_')) {
    return 'Username must start with "user_"';
  }
  return null;
};

const config2 = {
  type: 'input',
  props: { name: 'username' },
  validation: {
    custom: customValidator,
  },
};
```

## Documentation

See [docs](./docs) folder for detailed documentation in English and Persian (فارسی).

## License

MIT
