import React from 'react';

/**
 * Component registry for dynamic component loading with lazy loading support
 */
class ComponentRegistry {
  private components: Map<
    string,
    React.ComponentType<any> | (() => Promise<{ default: React.ComponentType<any> }>)
  > = new Map();

  private loadedComponents: Map<string, React.ComponentType<any>> = new Map();

  /**
   * Register a component (can be lazy-loaded or direct)
   */
  register(
    name: string,
    component: React.ComponentType<any> | (() => Promise<{ default: React.ComponentType<any> }>)
  ): void {
    this.components.set(name, component);
  }

  /**
   * Register multiple components
   */
  registerBulk(
    components: Record<
      string,
      React.ComponentType<any> | (() => Promise<{ default: React.ComponentType<any> }>)
    >
  ): void {
    Object.entries(components).forEach(([name, component]) => {
      this.register(name, component);
    });
  }

  /**
   * Get a component with lazy loading support
   */
  getComponent(name: string): React.ComponentType<any> | null {
    const component = this.components.get(name);
    if (!component) return null;

    // If it's already loaded, return it
    if (this.loadedComponents.has(name)) {
      return this.loadedComponents.get(name)!;
    }

    // If it's a function (lazy load), wrap it with React.lazy
    if (typeof component === 'function') {
      const lazyComponent = React.lazy(
        component as () => Promise<{ default: React.ComponentType<any> }>
      );
      // Cache it for future use
      this.loadedComponents.set(name, lazyComponent as any);
      return lazyComponent;
    }

    // Direct component
    this.loadedComponents.set(name, component);
    return component;
  }

  /**
   * Check if component exists
   */
  has(name: string): boolean {
    return this.components.has(name);
  }

  /**
   * Get all registered component names
   */
  getAllNames(): string[] {
    return Array.from(this.components.keys());
  }

  /**
   * Clear registry
   */
  clear(): void {
    this.components.clear();
    this.loadedComponents.clear();
  }
}

/**
 * Global component registry instance
 */
const globalRegistry = new ComponentRegistry();

/**
 * Export registry methods
 */
export const registerComponent = (
  name: string,
  component: React.ComponentType<any> | (() => Promise<{ default: React.ComponentType<any> }>)
) => globalRegistry.register(name, component);

export const registerComponents = (
  components: Record<
    string,
    React.ComponentType<any> | (() => Promise<{ default: React.ComponentType<any> }>)
  >
) => globalRegistry.registerBulk(components);

export const getRegisteredComponent = (name: string) => globalRegistry.getComponent(name);

export const clearRegistry = () => globalRegistry.clear();

export { ComponentRegistry, globalRegistry };
