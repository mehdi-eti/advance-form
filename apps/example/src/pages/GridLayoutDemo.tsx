import React from 'react';
import { renderComponent } from 'advance-form';
import type { ComponentConfig } from 'advance-form';

/**
 * Example: Grid layout with multiple cards
 */
const GridLayoutExample: ComponentConfig = {
  type: 'grid',
  props: {
    columns: 3,
    gap: 'md'
  },
  children: [
    {
      type: 'card',
      props: {
        title: 'Feature 1',
        description: 'This is a card in a grid layout'
      },
      children: [
        {
          type: 'button',
          props: {
            label: 'Learn More',
            variant: 'outline',
            size: 'sm'
          }
        }
      ]
    },
    {
      type: 'card',
      props: {
        title: 'Feature 2',
        description: 'Cards are responsive and flexible'
      },
      children: [
        {
          type: 'button',
          props: {
            label: 'Learn More',
            variant: 'outline',
            size: 'sm'
          }
        }
      ]
    },
    {
      type: 'card',
      props: {
        title: 'Feature 3',
        description: 'Use grids for complex layouts'
      },
      children: [
        {
          type: 'button',
          props: {
            label: 'Learn More',
            variant: 'outline',
            size: 'sm'
          }
        }
      ]
    }
  ]
};

export default function GridLayoutDemo() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Grid Layout Example</h2>
      {renderComponent(GridLayoutExample)}
    </div>
  );
}
