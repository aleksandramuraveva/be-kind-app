import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^[a-zA-Z0-9_.]+$/,
      'Only letters, numbers, underscores, and periods are allowed',
    )
    .min(3, 'Name must be at least 3 characters')
    .max(15, 'Name must be 15 characters or less')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(/.*@.*\..*/, 'Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    )
    .matches(/\d/, 'Password must contain at least one number')
    .required('Required'),
});

export default validationSchema;
