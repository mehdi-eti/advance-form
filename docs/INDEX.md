# 📚 Documentation Index

Welcome to the Advance Form documentation! Here's a guide to all available resources.

## 🚀 Getting Started

### For New Users

1. **[README.md](../README.md)** - Overview and quick start
2. **[docs/README.en.md](./README.en.md)** - Complete guide (English)
3. **[docs/README.fa.md](./README.fa.md)** - Complete guide (Persian/فارسی)
4. **[SETUP.md](../SETUP.md)** - Development and installation guide

### For Developers

1. **[docs/TYPESCRIPT_API.md](./TYPESCRIPT_API.md)** - Full TypeScript API reference
2. **[CONTRIBUTING.md](../CONTRIBUTING.md)** - How to contribute
3. **[packages/core/README.md](../packages/core/README.md)** - Library README

---

## 📖 Documentation Files

### Main Documentation

| File                                     | Purpose                     | Audience         |
| ---------------------------------------- | --------------------------- | ---------------- |
| [README.en.md](./README.en.md)           | Complete guide in English   | Everyone         |
| [README.fa.md](./README.fa.md)           | Complete guide in Persian   | Persian speakers |
| [TYPESCRIPT_API.md](./TYPESCRIPT_API.md) | TypeScript type definitions | Developers       |

### Setup & Development

| File                                     | Purpose                    | Audience     |
| ---------------------------------------- | -------------------------- | ------------ |
| [../SETUP.md](../SETUP.md)               | Development setup guide    | Developers   |
| [../CONTRIBUTING.md](../CONTRIBUTING.md) | Contributing guidelines    | Contributors |
| [../SUMMARY.md](../SUMMARY.md)           | Project completion summary | Everyone     |

### Project Files

| File                                                     | Purpose               | Audience   |
| -------------------------------------------------------- | --------------------- | ---------- |
| [../README.md](../README.md)                             | Main project overview | Everyone   |
| [../package.json](../package.json)                       | Root package config   | Developers |
| [../packages/core/README.md](../packages/core/README.md) | Library package info  | Developers |

---

## 📚 Learn By Example

The example app (`apps/example/src/pages/`) has 7 working examples:

### Example Pages

1. **[LoginPage.tsx](../apps/example/src/pages/LoginPage.tsx)**

   - Basic form with validation
   - Email and password validation
   - Form submission handling

2. **[ContactForm.tsx](../apps/example/src/pages/ContactForm.tsx)**

   - Multi-field form
   - Various input types
   - Select dropdown
   - Textarea
   - Checkbox

3. **[RegistrationPage.tsx](../apps/example/src/pages/RegistrationPage.tsx)**

   - Complex validation
   - Custom validation functions
   - Error handling and display
   - Password confirmation

4. **[ButtonDemo.tsx](../apps/example/src/pages/ButtonDemo.tsx)**

   - Simple button with click handler
   - Event handling basics

5. **[GridLayoutDemo.tsx](../apps/example/src/pages/GridLayoutDemo.tsx)**

   - Responsive grid layout
   - Multiple cards
   - Layout composition

6. **[CustomComponentsDemo.tsx](../apps/example/src/pages/CustomComponentsDemo.tsx)**

   - Custom component registration
   - Mixing custom and built-in components
   - Custom props and styling

7. **[UtilsDemo.tsx](../apps/example/src/pages/UtilsDemo.tsx)**
   - Using utility helper functions
   - `createForm()`, `createCardForm()`, `createGrid()`
   - Quick layout creation

---

## 🎯 Quick Navigation

### I want to...

**Learn the basics**
→ [docs/README.en.md - Quick Start](./README.en.md#quick-start)

**Understand components**
→ [docs/README.en.md - Components](./README.en.md#components)

**Learn validation**
→ [docs/README.en.md - Validation](./README.en.md#validation)

**Use custom components**
→ [docs/README.en.md](./README.en.md) → Search "Custom Components"

**Build a form**
→ [apps/example/src/pages/LoginPage.tsx](../apps/example/src/pages/LoginPage.tsx)

**Understand the API**
→ [docs/TYPESCRIPT_API.md](./TYPESCRIPT_API.md)

**Set up development**
→ [SETUP.md](../SETUP.md)

**Contribute code**
→ [CONTRIBUTING.md](../CONTRIBUTING.md)

**See all features**
→ [SUMMARY.md](../SUMMARY.md)

---

## 🌐 Language Support

### English (English)

- [docs/README.en.md](./README.en.md) - Full documentation
- [docs/TYPESCRIPT_API.md](./TYPESCRIPT_API.md) - API reference

### Persian (فارسی)

- [docs/README.fa.md](./README.fa.md) - مستندات کامل

---

## 🏗️ Project Structure

```
advance-form/
├── docs/                          # Documentation folder
│   ├── INDEX.md                   # This file
│   ├── README.en.md              # English documentation
│   ├── README.fa.md              # Persian documentation
│   └── TYPESCRIPT_API.md          # API reference
├── packages/core/                # Main library
│   ├── src/                      # Source code
│   ├── README.md                 # Library README
│   └── dist/                     # Built output
├── apps/example/                 # Example application
│   ├── src/pages/               # Demo pages
│   └── README.md                # Example README
├── README.md                     # Main project README
├── SETUP.md                      # Development guide
├── CONTRIBUTING.md               # Contributing guide
└── SUMMARY.md                    # Project summary
```

---

## 🔍 Finding Information

### By Component

Each component type has documentation in:

- [docs/README.en.md - Components](./README.en.md#components)
- [docs/TYPESCRIPT_API.md - Type Definitions](./TYPESCRIPT_API.md#type-definitions)

### By Topic

- **Validation**: [docs/README.en.md#validation](./README.en.md#validation)
- **TypeScript**: [docs/TYPESCRIPT_API.md](./TYPESCRIPT_API.md)
- **Utilities**: [docs/README.en.md](./README.en.md) (search "Utility")
- **Forms**: [apps/example/src/pages/LoginPage.tsx](../apps/example/src/pages/LoginPage.tsx)
- **Layouts**: [apps/example/src/pages/GridLayoutDemo.tsx](../apps/example/src/pages/GridLayoutDemo.tsx)

### By Use Case

- **I need a login form** → See [LoginPage.tsx](../apps/example/src/pages/LoginPage.tsx)
- **I need a contact form** → See [ContactForm.tsx](../apps/example/src/pages/ContactForm.tsx)
- **I need a grid layout** → See [GridLayoutDemo.tsx](../apps/example/src/pages/GridLayoutDemo.tsx)
- **I need custom components** → See [CustomComponentsDemo.tsx](../apps/example/src/pages/CustomComponentsDemo.tsx)

---

## 🎓 Learning Path

### Beginner

1. Read [README.md](../README.md)
2. Read [docs/README.en.md - Quick Start](./README.en.md#quick-start)
3. Run the example app: `npm run dev`
4. Try the [LoginPage example](../apps/example/src/pages/LoginPage.tsx)

### Intermediate

1. Study [docs/TYPESCRIPT_API.md](./TYPESCRIPT_API.md)
2. Try [ContactForm example](../apps/example/src/pages/ContactForm.tsx)
3. Learn [validation](./README.en.md#validation)
4. Try [UtilsDemo example](../apps/example/src/pages/UtilsDemo.tsx)

### Advanced

1. Read [CONTRIBUTING.md](../CONTRIBUTING.md)
2. Study [SETUP.md](../SETUP.md)
3. Look at library source in [packages/core/src/](../packages/core/src/)
4. Try [CustomComponentsDemo](../apps/example/src/pages/CustomComponentsDemo.tsx)
5. Contribute new components or features

---

## 🚀 Quick Commands

```bash
# Install and setup
npm install

# Development
npm run dev              # Watch mode for library
npm run build            # Build library
npm run lint             # Run ESLint

# Example app
cd apps/example
npm run dev              # Start example app on http://localhost:3000

# Documentation
# Open docs/README.en.md for English
# Open docs/README.fa.md for Persian
```

---

## ❓ FAQ

**Q: How do I get started?**
A: Read [README.md](../README.md) and follow the [Quick Start](./README.en.md#quick-start) guide.

**Q: Where are the components documented?**
A: See [docs/README.en.md - Components](./README.en.md#components) section.

**Q: How do I validate forms?**
A: See [docs/README.en.md - Validation](./README.en.md#validation) section.

**Q: Can I use custom components?**
A: Yes! See [CustomComponentsDemo.tsx](../apps/example/src/pages/CustomComponentsDemo.tsx) example.

**Q: Is this production-ready?**
A: See [SUMMARY.md](../SUMMARY.md) for current status and roadmap.

**Q: How do I contribute?**
A: Read [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

**Q: What's the TypeScript API?**
A: See [docs/TYPESCRIPT_API.md](./TYPESCRIPT_API.md) for complete reference.

---

## 📞 Support

- **Documentation**: You're reading it! Check the relevant section above
- **Examples**: See `apps/example/src/pages/` for 7 working examples
- **GitHub Issues**: Report bugs or ask questions
- **GitHub Discussions**: General discussions and questions

---

## 📝 License

All documentation is available under the MIT License.

---

## 🎉 Happy Learning!

Start with [README.md](../README.md) and explore the documentation based on your needs. If you have questions, check the FAQ above or refer to the relevant documentation section.

Happy coding! 🚀
