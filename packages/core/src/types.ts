/**
 * Component type union - all supported shadcn/ui and custom components
 */
export type ComponentType =
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
  | 'input-group'
  | 'label'
  | 'field'
  // Button & Interactive
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
  | 'scroll-area'
  // Feedback
  | 'alert'
  | 'alert-dialog'
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
  | 'dropdown-menu'
  | 'hover-card'
  | 'sheet'
  // Content
  | 'avatar'
  | 'calendar'
  | 'command'
  | 'combobox'
  | 'date-picker'
  | 'kbd'
  | 'separator'
  | 'aspect-ratio'
  | 'resizable'
  | 'slider'
  | 'switch'
  | 'typography'
  | 'native-select'
  | 'empty'
  | 'chart'
  | 'sonner'
  | 'input-otp'
  // Custom components
  | (string & {});

/**
 * Button component props
 */
export interface ButtonProps {
  label?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  onClick?: string; // Handler key
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Input component props
 */
export interface InputProps {
  name?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date';
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  className?: string;
  value?: string | number;
  onChange?: string; // Handler key
  defaultValue?: string | number;
}

/**
 * Textarea component props
 */
export interface TextareaProps {
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  rows?: number;
  className?: string;
  value?: string;
  onChange?: string; // Handler key
  defaultValue?: string;
}

/**
 * Card component props
 */
export interface CardProps {
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Form component props
 */
export interface FormProps {
  onSubmit?: (prop: FormData) => void; // Handler key
  onChange?: (prop: React.FormEvent<HTMLFormElement>) => void; // Handler key
  className?: string;
}

/**
 * Select component props
 */
export interface SelectProps {
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  onChange?: string; // Handler key
  options?: Array<{ value: string; label: string }>;
}

/**
 * Checkbox component props
 */
export interface CheckboxProps {
  name?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: string; // Handler key
  defaultChecked?: boolean;
}

/**
 * Container component props
 */
export interface ContainerProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Grid component props
 */
export interface GridProps {
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Flex component props
 */
export interface FlexProps {
  direction?: 'row' | 'column';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Dialog component props
 */
export interface DialogProps {
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (prop: boolean) => void; // Handler key
  className?: string;
}

/**
 * Badge component props
 */
export interface BadgeProps {
  label?: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}

/**
 * Tabs component props
 */
export interface TabsProps {
  defaultValue?: string;
  className?: string;
  tabs?: Array<{ value: string; label: string; content?: ComponentConfig }>;
}

/**
 * Accordion component props
 */
export interface AccordionProps {
  type?: 'single' | 'multiple';
  className?: string;
  items?: Array<{ value: string; title: string; content?: ComponentConfig }>;
}

/**
 * Toggle component props
 */
export interface ToggleProps {
  label?: string;
  pressed?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: string; // Handler key
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Validation rule for component fields
 */
export interface ValidationRule {
  required?: boolean;
  type?: 'string' | 'number' | 'boolean';
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: 'email' | 'url' | string | RegExp;
  custom?: (value: any) => string | null | undefined;
}

/**
 * Component configuration object
 */
export interface ComponentConfig<T extends ComponentType = ComponentType> {
  type: T;
  props?: T extends 'button'
    ? ButtonProps
    : T extends 'input'
      ? InputProps
      : T extends 'textarea'
        ? TextareaProps
        : T extends 'card'
          ? CardProps
          : T extends 'form'
            ? FormProps
            : T extends 'select'
              ? SelectProps
              : T extends 'checkbox'
                ? CheckboxProps
                : T extends 'toggle'
                  ? ToggleProps
                  : T extends 'container'
                    ? ContainerProps
                    : T extends 'grid'
                      ? GridProps
                      : T extends 'flex'
                        ? FlexProps
                        : T extends 'dialog'
                          ? DialogProps
                          : T extends 'badge'
                            ? BadgeProps
                            : T extends 'tabs'
                              ? TabsProps
                              : T extends 'accordion'
                                ? AccordionProps
                                : Record<string, any>;
  children?: ComponentConfig[];
  validation?: ValidationRule | ValidationRule[];
  key?: string;
}

/**
 * Page configuration object
 */
export interface PageConfig {
  layout?: ComponentType;
  props?: Record<string, any>;
  children?: ComponentConfig[];
}

/**
 * Handler context type - maps handler names to functions
 */
export type HandlerContext = Record<string, (...args: any[]) => any>;

/**
 * Renderer options
 */
export interface RenderOptions {
  handlers?: HandlerContext;
  customComponents?: Record<string, React.ComponentType<any>>;
  onError?: (error: Error) => void;
  suspenseFallback?: React.ReactNode;
}

// export {
//   ComponentType,
//   ButtonProps,
//   InputProps,
//   TextareaProps,
//   CardProps,
//   FormProps,
//   SelectProps,
//   CheckboxProps,
//   ValidationRule,
//   ComponentConfig,
//   PageConfig,
//   HandlerContext,
//   RenderOptions,
// };
