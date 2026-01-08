import React from 'react';
import { CheckboxProps } from '../types';

/**
 * Checkbox component adapter for shadcn/ui
 */
export const Checkbox = React.forwardRef<
  HTMLInputElement,
  CheckboxProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, className = '', ...props }, ref) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        ref={ref}
        type="checkbox"
        className={`w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 ${className}`.trim()}
        {...props}
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
