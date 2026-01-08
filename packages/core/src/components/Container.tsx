import React from 'react';
import { ContainerProps } from '../types';

interface ContainerComponentProps extends ContainerProps {
  children?: React.ReactNode;
}

/**
 * Container component for layout
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerComponentProps>(
  ({ maxWidth = 'lg', padding = 'md', className = '', children }, ref) => {
    const maxWidthClasses = {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      full: 'max-w-full',
    };

    const paddingClasses = {
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-8',
      xl: 'p-12',
    };

    const finalClassName = `
      mx-auto
      ${maxWidthClasses[maxWidth]}
      ${paddingClasses[padding]}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
      <div ref={ref} className={finalClassName}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export default Container;
