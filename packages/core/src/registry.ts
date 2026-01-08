import React from 'react';

/* ---------- Types ---------- */

type LazyLoader = () => Promise<{ default: React.ComponentType<any> }>;
type RegistryComponent = React.ComponentType<any> | LazyLoader;

/* ---------- Utils ---------- */

function isLazyLoader(v: RegistryComponent): v is LazyLoader {
  return typeof v === 'function' && v.length === 0;
}

/* ---------- Registry ---------- */

class ComponentRegistry {
  private components = new Map<string, RegistryComponent>();
  private loadedComponents = new Map<string, React.ComponentType<any>>();

  register(name: string, component: RegistryComponent): void {
    this.components.set(name, component);
  }

  registerBulk(components: Record<string, RegistryComponent>): void {
    Object.entries(components).forEach(([name, component]) => this.register(name, component));
  }

  getComponent(name: string): React.ComponentType<any> | null {
    const component = this.components.get(name);
    if (!component) return null;

    const cached = this.loadedComponents.get(name);
    if (cached) return cached;

    if (isLazyLoader(component)) {
      const lazy = React.lazy(component);
      this.loadedComponents.set(name, lazy);
      return lazy;
    }

    this.loadedComponents.set(name, component);
    return component;
  }

  has(name: string): boolean {
    return this.components.has(name);
  }

  getAllNames(): string[] {
    return Array.from(this.components.keys());
  }

  clear(): void {
    this.components.clear();
    this.loadedComponents.clear();
  }
}

/* ---------- Global Instance ---------- */

const globalRegistry = new ComponentRegistry();

/* ---------- Public API ---------- */

export const registerComponent = (name: string, component: RegistryComponent) =>
  globalRegistry.register(name, component);

export const registerComponents = (components: Record<string, RegistryComponent>) =>
  globalRegistry.registerBulk(components);

export const getRegisteredComponent = (name: string) => globalRegistry.getComponent(name);

export const clearRegistry = () => globalRegistry.clear();

export const listRegisteredComponents = () => globalRegistry.getAllNames();

export { ComponentRegistry, globalRegistry };

/* ---------- Default Lazy Components ---------- */

const DEFAULT_COMPONENTS: Record<string, LazyLoader> = {
  button: () => import('./components/Button').then((m) => ({ default: m.Button })),
  input: () => import('./components/Input').then((m) => ({ default: m.Input })),
  textarea: () => import('./components/Textarea').then((m) => ({ default: m.Textarea })),
  card: () => import('./components/Card').then((m) => ({ default: m.Card })),
  form: () => import('./components/Form').then((m) => ({ default: m.Form })),
  select: () => import('./components/Select').then((m) => ({ default: m.Select })),
  checkbox: () => import('./components/Checkbox').then((m) => ({ default: m.Checkbox })),
  container: () => import('./components/Container').then((m) => ({ default: m.Container })),
  grid: () => import('./components/Grid').then((m) => ({ default: m.Grid })),
  flex: () => import('./components/Flex').then((m) => ({ default: m.Flex })),
  dialog: () => import('./components/Dialog').then((m) => ({ default: m.Dialog })),
};

registerComponents(DEFAULT_COMPONENTS);

export const getDefaultComponentNames = () => Object.keys(DEFAULT_COMPONENTS);
