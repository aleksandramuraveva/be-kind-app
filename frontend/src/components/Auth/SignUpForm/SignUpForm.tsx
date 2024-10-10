import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { signUpValidationSchema } from '../../../utils/validationSchema';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/authSlice';
import { AppDispatch } from '../../../store/store';
const SignUpForm: React.FC = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [formError, setFormError] = useState('');
  const initialValues = { name: '', email: '', password: '' };

  const onSubmit = async (values: typeof initialValues) => {
    setFormError('');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        },
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('uniqueId', data.uniqueTag);
        dispatch(login());
        router.push('/');
      } else {
        const errorData = await response.json();
        if (errorData.statusCode === 409) {
          setFormError('This email is already in use.');
        } else {
          setFormError('Registration failed. Please try again.');
        }
      }
    } catch (error) {
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
        {formError && <div className="text-red-500 text-sm">{formError}</div>}
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
