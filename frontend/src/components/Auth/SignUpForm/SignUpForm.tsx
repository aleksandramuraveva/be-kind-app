import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signUpValidationSchema } from '../../../utils/validationSchema';

const SignUpForm: React.FC = () => {
  const [formError, setFormError] = useState('');
  const initialValues = { name: '', email: '', password: '' };

  const onSubmit = async (values: typeof initialValues) => {
    setFormError('');
    console.log('Sign Up', values);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('uniqueId', data.uniqueTag);
      } else {
        const errorData = await response.json();
        console.error('Registration error:', errorData);
        if (errorData.statusCode === 409) {
          setFormError('This email is already in use.');
        } else {
          setFormError('Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Network error:', error);
      setFormError('Network error. Please try again.');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpValidationSchema}
      onSubmit={onSubmit}
    >
      <Form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-md font-medium text-white mb-1"
          >
            Name
          </label>
          <Field
            name="name"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-md font-medium text-white mb-1"
          >
            Email
          </label>
          <Field
            name="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-md font-medium text-white mb-1"
          >
            Password
          </label>
          <Field
            name="password"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        {formError && (
          <div className="text-red-500 text-sm">
            {formError}
          </div>
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-my-pink rounded-md"
        >
          Sign Up
        </button>
      </Form>
    </Formik>
  );
};

export default SignUpForm;

