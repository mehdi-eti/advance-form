import React, { useState } from 'react';
import { renderPage } from 'advance-form';
import type { PageConfig } from 'advance-form';

/**
 * Example: Form with real-time validation
 */
const RegistrationPageConfig: PageConfig = {
  layout: 'container',
  props: {
    maxWidth: 'md',
    padding: 'lg'
  },
  children: [
    {
      type: 'card',
      props: {
        title: 'Create Account',
        description: 'Register for a new account'
      },
      children: [
        {
          type: 'form',
          props: {
            onSubmit: 'handleRegister'
          },
          children: [
            // First Name
            {
              type: 'input',
              props: {
                name: 'firstName',
                placeholder: 'First Name',
                type: 'text'
              },
              validation: {
                required: true,
                minLength: 2,
                maxLength: 50
              }
            },
            // Last Name
            {
              type: 'input',
              props: {
                name: 'lastName',
                placeholder: 'Last Name',
                type: 'text'
              },
              validation: {
                required: true,
                minLength: 2,
                maxLength: 50
              }
            },
            // Email
            {
              type: 'input',
              props: {
                name: 'email',
                placeholder: 'Email Address',
                type: 'email'
              },
              validation: {
                required: true,
                pattern: 'email',
                maxLength: 100
              }
            },
            // Password
            {
              type: 'input',
              props: {
                name: 'password',
                placeholder: 'Password',
                type: 'password'
              },
              validation: {
                required: true,
                minLength: 8,
                maxLength: 50,
                custom: (value: string) => {
                  if (!/[A-Z]/.test(value)) {
                    return 'Password must contain at least one uppercase letter';
                  }
                  if (!/[0-9]/.test(value)) {
                    return 'Password must contain at least one number';
                  }
                  return null;
                }
              }
            },
            // Confirm Password
            {
              type: 'input',
              props: {
                name: 'confirmPassword',
                placeholder: 'Confirm Password',
                type: 'password'
              },
              validation: {
                required: true
              }
            },
            // Accept Terms
            {
              type: 'checkbox',
              props: {
                name: 'acceptTerms',
                label: 'I accept the terms and conditions'
              },
              validation: {
                required: true
              }
            },
            // Submit Button
            {
              type: 'button',
              props: {
                label: 'Create Account',
                type: 'submit',
                variant: 'default',
                size: 'md'
              }
            }
          ]
        }
      ]
    }
  ]
};

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface RegistrationPageProps {
  onRegister?: (data: RegistrationData) => void;
}

export default function RegistrationPage({ onRegister }: RegistrationPageProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlers = {
    handleRegister: (formData: FormData) => {
      const data: RegistrationData = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
        acceptTerms: formData.get('acceptTerms') === 'on'
      };

      // Validate
      const newErrors: Record<string, string> = {};

      // Check required fields
      if (!data.firstName) newErrors.firstName = 'First name is required';
      if (!data.lastName) newErrors.lastName = 'Last name is required';
      if (!data.email) newErrors.email = 'Email is required';
      if (!data.password) newErrors.password = 'Password is required';
      if (!data.confirmPassword) newErrors.confirmPassword = 'Please confirm password';

      // Check email format
      if (data.email && !data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        newErrors.email = 'Invalid email format';
      }

      // Check password match
      if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      // Check terms
      if (!data.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setErrors({});
      console.log('Registration form submitted:', data);
      onRegister?.(data);
    }
  };

  return (
    <div>
      {Object.keys(errors).length > 0 && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-semibold mb-2">Validation Errors:</h3>
          <ul className="list-disc list-inside text-red-700">
            {Object.values(errors).map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {renderPage(RegistrationPageConfig, { handlers })}
    </div>
  );
}

export { RegistrationPageConfig };
