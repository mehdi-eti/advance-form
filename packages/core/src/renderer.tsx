import React, { Suspense, ReactNode, useMemo } from 'react';
import { ComponentConfig, HandlerContext, RenderOptions, PageConfig } from './types';
import { getRegisteredComponent } from './registry';

/**
 * Handler Context Provider for passing handlers to nested components
 */
const HandlerContextProvider = React.createContext<HandlerContext | undefined>(undefined);

export const useHandlers = () => {
  const context = React.useContext(HandlerContextProvider);
  if (!context) {
    console.warn('useHandlers called outside of HandlerContextProvider');
    return {};
  }
  return context;
};

/**
 * Props type for renderer
 */
interface RendererProps {
  config: ComponentConfig;
  handlers?: HandlerContext;
  customComponents?: Record<string, React.ComponentType<any>>;
  suspenseFallback?: ReactNode;
}

/**
 * Core component renderer that handles dynamic component loading and lazy loading
 */
const ComponentRenderer: React.FC<RendererProps> = ({
  config,
  handlers = {},
  customComponents = {},
  suspenseFallback = <div>Loading...</div>,
}) => {
  const { type, props = {}, children } = config;

  // Get the component from registry or custom components
  const component = useMemo(() => {
    // Check custom components first
    if (customComponents[type]) {
      return customComponents[type];
    }
    // Then check global registry
    return getRegisteredComponent(type);
  }, [type, customComponents]);

  if (!component) {
    return <div style={{ color: 'red' }}>Component "{type}" not found</div>;
  }

  // Prepare props with handler bindings
  const processedProps = useMemo(() => {
    const processed: any = { ...props };

    // Bind handlers
    Object.keys(processed).forEach((key) => {
      const value = processed[key];
      // If prop value is a string and it exists in handlers, bind the handler
      if (typeof value === 'string' && handlers[value]) {
        processed[key] = handlers[value];
      }
    });

    return processed;
  }, [props, handlers]);

  // Render children if they exist
  const renderedChildren = useMemo(() => {
    if (!children || children.length === 0) return undefined;

    return children.map((childConfig, index) => (
      <ComponentRenderer
        key={childConfig.key || index}
        config={childConfig}
        handlers={handlers}
        customComponents={customComponents}
        suspenseFallback={suspenseFallback}
      />
    ));
  }, [children, handlers, customComponents, suspenseFallback]);

  // Wrap lazy components with Suspense
  const isLazy =
    React.isValidElement(component) === false && (component as any)._payload !== undefined; // React.lazy mark

  const renderedComponent = isLazy ? (
    <Suspense fallback={suspenseFallback}>
      {React.createElement(component, processedProps, renderedChildren)}
    </Suspense>
  ) : (
    React.createElement(component, processedProps, renderedChildren)
  );

  return renderedComponent;
};

/**
 * Main render function for components
 */
export function renderComponent(
  config: ComponentConfig,
  options: RenderOptions = {}
): React.ReactElement {
  const { handlers = {}, customComponents = {}, suspenseFallback } = options;

  return (
    <HandlerContextProvider.Provider value={handlers}>
      <ComponentRenderer
        config={config}
        handlers={handlers}
        customComponents={customComponents}
        suspenseFallback={suspenseFallback}
      />
    </HandlerContextProvider.Provider>
  );
}

/**
 * Render a page with layout support
 */
export function renderPage(config: PageConfig, options: RenderOptions = {}): React.ReactElement {
  const { layout = 'container', props: layoutProps = {}, children = [] } = config;

  const layoutConfig: ComponentConfig = {
    type: layout,
    props: layoutProps,
    children,
  };

  return renderComponent(layoutConfig, options);
}

export { HandlerContextProvider, ComponentRenderer };
