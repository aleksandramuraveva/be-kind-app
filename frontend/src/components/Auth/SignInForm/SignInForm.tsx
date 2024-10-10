import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { signInValidationSchema } from '../../../utils/validationSchema';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/authSlice';
import { AppDispatch } from '../../../store/store';

const SignInForm: React.FC = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [formError, setFormError] = useState('');
  const initialValues = { email: '', password: '' };

  const onSubmit = async (values: typeof initialValues) => {
    setFormError('');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
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
        if (errorData.statusCode === 401) {
          setFormError('Invalid email or password.');
        } else {
          setFormError('Login failed. Please try again.');
        }
      }
    } catch (error) {
      setFormError('Network error. Please try again.');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInValidationSchema}
      onSubmit={onSubmit}
    >
      <Form className="space-y-4">
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
          className="w-full px-4 py-2 font-semibold text-white bg-my-blue rounded-md"
        >
          Sign In
        </button>
      </Form>
    </Formik>
  );
};

export default SignInForm;
