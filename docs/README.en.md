# Advance Form - Complete Guide (English)

## 📚 Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [Core Concepts](#core-concepts)
5. [Components](#components)
6. [Validation](#validation)
7. [Practical Examples](#practical-examples)
8. [API Reference](#api-reference)

---

## Introduction

**Advance Form** is a TypeScript React library that allows you to build complex user interfaces by defining configuration objects instead of writing JSX.

### Key Features

✨ **Config-Driven Rendering** - Define components using simple objects  
📝 **Full IntelliSense** - Complete autocomplete and prop suggestions in IDE  
✔️ **Built-in Validation** - Required fields, type checking, pattern validation  
🚀 **Lazy Loading** - Components load only when needed  
🎨 **Extensible** - Register and use custom components  
📱 **Layout Components** - Container, Grid, Flex for responsive designs  
🌐 **SSR Ready** - Works with React and Next.js

---

## Installation

### Prerequisites

- Node.js 16+
- React 17+
- TypeScript 4.9+

### Install Package

```bash
npm install advance-form
# or
yarn add advance-form
```

For shadcn/ui components:

```bash
npm install shadcn-ui
```

---

## Quick Start

### 1. Simple Button

```tsx
import { renderComponent } from 'advance-form';

const config = {
  type: 'button',
  props: {
    label: 'Click Me',
    variant: 'default',
  },
};

export default function App() {
  return renderComponent(config);
}
```

### 2. Button with Handler

```tsx
import { renderComponent } from 'advance-form';

const config = {
  type: 'button',
  props: {
    label: 'Submit',
    onClick: 'handleClick',
  },
};

export default function App() {
  const handlers = {
    handleClick: () => console.log('Button clicked!'),
  };

  return renderComponent(config, { handlers });
}
```

### 3. Complete Login Form

```tsx
import { renderPage } from 'advance-form';

const loginConfig = {
  layout: 'container',
  props: { maxWidth: 'sm', padding: 'lg' },
  children: [
    {
      type: 'card',
      props: { title: 'Sign In', description: 'Enter your credentials' },
      children: [
        {
          type: 'form',
          props: { onSubmit: 'handleLogin' },
          children: [
            {
              type: 'input',
              props: { name: 'email', placeholder: 'Email', type: 'email' },
              validation: { required: true, pattern: 'email' },
            },
            {
              type: 'input',
              props: { name: 'password', placeholder: 'Password', type: 'password' },
              validation: { required: true, minLength: 8 },
            },
            {
              type: 'button',
              props: { label: 'Sign In', type: 'submit' },
            },
          ],
        },
      ],
    },
  ],
};

export default function App() {
  const handlers = {
    handleLogin: (formData) => {
      console.log('Form submitted:', formData);
    },
  };

  return renderPage(loginConfig, { handlers });
}
```

---

## Core Concepts

### ComponentConfig

Every `ComponentConfig` is an object with the following structure:

```typescript
interface ComponentConfig {
  type: ComponentType; // Component type ('button', 'input', etc.)
  props?: Record<string, any>; // Component props
  children?: ComponentConfig[]; // Child components
  validation?: ValidationRule; // Validation rules
}
```

### PageConfig

For building complete pages:

```typescript
interface PageConfig {
  layout?: ComponentType; // Layout type ('container', etc.)
  props?: Record<string, any>; // Layout props
  children?: ComponentConfig[]; // Page components
}
```

### Handler Context

For binding functions to events:

```tsx
const handlers = {
  handleSubmit: (data) => console.log(data),
  handleChange: (event) => console.log(event),
  handleClick: () => console.log('clicked'),
};

renderComponent(config, { handlers });
```

---

## Components

### Form Components

#### Input

```typescript
{
  type: 'input',
  props: {
    name: 'email',
    placeholder: 'Enter email',
    type: 'email',  // 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date'
    disabled: false,
    maxLength: 100
  },
  validation: {
    required: true,
    pattern: 'email',
    maxLength: 100
  }
}
```

#### Textarea

```typescript
{
  type: 'textarea',
  props: {
    name: 'message',
    placeholder: 'Enter your message',
    rows: 5,
    maxLength: 500
  },
  validation: {
    required: true,
    minLength: 10
  }
}
```

#### Select

```typescript
{
  type: 'select',
  props: {
    name: 'country',
    placeholder: 'Select a country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' }
    ]
  },
  validation: { required: true }
}
```

#### Checkbox

```typescript
{
  type: 'checkbox',
  props: {
    name: 'agree',
    label: 'I agree to the terms'
  },
  validation: { required: true }
}
```

### Button Component

```typescript
{
  type: 'button',
  props: {
    label: 'Button',
    variant: 'default',  // 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size: 'md',         // 'sm' | 'md' | 'lg'
    type: 'button',     // 'button' | 'submit' | 'reset'
    disabled: false,
    onClick: 'handleClick'
  }
}
```

### Card Component

```typescript
{
  type: 'card',
  props: {
    title: 'Card Title',
    description: 'Card Description'
  },
  children: [
    // Child components
  ]
}
```

### Layout Components

#### Container

```typescript
{
  type: 'container',
  props: {
    maxWidth: 'lg',  // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    padding: 'lg'    // 'sm' | 'md' | 'lg' | 'xl'
  },
  children: [/* ... */]
}
```

#### Grid

```typescript
{
  type: 'grid',
  props: {
    columns: 3,  // 1-6
    gap: 'md'    // 'sm' | 'md' | 'lg'
  },
  children: [
    { type: 'card', props: { title: 'Card 1' } },
    { type: 'card', props: { title: 'Card 2' } },
    { type: 'card', props: { title: 'Card 3' } }
  ]
}
```

#### Flex

```typescript
{
  type: 'flex',
  props: {
    direction: 'row',        // 'row' | 'column'
    justify: 'between',      // 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
    align: 'center',         // 'start' | 'center' | 'end' | 'stretch' | 'baseline'
    gap: 'md'                // 'sm' | 'md' | 'lg'
  },
  children: [/* ... */]
}
```

---

## Validation

### Built-in Validation Rules

```typescript
import { validators, validateValue } from 'advance-form/validators';

const validationRules = {
  required: true, // Field is mandatory
  type: 'string', // Type checking
  minLength: 3, // Minimum length
  maxLength: 50, // Maximum length
  min: 1, // Minimum value (numbers)
  max: 100, // Maximum value (numbers)
  pattern: 'email', // Pattern (email | url | regex)
  custom: (value) => {
    // Custom validator function
    if (value !== 'expected') {
      return 'Value must be "expected"';
    }
    return null; // No error
  },
};

// Usage
const error = validateValue('test@example.com', {
  pattern: 'email',
});

console.log(error); // null (valid)
```

### Using in ComponentConfig

```typescript
{
  type: 'input',
  props: {
    name: 'username',
    placeholder: 'Enter username'
  },
  validation: {
    required: true,
    minLength: 3,
    maxLength: 20,
    custom: (value) => {
      if (!value.match(/^[a-z0-9_]+$/)) {
        return 'Only lowercase letters, numbers, and underscore allowed';
      }
      return null;
    }
  }
}
```

---

## Practical Examples

### Example 1: Simple Login Form

```tsx
import { renderPage } from 'advance-form';

const config = {
  layout: 'container',
  props: { maxWidth: 'sm', padding: 'lg' },
  children: [
    {
      type: 'card',
      props: { title: 'Sign In' },
      children: [
        {
          type: 'form',
          props: { onSubmit: 'handleLogin' },
          children: [
            {
              type: 'input',
              props: { name: 'email', placeholder: 'Email', type: 'email' },
              validation: { required: true, pattern: 'email' },
            },
            {
              type: 'input',
              props: { name: 'password', placeholder: 'Password', type: 'password' },
              validation: { required: true, minLength: 6 },
            },
            {
              type: 'button',
              props: { label: 'Sign In', type: 'submit' },
            },
          ],
        },
      ],
    },
  ],
};

export default function LoginPage() {
  return renderPage(config, {
    handlers: {
      handleLogin: (formData) => {
        alert(`Logged in as: ${formData.get('email')}`);
      },
    },
  });
}
```

### Example 2: Contact Form with Multiple Fields

```tsx
const contactConfig = {
  layout: 'container',
  props: { maxWidth: 'md', padding: 'lg' },
  children: [
    {
      type: 'card',
      props: { title: 'Contact Us' },
      children: [
        {
          type: 'form',
          props: { onSubmit: 'handleSubmit' },
          children: [
            {
              type: 'input',
              props: { name: 'name', placeholder: 'Full Name' },
              validation: { required: true },
            },
            {
              type: 'input',
              props: { name: 'email', placeholder: 'Email', type: 'email' },
              validation: { required: true, pattern: 'email' },
            },
            {
              type: 'select',
              props: {
                name: 'subject',
                placeholder: 'Subject',
                options: [
                  { value: 'support', label: 'Support' },
                  { value: 'feedback', label: 'Feedback' },
                ],
              },
              validation: { required: true },
            },
            {
              type: 'textarea',
              props: { name: 'message', placeholder: 'Message' },
              validation: { required: true, minLength: 10 },
            },
            {
              type: 'button',
              props: { label: 'Send', type: 'submit' },
            },
          ],
        },
      ],
    },
  ],
};
```

### Example 3: Grid Layout with Cards

```tsx
const gridConfig = {
  type: 'container',
  props: { padding: 'lg' },
  children: [
    {
      type: 'grid',
      props: { columns: 3, gap: 'md' },
      children: [
        { type: 'card', props: { title: 'Feature 1', description: 'Description 1' } },
        { type: 'card', props: { title: 'Feature 2', description: 'Description 2' } },
        { type: 'card', props: { title: 'Feature 3', description: 'Description 3' } },
      ],
    },
  ],
};
```

---

## API Reference

### Main Functions

#### `renderComponent(config, options?)`

Render a component from config

```typescript
function renderComponent(config: ComponentConfig, options?: RenderOptions): React.ReactElement;

interface RenderOptions {
  handlers?: HandlerContext;
  customComponents?: Record<string, React.ComponentType>;
  suspenseFallback?: React.ReactNode;
}
```

#### `renderPage(config, options?)`

Render a complete page

```typescript
function renderPage(config: PageConfig, options?: RenderOptions): React.ReactElement;
```

#### `registerComponent(name, component)`

Register a custom component

```typescript
function registerComponent(
  name: string,
  component: React.ComponentType | (() => Promise<...>)
): void;
```

#### `registerComponents(components)`

Register multiple components

```typescript
function registerComponents(components: Record<string, React.ComponentType>): void;
```

### Validators

#### `validateValue(value, rules)`

Validate a value

```typescript
function validateValue(value: any, rules: ValidationRule | ValidationRule[]): string | null;
```

---

## Key Points

1. **Type Safety** - All props are TypeScript type-safe
2. **Lazy Loading** - Components automatically lazy load
3. **Performance** - Only used components are bundled
4. **Extensibility** - Easily add custom components
5. **SSR Support** - Works with Next.js and SSR frameworks

---

## Troubleshooting

### Component Not Found

Make sure the component is registered:

```tsx
import { registerComponents, ShadcnComponents } from 'advance-form';
registerComponents(ShadcnComponents);
```

### TypeScript Errors

Update your TypeScript version:

```bash
npm install -D typescript@^5.3
```

---

For more information, see [README](../README.md) and [SETUP.md](../SETUP.md).
