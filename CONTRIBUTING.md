# Contributing to Advance Form

Thank you for considering contributing to Advance Form! This document provides guidelines and instructions for contributing.

## 🎯 How to Contribute

### 1. Report Bugs

If you find a bug, please open an issue on GitHub with:

- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### 2. Suggest Features

Have a great idea? Open a feature request issue with:

- Description of the feature
- Use cases and benefits
- Proposed API if applicable
- Examples if available

### 3. Submit Code

#### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/yourusername/advance-form.git
cd advance-form

# Install dependencies
npm install

# Create a feature branch
git checkout -b feature/your-feature-name
```

#### Development Workflow

```bash
# Watch mode for library
npm run dev

# Run example app
cd apps/example
npm run dev

# Run tests
npm run test

# Run linter
npm run lint

# Format code
npx prettier --write .
```

#### Making Changes

1. **Create a feature branch**: `git checkout -b feature/my-feature`
2. **Make your changes** in the appropriate file
3. **Test your changes** in the example app
4. **Run linting**: `npm run lint`
5. **Format code**: `npx prettier --write src/`

#### For Adding New Components

1. Create component file in `packages/core/src/components/`
2. Update component exports in `packages/core/src/components/index.ts`
3. Add TypeScript types in `packages/core/src/types.ts`
4. Add example in `apps/example/src/pages/`
5. Update documentation in `docs/README.en.md` and `docs/README.fa.md`

Example component structure:

```typescript
// packages/core/src/components/MyComponent.tsx
import React from 'react';
import { MyComponentProps } from '../types';

export const MyComponent = React.forwardRef<
  HTMLDivElement,
  MyComponentProps & React.HTMLAttributes<HTMLDivElement>
>(({ title, children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
});

MyComponent.displayName = 'MyComponent';
export default MyComponent;
```

Then add to types:

```typescript
// packages/core/src/types.ts
export interface MyComponentProps {
  title?: string;
  className?: string;
}

// Add to ComponentConfig discriminated union
export interface ComponentConfig<T = ComponentType> {
  type: T extends 'my-component' ? {
    type: 'my-component';
    props?: MyComponentProps;
  } : ...
}
```

### 4. Commit Guidelines

Follow conventional commits:

```bash
git commit -m "feat: add MyComponent"
git commit -m "fix: handle edge case in renderer"
git commit -m "docs: update README with examples"
git commit -m "test: add tests for MyComponent"
git commit -m "refactor: improve validation performance"
```

### 5. Push and Create Pull Request

```bash
git push origin feature/my-feature
# Create PR on GitHub
```

#### PR Checklist

- [ ] Tests pass locally
- [ ] Code is formatted with prettier
- [ ] Linter passes (eslint)
- [ ] Documentation is updated
- [ ] Examples are included
- [ ] Types are properly defined
- [ ] No breaking changes (if not a major version)

---

## 📋 Development Tasks

### Current Priorities

1. **Implement Remaining Components** (40+ placeholders)

   - Dialog, Drawer, Tabs, Accordion, Table
   - Badge, Alert, Progress, Skeleton
   - Others as needed

2. **Add Testing**

   - Unit tests with Vitest
   - Component tests with React Testing Library
   - E2E tests with Playwright

3. **Documentation**

   - API docs for each component
   - Tutorial videos
   - Common patterns guide

4. **Examples**

   - Dashboard template
   - CRUD form template
   - Admin panel example

5. **Performance**
   - Bundle size optimization
   - Render performance optimization
   - Caching strategies

### Easy Starter Tasks

- [ ] Add more validation examples
- [ ] Improve error messages
- [ ] Add more utility functions
- [ ] Improve documentation
- [ ] Fix TypeScript warnings

---

## 📚 Project Structure Reference

```
packages/core/
├── src/
│   ├── index.ts           # Main exports
│   ├── types.ts           # All TypeScript types
│   ├── validators/        # Validation system
│   ├── registry.ts        # Component registry
│   ├── renderer.tsx       # Core rendering engine
│   ├── components/        # Component adapters
│   ├── utils.ts           # Utility functions
│   └── next.ts            # Next.js support
├── dist/                  # Built output
├── package.json
└── tsup.config.ts         # Build configuration

apps/example/
├── src/
│   ├── App.tsx            # Main app with navigation
│   └── pages/             # Demo pages
├── index.html
├── package.json
└── vite.config.ts
```

---

## 🧪 Testing Guidelines

### Unit Tests

```typescript
// File: packages/core/src/validators/__tests__/index.test.ts
import { validateValue } from '../index';

describe('validators', () => {
  test('should validate required field', () => {
    const error = validateValue('', { required: true });
    expect(error).toBe('This field is required');
  });

  test('should validate email pattern', () => {
    const error = validateValue('invalid', { pattern: 'email' });
    expect(error).not.toBeNull();
  });
});
```

### Component Tests

```typescript
// File: packages/core/src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button Component', () => {
  test('renders button with label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button label="Click" onClick={handleClick} />);

    const button = screen.getByText('Click');
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

---

## 📖 Documentation Guidelines

When adding a new component:

1. **Add to TypeScript API doc** (`docs/TYPESCRIPT_API.md`)
2. **Add to README** (`docs/README.en.md` and `docs/README.fa.md`)
3. **Add example** in the example app
4. **Add types** in `src/types.ts`
5. **Add to component exports** in `src/components/index.ts`

---

## 🚀 Release Process

### Version Bumping

```bash
cd packages/core
npm version patch   # 1.0.0 -> 1.0.1
npm version minor   # 1.0.0 -> 1.1.0
npm version major   # 1.0.0 -> 2.0.0
```

### Publishing

```bash
npm run build
npm publish
```

---

## 💬 Community

- **Discussions**: GitHub Discussions
- **Issues**: GitHub Issues
- **Email**: support@advance-form.dev

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## ✨ Thank You

Thank you for your interest in improving Advance Form! Every contribution helps make this library better for everyone. 🙏

Happy coding! 🚀
