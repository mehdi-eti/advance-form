import React from 'react';
import { InputProps } from '../types';

/**
 * Input component adapter for shadcn/ui
 */
export const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ className = '', ...props }, ref) => {
  const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';
  const finalClassName = `${baseClasses} ${className}`.trim();

  return <input ref={ref} className={finalClassName} {...props} />;
});

Input.displayName = 'Input';

export default Input;
