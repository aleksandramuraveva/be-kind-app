'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signUpValidationSchema } from '../../../utils/validationSchema';

const PasswordForm = () => {
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const initialValues = { password: '' };
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const onSubmit = async (values: typeof initialValues) => {
    setFormError('');
    setFormSuccess('');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/password`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        },
      );

      if (response.ok) {
        await response.json();
        setFormSuccess('Password updated successfully!');
      } else {
        setFormError('Failed to update password.');
      }
    } catch {
      setFormError('Network error. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Update Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpValidationSchema.pick(['password'])}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-md font-medium mb-1"
            >
              New Password
            </label>
            <Field
              name="password"
              type="password"
              className="w-full px-3 py-2 border rounded-md text-black"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          {formError && <div className="text-red-500 text-sm">{formError}</div>}
          {formSuccess && (
            <div className="text-green-500 text-sm">{formSuccess}</div>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Update
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default PasswordForm;
