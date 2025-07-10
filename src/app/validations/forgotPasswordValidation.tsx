import * as yup from 'yup';

export const validationSchema = yup.object({
    email: yup
      .string()
      .trim()
      .email('Please enter a valid email address')
      .min(5, 'Email must be more than 5 characters')
      .required('Email is required.'),
    phone: yup
      .string()
      .trim(),
      //.required('Please specify your phone number'),
  });