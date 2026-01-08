import React from 'react';
import { DialogProps } from '../types';

interface DialogComponentProps extends DialogProps {
  children?: React.ReactNode;
}

/**
 * Dialog component adapter for shadcn/ui
 */
export const Dialog = React.forwardRef<HTMLDivElement, DialogComponentProps>(
  ({ title, description, open = false, onOpenChange, className = '', children }, ref) => {
    if (!open) return null;

    return (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => onOpenChange?.(false)}
        />
        {/* Dialog */}
        <div
          ref={ref}
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 z-50 max-w-md w-full ${className}`.trim()}
        >
          {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
          {description && <p className="text-gray-600 mb-4">{description}</p>}
          {children}
        </div>
      </>
    );
  }
);

Dialog.displayName = 'Dialog';

export default Dialog;
