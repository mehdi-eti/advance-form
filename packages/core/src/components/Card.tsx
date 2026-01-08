import React from 'react';
import { CardProps } from '../types';

interface CardComponentProps extends CardProps {
  children?: React.ReactNode;
}

/**
 * Card component adapter for shadcn/ui
 */
export const Card = React.forwardRef<HTMLDivElement, CardComponentProps>(
  ({ title, description, className = '', children }, ref) => {
    return (
      <div
        ref={ref}
        className={`border border-gray-200 rounded-lg shadow-sm p-6 bg-white ${className}`.trim()}
      >
        {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
        {description && <p className="text-gray-600 mb-4">{description}</p>}
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
