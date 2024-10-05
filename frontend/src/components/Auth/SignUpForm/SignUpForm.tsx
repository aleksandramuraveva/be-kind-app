import { Formik, Form, Field, ErrorMessage } from 'formik';
import validationSchema from '../../../utils/validationSchema';

const SignUpForm: React.FC = () => {
  const initialValues = { name: '', email: '', password: '' };

  const onSubmit = (values: typeof initialValues) => {
    console.log('Sign Up', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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
        <button
          type="submit"
          className="bg-my-pink w-full px-4 py-2 font-semibold text-white bg-pink-500 rounded-md"
        >
          Sign Up
        </button>
      </Form>
    </Formik>
  );
};

export default SignUpForm;

// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const SignUpForm = () => {
//   const validationSchema = Yup.object({
//     username: Yup.string().required('Required'),
//     email: Yup.string().email('Invalid email address').required('Required'),
//     password: Yup.string().required('Required'),
//   });

//   return (
//     <Formik
//       initialValues={{ username: '', email: '', password: '' }}
//       validationSchema={validationSchema}
//       onSubmit={(values) => {
//         console.log(values);
//       }}
//     >
//       <Form className="space-y-4">
//         <div>
//           <label htmlFor="username" className="block text-gray-700">Username:</label>
//           <Field name="username" type="text" className="w-full p-2 border rounded" />
//           <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
//         </div>
//         <div>
//           <label htmlFor="email" className="block text-gray-700">Email:</label>
//           <Field name="email" type="email" className="w-full p-2 border rounded" />
//           <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
//         </div>
//         <div>
//           <label htmlFor="password" className="block text-gray-700">Password:</label>
//           <Field name="password" type="password" className="w-full p-2 border rounded" />
//           <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
//         </div>
//         <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//           Sign Up
//         </button>
//       </Form>
//     </Formik>
//   );
// };

// export default SignUpForm;
