# TypeScript API Guide - Advance Form

## Table of Contents

1. [Type Definitions](#type-definitions)
2. [Component Configuration](#component-configuration)
3. [Validation Rules](#validation-rules)
4. [Handler Functions](#handler-functions)
5. [IntelliSense Examples](#intellisense-examples)

---

## Type Definitions

### ComponentType

All supported component type strings:

```typescript
type ComponentType =
  // Layout
  | 'container'
  | 'grid'
  | 'flex'
  // Form
  | 'form'
  | 'input'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'toggle'
  | 'radio-group'
  | 'label'
  // Button
  | 'button'
  | 'button-group'
  | 'toggle-group'
  // Data Display
  | 'card'
  | 'table'
  | 'accordion'
  | 'tabs'
  | 'collapsible'
  | 'carousel'
  // Feedback
  | 'alert'
  | 'badge'
  | 'progress'
  | 'skeleton'
  | 'spinner'
  | 'toast'
  // Navigation
  | 'breadcrumb'
  | 'pagination'
  | 'menubar'
  | 'navigation-menu'
  | 'sidebar'
  // Overlay
  | 'dialog'
  | 'drawer'
  | 'popover'
  | 'tooltip'
  | 'context-menu'
  // Content
  | 'avatar'
  | 'calendar'
  | 'command'
  | 'date-picker'
  | 'separator'
  // Custom (any string for custom components)
  | (string & {});
```

### Component-Specific Props

Each component type has specific props interface:

```typescript
interface ButtonProps {
  label?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  onClick?: string; // Handler key name
  type?: 'button' | 'submit' | 'reset';
}

interface InputProps {
  name?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date';
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  className?: string;
  value?: string | number;
  onChange?: string; // Handler key name
  defaultValue?: string | number;
}

interface SelectProps {
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  onChange?: string;
  options?: Array<{ value: string; label: string }>;
}

interface CardProps {
  title?: string;
  description?: string;
  className?: string;
}

interface FormProps {
  onSubmit?: string; // Handler key name
  onChange?: string;
  className?: string;
}

// ... and more for other components
```

---

## Component Configuration

### Basic Structure

```typescript
interface ComponentConfig<T extends ComponentType = ComponentType> {
  type: T; // Component type
  props?: ComponentTypeProps[T]; // Type-safe props
  children?: ComponentConfig[]; // Nested components
  validation?: ValidationRule | ValidationRule[];
  key?: string;
}
```

### Simple Component

```typescript
const simpleButton: ComponentConfig<'button'> = {
  type: 'button',
  props: {
    label: 'Click me',
    variant: 'default',
    size: 'md',
    onClick: 'handleClick',
  },
};
```

### Nested Component

```typescript
const cardWithButton: ComponentConfig<'card'> = {
  type: 'card',
  props: {
    title: 'Card Title',
    description: 'Card Description',
  },
  children: [
    {
      type: 'button',
      props: {
        label: 'Button inside card',
        variant: 'outline',
      },
    },
  ],
};
```

### With Validation

```typescript
const validatedInput: ComponentConfig<'input'> = {
  type: 'input',
  props: {
    name: 'email',
    placeholder: 'Enter email',
    type: 'email',
  },
  validation: {
    required: true,
    pattern: 'email',
    maxLength: 100,
  },
};
```

---

## Validation Rules

### ValidationRule Interface

```typescript
interface ValidationRule {
  required?: boolean; // Field is mandatory
  type?: 'string' | 'number' | 'boolean'; // Type checking
  minLength?: number; // Minimum string length
  maxLength?: number; // Maximum string length
  min?: number; // Minimum number value
  max?: number; // Maximum number value
  pattern?: 'email' | 'url' | string | RegExp; // Pattern matching
  custom?: (value: any) => string | null | undefined; // Custom validator
}
```

### Examples

```typescript
// Required field
const required: ValidationRule = {
  required: true,
};

// Email field
const email: ValidationRule = {
  required: true,
  pattern: 'email',
  maxLength: 100,
};

// Password field with custom validation
const password: ValidationRule = {
  required: true,
  minLength: 8,
  maxLength: 50,
  custom: (value: string) => {
    if (!/[A-Z]/.test(value)) return 'Must contain uppercase';
    if (!/[0-9]/.test(value)) return 'Must contain number';
    return null; // Valid
  },
};

// Number range
const age: ValidationRule = {
  type: 'number',
  min: 18,
  max: 120,
};
```

---

## Handler Functions

### Handler Context

Handlers are plain functions passed as a context object:

```typescript
type HandlerContext = Record<string, (...args: any[]) => any>;

const handlers: HandlerContext = {
  handleClick: () => console.log('Clicked'),
  handleSubmit: (formData: FormData) => console.log(formData),
  handleChange: (event: ChangeEvent) => console.log(event.target.value),
  handleCustom: (data: any) => alert('Custom handler'),
};
```

### Binding Handlers

In component props, use handler names as strings:

```typescript
const config: ComponentConfig = {
  type: 'button',
  props: {
    label: 'Submit',
    onClick: 'handleClick', // String reference to handler
  },
};

renderComponent(config, { handlers });
```

### Handler Examples

```typescript
// Button click
const buttonHandlers: HandlerContext = {
  handleClick: () => {
    console.log('Button clicked!');
  },
};

// Form submission
const formHandlers: HandlerContext = {
  handleSubmit: (formData: FormData) => {
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('Form submitted:', { email, password });
  },
};

// Select change
const selectHandlers: HandlerContext = {
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => {
    console.log('Selected:', event.target.value);
  },
};

// Custom event
const customHandlers: HandlerContext = {
  handleCustom: (data: { message: string }) => {
    alert(data.message);
  },
};
```

---

## IntelliSense Examples

### Full Type Safety

```typescript
// ❌ TypeScript Error - 'invalid-variant' not allowed
const config1: ComponentConfig<'button'> = {
  type: 'button',
  props: {
    variant: 'invalid-variant', // ❌ Type error
  },
};

// ✅ Correct - IDE suggests valid options
const config2: ComponentConfig<'button'> = {
  type: 'button',
  props: {
    variant: 'default', // ✅ IDE suggests: 'default' | 'destructive' | 'outline' | ...
  },
};
```

### IDE Autocomplete

```typescript
// When typing props, IDE shows available options
const config: ComponentConfig<'select'> = {
  type: 'select',
  props: {
    // IDE shows these options:
    // - name: string
    // - placeholder: string
    // - disabled: boolean
    // - options: Array<{ value: string; label: string }>
    options: [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
    ],
  },
};
```

### Component Props Inference

```typescript
// TypeScript infers correct props type based on component type
const inputConfig: ComponentConfig<'input'> = {
  type: 'input',
  props: {
    // IDE knows these are valid for 'input':
    type: 'email', // 'text' | 'email' | 'password' | ...
    placeholder: 'test',
    maxLength: 100,
    minLength: 5,
    // These would be errors:
    // variant: 'outline' // ❌ Not valid for input
    // label: 'test'      // ❌ Not valid for input (only for button)
  },
};
```

### Dynamic Type Checking

```typescript
// Function that ensures type safety
function createComponentConfig<T extends ComponentType>(
  type: T,
  props: ComponentTypeProps[T],
  children?: ComponentConfig[]
): ComponentConfig<T> {
  return { type, props, children };
}

// Usage with type inference
const config = createComponentConfig(
  'button',
  { label: 'Click', variant: 'default' } // Type-checked!
);
```

---

## Advanced Patterns

### Discriminated Unions for Type Safety

The library uses TypeScript discriminated unions to provide precise autocomplete:

```typescript
// Type narrowing with discriminated union
type ComponentConfigUnion =
  | { type: 'button'; props?: ButtonProps }
  | { type: 'input'; props?: InputProps }
  | { type: 'select'; props?: SelectProps }
  | ...
  | { type: string; props?: Record<string, any> }; // Catch-all for custom

const config: ComponentConfigUnion = {
  type: 'button',
  props: {
    // IDE only shows ButtonProps options:
    label: 'Click',
    variant: 'default'
  }
};
```

### Generic Component Rendering

```typescript
function renderTypedComponent<T extends ComponentType>(
  config: ComponentConfig<T>,
  handlers: HandlerContext
): React.ReactElement {
  // Type-safe rendering based on component type
  return renderComponent(config, { handlers });
}

// Usage
const button = renderTypedComponent({ type: 'button', props: { label: 'Test' } }, handlers);
```

### Validation Schema Creation

```typescript
// Create type-safe validation schema
const loginSchema: Record<keyof LoginFormData, ValidationRule> = {
  email: {
    required: true,
    pattern: 'email',
  },
  password: {
    required: true,
    minLength: 8,
  },
};

// Use in validation
const errors = validateFormData(formData, loginSchema);
```

---

## API Quick Reference

### Main Functions

```typescript
// Component rendering
renderComponent(config: ComponentConfig, options?: RenderOptions): React.ReactElement
renderPage(config: PageConfig, options?: RenderOptions): React.ReactElement

// Component registration
registerComponent(name: string, component: React.ComponentType): void
registerComponents(components: Record<string, React.ComponentType>): void

// Validation
validateValue(value: any, rules: ValidationRule | ValidationRule[]): string | null
validateFormData(data: Record<string, any>, schema: Record<string, ValidationRule>): Record<string, string>

// Utilities
createForm(fields: [...], options?: {...}): ComponentConfig
createCardForm(fields: [...], options?: {...}): ComponentConfig
createGrid(items: [...], options?: {...}): ComponentConfig
createPage(children: [...], options?: {...}): ComponentConfig

// Hooks
useHandlers(): HandlerContext
```

### Interfaces

```typescript
interface ComponentConfig<T = ComponentType> { ... }
interface PageConfig { ... }
interface ValidationRule { ... }
interface RenderOptions { ... }
interface HandlerContext { ... }
```

---

## Best Practices

### ✅ DO

```typescript
// Use discriminated unions for type safety
const config: ComponentConfig<'button'> = {
  type: 'button',
  props: { label: 'Click', variant: 'default' }
};

// Organize handlers by scope
const handlers = {
  handleFormSubmit: (data) => { /* ... */ },
  handleModalOpen: () => { /* ... */ }
};

// Use utility functions for common patterns
const form = createForm([...], { title: 'Login' });

// Define validation schema separately
const schema = { email: { required: true, pattern: 'email' } };
```

### ❌ DON'T

```typescript
// Don't use 'any' for props
const config: ComponentConfig<any> = { ... }; // ❌

// Don't hardcode handler names without testing
props.onClick: 'nonExistentHandler' // ❌ Runtime error

// Don't mix config and JSX
<Button {...config.props} /> {/* ❌ Defeats the purpose */}

// Don't forget to register custom components
const config = { type: 'my-custom' }; // ❌ Not registered
```

---

This guide provides a comprehensive reference for using the TypeScript API of Advance Form library!
