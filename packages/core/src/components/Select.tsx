import React from 'react';
import { SelectProps } from '../types';

export const Select = React.forwardRef<
  HTMLSelectElement,
  SelectProps & React.SelectHTMLAttributes<HTMLSelectElement>
>(({ options = [], className = '', placeholder, ...props }, ref) => {
  const baseClasses =
    'w-full appearance-none rounded-md border border-input bg-background py-2 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  const finalClassName = `${baseClasses} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <div className="relative">
      <select ref={ref} className={finalClassName} {...props}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
