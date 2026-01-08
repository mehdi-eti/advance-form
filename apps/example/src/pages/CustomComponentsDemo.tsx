import React from 'react';
import { registerComponents, renderComponent } from 'advance-form';
import type { ComponentConfig } from 'advance-form';

/**
 * Custom Card Component with icon
 */
interface CustomCardProps {
  title: string;
  description?: string;
  icon?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  children?: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({ 
  title, 
  description, 
  icon = '📝',
  color = 'primary',
  children 
}) => {
  const colorClasses = {
    primary: 'border-blue-300 bg-blue-50',
    secondary: 'border-gray-300 bg-gray-50',
    success: 'border-green-300 bg-green-50',
    warning: 'border-yellow-300 bg-yellow-50',
    error: 'border-red-300 bg-red-50'
  };

  return (
    <div className={`border-2 rounded-lg p-6 ${colorClasses[color]}`}>
      <div className="flex items-start">
        <span className="text-3xl mr-4">{icon}</span>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {description && <p className="text-gray-600 mt-1">{description}</p>}
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </div>
  );
};

/**
 * Custom Button with icon
 */
interface CustomButtonProps {
  label: string;
  icon?: string;
  onClick?: () => void;
  variant?: 'solid' | 'outline' | 'ghost';
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  label, 
  icon = '→',
  onClick,
  variant = 'solid'
}) => {
  const variantClasses = {
    solid: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
    ghost: 'text-blue-500 hover:bg-blue-50'
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-lg font-medium transition-all ${variantClasses[variant]}`}
    >
      {label} {icon}
    </button>
  );
};

/**
 * Register custom components
 */
registerComponents({
  'custom-card': CustomCard,
  'custom-button': CustomButton
});

/**
 * Example: Using custom components
 */
const customComponentConfig: ComponentConfig = {
  type: 'flex',
  props: {
    direction: 'column',
    gap: 'lg'
  },
  children: [
    {
      type: 'custom-card',
      props: {
        title: 'Custom Feature',
        description: 'This is a custom card component',
        icon: '⚡',
        color: 'primary'
      },
      children: [
        {
          type: 'custom-button',
          props: {
            label: 'Learn More',
            icon: '→',
            variant: 'solid',
            onClick: 'handleCustomClick'
          }
        }
      ]
    },
    {
      type: 'custom-card',
      props: {
        title: 'Another Feature',
        description: 'Mix of custom and built-in components',
        icon: '✨',
        color: 'success'
      },
      children: [
        {
          type: 'button',
          props: {
            label: 'Built-in Button',
            variant: 'outline'
          }
        }
      ]
    }
  ]
};

export default function CustomComponentsDemo() {
  const handlers = {
    handleCustomClick: () => {
      console.log('Custom button clicked!');
      alert('Custom component handler works!');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 className="text-2xl font-bold mb-6">Custom Components Example</h2>
      <p className="text-gray-600 mb-6">
        Mixing custom and built-in components together:
      </p>
      {renderComponent(customComponentConfig, { handlers })}
    </div>
  );
}
