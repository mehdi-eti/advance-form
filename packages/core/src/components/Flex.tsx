import React from 'react';
import { FlexProps } from '../types';

interface FlexComponentProps extends FlexProps {
  children?: React.ReactNode;
}

/**
 * Flex component for layout
 */
export const Flex = React.forwardRef<HTMLDivElement, FlexComponentProps>(
  ({ direction = 'row', justify = 'start', align = 'start', gap = 'md', className = '', children }, ref) => {
    const directionClasses = {
      row: 'flex-row',
      column: 'flex-col',
    };

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    };

    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    };

    const finalClassName = `
      flex
      ${directionClasses[direction]}
      ${justifyClasses[justify]}
      ${alignClasses[align]}
      ${gapClasses[gap]}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
      <div ref={ref} className={finalClassName}>
        {children}
      </div>
    );
  }
);

Flex.displayName = 'Flex';

export default Flex;
