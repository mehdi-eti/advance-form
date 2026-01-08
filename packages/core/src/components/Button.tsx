import React from 'react';
import { ButtonProps } from '../types';

/**
 * Button component adapter for shadcn/ui
 * This is a wrapper that can accept both button label and standard HTML button props
 */
export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ label, variant = 'default', size = 'md', className = '', ...props }, ref) => {
  // Build className based on variant and size
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
  
  const variantClasses = {
    default: 'bg-black text-white hover:bg-gray-800',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
    ghost: 'hover:bg-gray-100',
    link: 'text-blue-600 underline hover:text-blue-800',
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  const finalClassName = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button ref={ref} className={finalClassName} {...props}>
      {label || props.children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
