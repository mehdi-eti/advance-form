import React from 'react';
import { FormProps } from '../types';

interface FormComponentProps extends FormProps {
  children?: React.ReactNode;
}

/**
 * Form component adapter for shadcn/ui
 */
export const Form = React.forwardRef<HTMLFormElement, FormComponentProps>(
  ({ className = '', children, onSubmit, onChange, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={`space-y-4 ${className}`.trim()}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(new FormData(e.currentTarget));
        }}
        onChange={(e) => {
          onChange?.(e);
        }}
        {...props}
      >
        {children}
      </form>
    );
  }
);

Form.displayName = 'Form';

export default Form;
