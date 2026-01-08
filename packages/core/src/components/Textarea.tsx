import React from 'react';
import { TextareaProps } from '../types';

/**
 * Textarea component adapter for shadcn/ui
 */
export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = '', rows = 4, ...props }, ref) => {
  const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono';
  const finalClassName = `${baseClasses} ${className}`.trim();

  return <textarea ref={ref} className={finalClassName} rows={rows} {...props} />;
});

Textarea.displayName = 'Textarea';

export default Textarea;
