import React from 'react';
import { renderPage } from 'advance-form';
import type { PageConfig } from 'advance-form';

/**
 * Example: Complete login page with form validation
 */
const LoginPageConfig: PageConfig = {
  layout: 'container',
  props: {
    maxWidth: 'sm',
    padding: 'lg',
  },
  children: [
    {
      type: 'card',
      props: {
        title: 'Sign In',
        description: 'Enter your email and password to access your account',
      },
      children: [
        {
          type: 'form',
          props: {
            onSubmit: 'handleLogin',
          },
          children: [
            {
              type: 'input',
              props: {
                name: 'email',
                placeholder: 'Email Address',
                type: 'email',
              },
              validation: {
                required: true,
                pattern: 'email',
                maxLength: 100,
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
                maxLength: 50,
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

interface LoginPageProps {
  onLogin?: (data: { email: string; password: string }) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const handlers = {
    handleLogin: (formData: FormData) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      console.log('Login form submitted:', { email, password });
      onLogin?.({ email, password });
    },
  };

  return renderPage(LoginPageConfig, { handlers });
}

export { LoginPageConfig };
