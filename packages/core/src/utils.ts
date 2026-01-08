/**
 * Utility functions for advance-form
 */

import { ComponentConfig, ValidationRule } from './types';
import { validateValue } from './validators';

/**
 * Create a form config quickly
 */
export function createForm(
  fields: Array<{
    name: string;
    type?: string;
    label?: string;
    placeholder?: string;
    validation?: ValidationRule;
  }>,
  options?: {
    title?: string;
    submitLabel?: string;
    onSubmit?: string;
  }
): ComponentConfig {
  const { submitLabel = 'Submit', onSubmit = 'handleSubmit' } = options || {};

  return {
    type: 'form',
    props: { onSubmit },
    children: [
      ...fields.map((field) => ({
        type: field.type === 'textarea' ? 'textarea' : 'input',
        props: {
          name: field.name,
          placeholder: field.placeholder || field.label,
          type: field.type || 'text',
        },
        validation: field.validation,
      })),
      {
        type: 'button',
        props: {
          label: submitLabel,
          type: 'submit',
        },
      },
    ],
  };
}

/**
 * Create a card with form inside
 */
export function createCardForm(
  fields: Array<{
    name: string;
    type?: string;
    label?: string;
    placeholder?: string;
    validation?: ValidationRule;
  }>,
  options?: {
    title?: string;
    description?: string;
    submitLabel?: string;
    onSubmit?: string;
  }
): ComponentConfig {
  const form = createForm(fields, {
    submitLabel: options?.submitLabel,
    onSubmit: options?.onSubmit,
  });

  return {
    type: 'card',
    props: {
      title: options?.title,
      description: options?.description,
    },
    children: [form],
  };
}

/**
 * Create a grid of cards
 */
export function createGrid(
  items: Array<{
    title: string;
    description?: string;
    children?: ComponentConfig[];
  }>,
  options?: {
    columns?: number;
    gap?: 'sm' | 'md' | 'lg';
  }
): ComponentConfig {
  return {
    type: 'grid',
    props: {
      columns: options?.columns || 3,
      gap: options?.gap || 'md',
    },
    children: items.map((item) => ({
      type: 'card',
      props: {
        title: item.title,
        description: item.description,
      },
      children: item.children,
    })),
  };
}

/**
 * Create a page layout
 */
export function createPage(
  children: ComponentConfig[],
  options?: {
    layout?: string;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    padding?: 'sm' | 'md' | 'lg' | 'xl';
  }
): ComponentConfig {
  return {
    type: 'container',
    props: {
      maxWidth: options?.maxWidth || 'lg',
      padding: options?.padding || 'lg',
    },
    children,
  };
}

/**
 * Validate form data
 */
export function validateFormData(
  data: Record<string, any>,
  schema: Record<string, ValidationRule | ValidationRule[]>
): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.entries(schema).forEach(([fieldName, rules]) => {
    const value = data[fieldName];
    const error = validateValue(value, rules);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
}

export default {
  createForm,
  createCardForm,
  createGrid,
  createPage,
  validateFormData,
};
