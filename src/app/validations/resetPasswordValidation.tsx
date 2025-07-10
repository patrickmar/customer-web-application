import * as yup from 'yup';

export const validationSchema = yup.object({
    password: yup
      .string()
      .required('Please specify your password')
      .min(8, 'The password should have at least minimum length of 8')
      .max(16, 'Characters can not be more than 16')
      .matches(/^\S*$/, 'Whitespace is not allowed')
      .matches(/[a-z]+/, "Must contain at least one lowercase character")
      .matches(/[A-Z]+/, "Must contain at least one uppercase character")
      .matches(/[!#@$%^&*)(+=}{/:;><?'"|`~._-]/, "Must contain at least one special character")
      .matches(/\d+/, "Must contain at least one number"),
    confirmPassword: yup
      .string()
      .min(8, 'The password should have at least minimum length of 8')
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'Passwords does not match')
  });