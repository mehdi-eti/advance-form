import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import ContactForm from './pages/ContactForm';
import ButtonDemo from './pages/ButtonDemo';
import GridLayoutDemo from './pages/GridLayoutDemo';
import RegistrationPage from './pages/RegistrationPage';
import CustomComponentsDemo from './pages/CustomComponentsDemo';
import UtilsDemo from './pages/UtilsDemo';
import { renderComponent } from 'advance-form';
import type { ComponentConfig } from 'advance-form';

type DemoPage =
  | 'home'
  | 'login'
  | 'contact'
  | 'button'
  | 'grid'
  | 'registration'
  | 'custom'
  | 'utils';

/**
 * Navigation buttons
 */
const NavConfig: ComponentConfig = {
  type: 'flex',
  props: {
    direction: 'row',
    gap: 'md',
    justify: 'center',
    align: 'center',
  },
  children: [
    { type: 'button', props: { label: 'Home', variant: 'ghost', onClick: 'goHome' } },
    { type: 'button', props: { label: 'Login', variant: 'ghost', onClick: 'goLogin' } },
    { type: 'button', props: { label: 'Contact', variant: 'ghost', onClick: 'goContact' } },
    { type: 'button', props: { label: 'Register', variant: 'ghost', onClick: 'goRegistration' } },
    { type: 'button', props: { label: 'Button', variant: 'ghost', onClick: 'goButton' } },
    { type: 'button', props: { label: 'Grid', variant: 'ghost', onClick: 'goGrid' } },
    { type: 'button', props: { label: 'Custom', variant: 'ghost', onClick: 'goCustom' } },
    { type: 'button', props: { label: 'Utils', variant: 'ghost', onClick: 'goUtils' } },
  ],
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<DemoPage>('home');

  const navigationHandlers = {
    goHome: () => setCurrentPage('home'),
    goLogin: () => setCurrentPage('login'),
    goContact: () => setCurrentPage('contact'),
    goButton: () => setCurrentPage('button'),
    goGrid: () => setCurrentPage('grid'),
    goRegistration: () => setCurrentPage('registration'),
    goCustom: () => setCurrentPage('custom'),
    goUtils: () => setCurrentPage('utils'),
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Advance Form</h1>
          <p className="text-gray-600 mt-1">TypeScript React library for config-driven UI</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-16 z-40 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-8 py-4">
          {renderComponent(NavConfig, { handlers: navigationHandlers })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        {currentPage === 'home' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Welcome to Advance Form</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  A powerful TypeScript React library that lets you build complex UIs by defining
                  configuration objects instead of writing JSX.
                </p>
                <p>Features:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>✨ Config-driven component rendering</li>
                  <li>📝 Full TypeScript IntelliSense and autocomplete</li>
                  <li>✔️ Built-in validation system</li>
                  <li>🚀 Lazy loading for performance optimization</li>
                  <li>🎨 Extensible component registry</li>
                  <li>📱 Responsive layout components</li>
                  <li>🌐 React 17+ and Next.js support</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Try the Examples</h3>
              <p className="text-gray-700">
                Use the navigation above to explore different examples:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
                <li>
                  <strong>Login Form</strong> - Complete login page with validation
                </li>
                <li>
                  <strong>Contact Form</strong> - Multi-field form with various input types
                </li>
                <li>
                  <strong>Register</strong> - Registration form with complex validation
                </li>
                <li>
                  <strong>Button Demo</strong> - Simple interactive button example
                </li>
                <li>
                  <strong>Grid</strong> - Responsive grid with cards
                </li>
                <li>
                  <strong>Custom</strong> - Custom components mixed with built-in ones
                </li>
                <li>
                  <strong>Utils</strong> - Using utility functions to create layouts
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Quick Example</h3>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-auto">
                {`import { renderComponent } from 'advance-form';

const config = {
  type: 'button',
  props: {
    label: 'Click Me',
    variant: 'default'
  }
};

export default function App() {
  return renderComponent(config);
}`}
              </pre>
            </section>
          </div>
        )}

        {currentPage === 'login' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Login Form Example</h2>
            <LoginPage onLogin={(data) => console.log('User logged in:', data)} />
          </div>
        )}

        {currentPage === 'contact' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Form Example</h2>
            <ContactForm onSubmit={(data) => console.log('Contact form submitted:', data)} />
          </div>
        )}

        {currentPage === 'registration' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Registration Form</h2>
            <RegistrationPage onRegister={(data) => console.log('Registration submitted:', data)} />
          </div>
        )}

        {currentPage === 'button' && <ButtonDemo />}

        {currentPage === 'grid' && <GridLayoutDemo />}

        {currentPage === 'custom' && <CustomComponentsDemo />}

        {currentPage === 'utils' && <UtilsDemo />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <p className="text-gray-600">
            © 2026 Advance Form. Built with TypeScript, React, and Vite.
          </p>
        </div>
      </footer>
    </div>
  );
}
