import React from 'react';
import { renderComponent } from 'advance-form';
import type { ComponentConfig } from 'advance-form';

/**
 * Example: Simple button with click handler
 */
const ButtonExample: ComponentConfig = {
  type: 'button',
  props: {
    label: 'Click Me',
    variant: 'default',
    size: 'lg',
    onClick: 'handleButtonClick'
  }
};

export default function ButtonDemo() {
  const handlers = {
    handleButtonClick: () => {
      console.log('Button clicked!');
      alert('Button was clicked!');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Button Component Example</h2>
      {renderComponent(ButtonExample, { handlers })}
    </div>
  );
}
