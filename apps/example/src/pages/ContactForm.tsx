import React from 'react';
import { renderPage } from 'advance-form';
import type { PageConfig } from 'advance-form';

/**
 * Example: Contact form with multiple input types
 */
const ContactFormConfig: PageConfig = {
  layout: 'container',
  props: {
    maxWidth: 'md',
    padding: 'lg'
  },
  children: [
    {
      type: 'card',
      props: {
        title: 'Contact Us',
        description: 'Please fill out the form below and we will get back to you soon'
      },
      children: [
        {
          type: 'form',
          props: {
            onSubmit: 'handleSubmit'
          },
          children: [
            // Full Name
            {
              type: 'input',
              props: {
                name: 'fullName',
                placeholder: 'Full Name',
                type: 'text'
              },
              validation: {
                required: true,
                minLength: 2,
                maxLength: 100
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
            // Phone
            {
              type: 'input',
              props: {
                name: 'phone',
                placeholder: 'Phone Number',
                type: 'tel'
              },
              validation: {
                maxLength: 20
              }
            },
            // Subject (Select)
            {
              type: 'select',
              props: {
                name: 'subject',
                placeholder: 'Select a subject',
                options: [
                  { value: 'support', label: 'Support' },
                  { value: 'billing', label: 'Billing' },
                  { value: 'general', label: 'General Inquiry' },
                  { value: 'feedback', label: 'Feedback' }
                ]
              },
              validation: {
                required: true
              }
            },
            // Message
            {
              type: 'textarea',
              props: {
                name: 'message',
                placeholder: 'Your message',
                rows: 5
              },
              validation: {
                required: true,
                minLength: 10,
                maxLength: 1000
              }
            },
            // Subscribe Checkbox
            {
              type: 'checkbox',
              props: {
                name: 'subscribe',
                label: 'Subscribe to our newsletter'
              }
            },
            // Submit Button
            {
              type: 'button',
              props: {
                label: 'Send Message',
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

interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  subscribe?: boolean;
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const handlers = {
    handleSubmit: (formData: FormData) => {
      const data: ContactFormData = {
        fullName: formData.get('fullName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string || undefined,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
        subscribe: formData.get('subscribe') === 'on'
      };

      console.log('Contact form submitted:', data);
      onSubmit?.(data);
    }
  };

  return renderPage(ContactFormConfig, { handlers });
}

export { ContactFormConfig };
