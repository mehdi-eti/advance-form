import React from 'react';
import { SelectProps } from '../types';

/**
 * Select component adapter for shadcn/ui
 */
export const Select = React.forwardRef<
  HTMLSelectElement,
  SelectProps & React.SelectHTMLAttributes<HTMLSelectElement>
>(({ options = [], className = '', placeholder, ...props }, ref) => {
  const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white';
  const finalClassName = `${baseClasses} ${className}`.trim();

  return (
    <select ref={ref} className={finalClassName} {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
});

Select.displayName = 'Select';

export default Select;
