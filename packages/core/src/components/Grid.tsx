import React from 'react';
import { GridProps } from '../types';

interface GridComponentProps extends GridProps {
  children?: React.ReactNode;
}

/**
 * Grid component for layout
 */
export const Grid = React.forwardRef<HTMLDivElement, GridComponentProps>(
  ({ columns = 3, gap = 'md', className = '', children }, ref) => {
    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    };

    const finalClassName = `
      grid
      grid-cols-${columns}
      ${gapClasses[gap]}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
      <div ref={ref} className={finalClassName} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export default Grid;
