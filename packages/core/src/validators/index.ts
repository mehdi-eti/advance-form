import { ValidationRule } from '@/types';
import { z } from 'zod';

/**
 * Base validation rule schema
 */
export const BaseValidationRuleSchema = z.object({
  required: z.boolean().optional(),
  type: z.enum(['string', 'number', 'boolean']).optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  pattern: z.union([z.literal('email'), z.literal('url'), z.string()]).optional(),
  custom: z.function().optional(),
});

export type BaseValidationRule = z.infer<typeof BaseValidationRuleSchema>;

/**
 * Validator function type
 */
export type ValidatorFn = (value: any) => string | null | undefined;

/**
 * Built-in validators
 */
export const validators = {
  required: (value: any): string | null => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'This field is required';
    }
    return null;
  },

  email: (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  url: (value: string): string | null => {
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  minLength:
    (min: number) =>
    (value: string): string | null => {
      if (value && value.length < min) {
        return `Minimum length is ${min} characters`;
      }
      return null;
    },

  maxLength:
    (max: number) =>
    (value: string): string | null => {
      if (value && value.length > max) {
        return `Maximum length is ${max} characters`;
      }
      return null;
    },

  min:
    (minValue: number) =>
    (value: number): string | null => {
      if (value != null && value < minValue) {
        return `Minimum value is ${minValue}`;
      }
      return null;
    },

  max:
    (maxValue: number) =>
    (value: number): string | null => {
      if (value != null && value > maxValue) {
        return `Maximum value is ${maxValue}`;
      }
      return null;
    },

  pattern:
    (pattern: string | RegExp) =>
    (value: string): string | null => {
      const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
      if (value && !regex.test(value)) {
        return 'Invalid format';
      }
      return null;
    },

  custom: (fn: ValidatorFn) => fn,
};

/**
 * Validate a value against rules
 */
export function validateValue(
  value: any,
  rules: BaseValidationRule | BaseValidationRule[] | ValidationRule | ValidationRule[]
): string | null {
  const rulesList = Array.isArray(rules) ? rules : [rules];

  for (const rule of rulesList) {
    // Check required
    if (rule.required) {
      const error = validators.required(value);
      if (error) return error;
    }

    // Check type
    if (rule.type && value != null) {
      const actualType = typeof value;
      if (actualType !== rule.type) {
        return `Expected type ${rule.type}, got ${actualType}`;
      }
    }

    // Check minLength
    if (rule.minLength && typeof value === 'string') {
      const error = validators.minLength(rule.minLength)(value);
      if (error) return error;
    }

    // Check maxLength
    if (rule.maxLength && typeof value === 'string') {
      const error = validators.maxLength(rule.maxLength)(value);
      if (error) return error;
    }

    // Check min
    if (rule.min != null && typeof value === 'number') {
      const error = validators.min(rule.min)(value);
      if (error) return error;
    }

    // Check max
    if (rule.max != null && typeof value === 'number') {
      const error = validators.max(rule.max)(value);
      if (error) return error;
    }

    // Check pattern
    if (rule.pattern) {
      let patternError: string | null = null;
      if (rule.pattern === 'email') {
        patternError = validators.email(value);
      } else if (rule.pattern === 'url') {
        patternError = validators.url(value);
      } else if (typeof rule.pattern === 'string') {
        patternError = validators.pattern(rule.pattern)(value);
      }
      if (patternError) return patternError;
    }

    // Check custom
    if (rule.custom) {
      const error = rule.custom(value) as string | null;
      if (error) return error;
    }
  }

  return null;
}

export default validators;
