# Advance Form - راهنمای کامل (فارسی)

## 📚 فهرست مطالب

1. [مقدمه](#مقدمه)
2. [نصب](#نصب)
3. [شروع سریع](#شروع-سریع)
4. [مفاهیم اساسی](#مفاهیم-اساسی)
5. [کامپوننت‌ها](#کامپوننت‌ها)
6. [ولیدیشن](#ولیدیشن)
7. [مثال‌های عملی](#مثال‌های-عملی)
8. [API Reference](#api-reference)

---

## مقدمه

**Advance Form** یک کتابخانه React به زبان TypeScript است که به شما امکان می‌دهد رابط‌های کاربری پیچیده را بدون نوشتن JSX، تنها با تعریف ابجکت‌های کانفیگ بسازید.

### ویژگی‌های اصلی

✨ **رندر کردن محتوا‌‌ از طریق کانفیگ** - کامپوننت‌ها را از ابجکت‌های ساده تعریف کنید  
📝 **IntelliSense کامل** - autocomplete و پیشنهاد props در IDE  
✔️ **سیستم ولیدیشن داخلی** - بررسی required fields، type checking، pattern validation  
🚀 **Lazy Loading** - کامپوننت‌ها فقط زمانی لود می‌شوند که مورد نیاز باشند  
🎨 **قابل‌توسعه** - کامپوننت‌های سفارشی را ثبت کنید و استفاده کنید  
📱 **Layout Components** - Container، Grid، Flex برای طراحی صفحات

---

## نصب

### پیشنیاز‌ها

- Node.js 16+
- React 17+
- TypeScript 4.9+

### دستورات نصب

```bash
npm install advance-form
# یا
yarn add advance-form
```

اگر می‌خواهید shadcn/ui components را استفاده کنید:

```bash
npm install shadcn-ui
```

---

## شروع سریع

### 1. رندر کردن یک دکمه ساده

```tsx
import { renderComponent } from 'advance-form';

const config = {
  type: 'button',
  props: {
    label: 'کلیک کنید',
    variant: 'default',
  },
};

export default function App() {
  return renderComponent(config);
}
```

### 2. دکمه با عملکرد

```tsx
import { renderComponent } from 'advance-form';

const config = {
  type: 'button',
  props: {
    label: 'ارسال',
    onClick: 'handleSubmit',
  },
};

export default function App() {
  const handlers = {
    handleSubmit: () => {
      console.log('دکمه کلیک شد!');
    },
  };

  return renderComponent(config, { handlers });
}
```

### 3. فرم ورود کامل

```tsx
import { renderPage } from 'advance-form';

const loginConfig = {
  layout: 'container',
  props: { maxWidth: 'sm', padding: 'lg' },
  children: [
    {
      type: 'card',
      props: { title: 'ورود', description: 'ایمیل و رمز عبور را وارد کنید' },
      children: [
        {
          type: 'form',
          props: { onSubmit: 'handleLogin' },
          children: [
            {
              type: 'input',
              props: { name: 'email', placeholder: 'ایمیل', type: 'email' },
              validation: { required: true, pattern: 'email' },
            },
            {
              type: 'input',
              props: { name: 'password', placeholder: 'رمز عبور', type: 'password' },
              validation: { required: true, minLength: 8 },
            },
            {
              type: 'button',
              props: { label: 'ورود', type: 'submit' },
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
      console.log('فرم ارسال شد:', formData);
    },
  };

  return renderPage(loginConfig, { handlers });
}
```

---

## مفاهیم اساسی

### ComponentConfig

هر `ComponentConfig` یک ابجکت با ساختار زیر است:

```typescript
interface ComponentConfig {
  type: ComponentType; // نوع کامپوننت (مثل 'button'، 'input')
  props?: Record<string, any>; // خصوصیات کامپوننت
  children?: ComponentConfig[]; // کامپوننت‌های فرزند
  validation?: ValidationRule; // قوانین ولیدیشن
}
```

### PageConfig

برای ساختن صفحات کامل:

```typescript
interface PageConfig {
  layout?: ComponentType; // نوع layout (مثل 'container')
  props?: Record<string, any>; // خصوصیات layout
  children?: ComponentConfig[]; // کامپوننت‌های صفحه
}
```

### Handler Context

برای اتصال توابع به events:

```tsx
const handlers = {
  handleSubmit: (data) => console.log(data),
  handleChange: (event) => console.log(event),
  handleClick: () => console.log('clicked'),
};

renderComponent(config, { handlers });
```

---

## کامپوننت‌ها

### Form Components

#### Input

```typescript
{
  type: 'input',
  props: {
    name: 'email',
    placeholder: 'ایمیل خود را وارد کنید',
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
    placeholder: 'پیام خود را بنویسید',
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
    placeholder: 'کشور را انتخاب کنید',
    options: [
      { value: 'ir', label: 'ایران' },
      { value: 'us', label: 'آمریکا' },
      { value: 'uk', label: 'انگلستان' }
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
    label: 'شرایط استفاده را می‌پذیرم'
  },
  validation: { required: true }
}
```

### Button Component

```typescript
{
  type: 'button',
  props: {
    label: 'دکمه',
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
    title: 'عنوان کارت',
    description: 'توضیح کارت'
  },
  children: [
    // کامپوننت‌های فرزند
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
    { type: 'card', props: { title: 'کارت 1' } },
    { type: 'card', props: { title: 'کارت 2' } },
    { type: 'card', props: { title: 'کارت 3' } }
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

## ولیدیشن

### قوانین ولیدیشن داخلی

```typescript
import { validators, validateValue } from 'advance-form/validators';

const validationRules = {
  required: true, // میدان الزامی است
  type: 'string', // بررسی نوع (string | number | boolean)
  minLength: 3, // حداقل طول
  maxLength: 50, // حداکثر طول
  min: 1, // حداقل مقدار (برای اعداد)
  max: 100, // حداکثر مقدار (برای اعداد)
  pattern: 'email', // الگو (email | url | regex)
  custom: (value) => {
    // تابع سفارشی
    if (value !== 'special') {
      return 'مقدار باید "special" باشد';
    }
    return null; // بدون خطا
  },
};

// استفاده
const error = validateValue('test@example.com', {
  pattern: 'email',
});

console.log(error); // null (معتبر است)
```

### استفاده در ComponentConfig

```typescript
{
  type: 'input',
  props: {
    name: 'username',
    placeholder: 'نام کاربری'
  },
  validation: {
    required: true,
    minLength: 3,
    maxLength: 20,
    custom: (value) => {
      if (!value.match(/^[a-z0-9_]+$/)) {
        return 'فقط حروف کوچک، اعداد و _ مجاز است';
      }
      return null;
    }
  }
}
```

---

## مثال‌های عملی

### مثال 1: فرم ورود ساده

```tsx
import { renderPage } from 'advance-form';

const config = {
  layout: 'container',
  props: { maxWidth: 'sm', padding: 'lg' },
  children: [
    {
      type: 'card',
      props: { title: 'ورود' },
      children: [
        {
          type: 'form',
          props: { onSubmit: 'handleLogin' },
          children: [
            {
              type: 'input',
              props: { name: 'email', placeholder: 'ایمیل', type: 'email' },
              validation: { required: true, pattern: 'email' },
            },
            {
              type: 'input',
              props: { name: 'password', placeholder: 'رمز عبور', type: 'password' },
              validation: { required: true, minLength: 6 },
            },
            {
              type: 'button',
              props: { label: 'ورود', type: 'submit' },
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
        alert(`ورود با ایمیل: ${formData.get('email')}`);
      },
    },
  });
}
```

### مثال 2: فرم تماس با چند فیلد

```tsx
const contactConfig = {
  layout: 'container',
  props: { maxWidth: 'md', padding: 'lg' },
  children: [
    {
      type: 'card',
      props: { title: 'تماس با ما' },
      children: [
        {
          type: 'form',
          props: { onSubmit: 'handleSubmit' },
          children: [
            {
              type: 'input',
              props: { name: 'name', placeholder: 'نام' },
              validation: { required: true },
            },
            {
              type: 'input',
              props: { name: 'email', placeholder: 'ایمیل', type: 'email' },
              validation: { required: true, pattern: 'email' },
            },
            {
              type: 'select',
              props: {
                name: 'subject',
                placeholder: 'موضوع',
                options: [
                  { value: 'support', label: 'پشتیبانی' },
                  { value: 'feedback', label: 'نظرات' },
                ],
              },
              validation: { required: true },
            },
            {
              type: 'textarea',
              props: { name: 'message', placeholder: 'پیام' },
              validation: { required: true, minLength: 10 },
            },
            {
              type: 'button',
              props: { label: 'ارسال', type: 'submit' },
            },
          ],
        },
      ],
    },
  ],
};
```

### مثال 3: Grid Layout با کارت‌ها

```tsx
const gridConfig = {
  type: 'container',
  props: { padding: 'lg' },
  children: [
    {
      type: 'grid',
      props: { columns: 3, gap: 'md' },
      children: [
        { type: 'card', props: { title: 'ویژگی 1', description: 'توضیح 1' } },
        { type: 'card', props: { title: 'ویژگی 2', description: 'توضیح 2' } },
        { type: 'card', props: { title: 'ویژگی 3', description: 'توضیح 3' } },
      ],
    },
  ],
};
```

---

## API Reference

### توابع اصلی

#### `renderComponent(config, options?)`

رندر کردن یک کامپوننت از کانفیگ

```typescript
function renderComponent(config: ComponentConfig, options?: RenderOptions): React.ReactElement;

interface RenderOptions {
  handlers?: HandlerContext;
  customComponents?: Record<string, React.ComponentType>;
  suspenseFallback?: React.ReactNode;
}
```

#### `renderPage(config, options?)`

رندر کردن یک صفحه کامل

```typescript
function renderPage(config: PageConfig, options?: RenderOptions): React.ReactElement;
```

#### `registerComponent(name, component)`

ثبت کردن یک کامپوننت سفارشی

```typescript
function registerComponent(
  name: string,
  component: React.ComponentType | (() => Promise<...>)
): void;
```

#### `registerComponents(components)`

ثبت کردن چند کامپوننت

```typescript
function registerComponents(components: Record<string, React.ComponentType>): void;
```

### Validators

#### `validateValue(value, rules)`

بررسی کردن یک مقدار

```typescript
function validateValue(value: any, rules: ValidationRule | ValidationRule[]): string | null;
```

---

## نکات مهم

1. **Type Safety** - تمام props TypeScript type-safe هستند
2. **Lazy Loading** - کامپوننت‌ها خودکار lazy load می‌شوند
3. **Performance** - فقط کامپوننت‌های استفاده شده bundle می‌شوند
4. **Extensibility** - کامپوننت‌های سفارشی را به آسانی اضافه کنید
5. **SSR Support** - با Next.js و سایر SSR frameworks کار می‌کند

---

## مشکل‌ یابی

### کامپوننت پیدا نمی‌شود

مطمئن شوید کامپوننت ثبت شده است:

```tsx
import { registerComponents, ShadcnComponents } from 'advance-form';
registerComponents(ShadcnComponents);
```

### خطاهای TypeScript

نسخه TypeScript خود را بروزرسانی کنید:

```bash
npm install -D typescript@^5.3
```

---

برای اطلاعات بیشتر به [README](../README.md) و [SETUP.md](../SETUP.md) مراجعه کنید.
