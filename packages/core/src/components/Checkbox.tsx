import React from 'react';
import { CheckboxProps } from '../types';

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  CheckboxProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, className = '', ...props }, ref) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        ref={ref}
        type="checkbox"
        className={`
          peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-lg border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50
          ${className}
        `
          .trim()
          .replace(/\s+/g, ' ')}
        {...props}
      />
      {label && (
        <span className="text-sm text-foreground leading-none peer-disabled:opacity-50">
          {label}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
export default Checkbox;
