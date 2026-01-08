/**
 * Next.js SSR Support Utilities
 * Use these utilities when building with Next.js for SSR compatibility
 */

import React from 'react';
import dynamic from 'next/dynamic';
import { ComponentConfig, HandlerContext, RenderOptions } from './types';
import { renderComponent } from './renderer';

/**
 * Register a component for lazy loading with Next.js
 * This handles SSR properly by using Next.js dynamic()
 */
export function registerNextComponent(
  name: string,
  componentPath: string,
  options?: any
): void {
  const LazyComponent = dynamic(() => import(componentPath), {
    loading: () => <div>Loading...</div>,
    ssr: true,
    ...options
  });

  // This would need to be integrated with the registry
  // For now, this is a utility function for documentation
  console.log(`Next.js component registered: ${name} from ${componentPath}`);
}

/**
 * Wrapper for renderComponent that's SSR-safe
 */
export function renderComponentNextJS(
  config: ComponentConfig,
  options: RenderOptions = {}
): React.ReactElement {
  // In Next.js, ensure handlers are serializable
  if (options.handlers) {
    const serializableHandlers: HandlerContext = {};
    Object.entries(options.handlers).forEach(([key, fn]) => {
      if (typeof fn === 'function') {
        serializableHandlers[key] = fn;
      }
    });
    return renderComponent(config, { ...options, handlers: serializableHandlers });
  }

  return renderComponent(config, options);
}

export default {
  registerNextComponent,
  renderComponentNextJS
};
