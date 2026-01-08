/**
 * Example page demonstrating utility functions
 */
import { renderPage } from 'advance-form';
import { createCardForm, createGrid, createPage } from 'advance-form';

/**
 * Using utility functions to create complex layouts quickly
 */
export default function UtilsDemo() {
  // Create a form using utility function
  const registrationForm = createCardForm(
    [
      {
        name: 'username',
        placeholder: 'Username',
        validation: { required: true, minLength: 3 },
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        validation: { required: true, pattern: 'email' },
      },
      {
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        validation: { required: true, minLength: 8 },
      },
    ],
    {
      title: 'Quick Registration',
      submitLabel: 'Register',
      onSubmit: 'handleRegister',
    }
  );

  // Create a grid of features
  const featuresGrid = createGrid(
    [
      { title: 'Fast', description: 'Lightning quick performance' },
      { title: 'Secure', description: 'Enterprise-grade security' },
      { title: 'Scalable', description: 'Grows with your business' },
    ],
    { columns: 3, gap: 'md' }
  );

  // Combine them in a page
  const pageConfig = createPage([registrationForm, featuresGrid], {
    maxWidth: 'lg',
    padding: 'lg',
  });

  const handlers = {
    handleRegister: (formData: FormData) => {
      console.log('Registered:', {
        username: formData.get('username'),
        email: formData.get('email'),
      });
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 px-8 pt-8">Utility Functions Demo</h2>
      <p className="text-gray-600 mb-6 px-8">
        Using helper functions to quickly create complex layouts:
      </p>
      {renderPage(pageConfig, { handlers })}
    </div>
  );
}
