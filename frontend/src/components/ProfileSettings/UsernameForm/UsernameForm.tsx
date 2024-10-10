'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { updateUsername } from '../../../store/authSlice';
import { signUpValidationSchema } from '../../../utils/validationSchema';

const UsernameForm = ({ onUpdate }: { onUpdate: (username: string) => void }) => {
  const dispatch: AppDispatch = useDispatch();
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const initialValues = { name: '' };
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const onSubmit = async (values: typeof initialValues) => {
    setFormError('');
    setFormSuccess('');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/name`,
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
        const data = await response.json();
        if (data.username) {
          dispatch(updateUsername(data.username));
          localStorage.setItem('username', data.username);
          onUpdate(data.username);
          setFormSuccess('Your name was updated successfully!');
        } else {
          setFormError('Failed to update username.');
        }
      } else {
        const errorData = await response.json();
        setFormError('Failed to update username.');
      }
    } catch (error) {
      setFormError('Network error. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Update Username</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpValidationSchema.pick(['name'])}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-md font-medium mb-1">
              New Username
            </label>
            <Field
              name="name"
              type="text"
              className="w-full px-3 py-2 border rounded-md text-black"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          {formError && <div className="text-red-500 text-sm">{formError}</div>}
          {formSuccess && (
            <div className="text-green-600 text-sm">{formSuccess}</div>
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

export default UsernameForm;
