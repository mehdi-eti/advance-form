import React from 'react';
import { TextareaProps } from '../types';

/**
 * Textarea component adapter for shadcn/ui
 */
export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = '', rows = 4, ...props }, ref) => {
  const baseClasses =
    'border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border bg-transparent px-2.5 py-2 text-base shadow-xs transition-[color,box-shadow] focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50';
  const finalClassName = `${baseClasses} ${className}`.trim();

  return <textarea ref={ref} className={finalClassName} rows={rows} {...props} />;
});

Textarea.displayName = 'Textarea';

export default Textarea;
