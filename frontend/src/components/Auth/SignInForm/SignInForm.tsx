import { Formik, Form, Field, ErrorMessage } from 'formik';
import validationSchema from '../../../utils/validationSchema';

const SignInForm: React.FC = () => {
  const initialValues = { email: '', password: '' };

  const onSubmit = (values: typeof initialValues) => {
    console.log('Sign In', values);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-md font-medium text-white mb-1">Email</label>
          <Field name="email" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
        </div>
        <div>
          <label htmlFor="password" className="block text-md font-medium text-white mb-1">Password</label>
          <Field name="password" type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
        </div>
        <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-my-blue rounded-md">Sign In</button>
      </Form>
    </Formik>
  );
};

export default SignInForm;

