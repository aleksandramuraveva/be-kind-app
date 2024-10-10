'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signUpValidationSchema } from '../../../utils/validationSchema';

const EmailForm = () => {
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const initialValues = { email: '' };
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const onSubmit = async (values: typeof initialValues) => {
    setFormError('');
    setFormSuccess('');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/email`,
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
        setFormSuccess('Email updated successfully!');
      } else {
        const errorData = await response.json();
        setFormError('Failed to update email.');
      }
    } catch (error) {
      setFormError('Network error. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-xl text-md font-medium text-white font-semibold mb-2">
        Update Email
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpValidationSchema.pick(['email'])}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-md font-medium mb-1">
              New Email
            </label>
            <Field
              name="email"
              type="email"
              className="w-full px-3 py-2 border rounded-md text-black"
            />
            <ErrorMessage
              name="email"
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

export default EmailForm;
