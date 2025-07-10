import * as yup from 'yup';

export const validationSchema = yup.object({
    accountNo: yup
      .string()
      .min(10, 'Account No can not be less than 10 characters')
      .max(10, 'Account No can not be more than 10 characters')
      .required('Please enter your account no.'),
    plan: yup
      .string()
      .trim()
      .required('Please choose your plan'),
    amount: yup
      .number()
      .min(200, 'Amount can not be less than 200')
      .max(500000, 'Amount can not be more than 500,000')
      .typeError('Amount must be a number')
      //.positive("No negative value allowed")
      .required('Please enter your amount'),
      reason: yup
      .string()
      .optional(),
      otherReason: yup
      .string()
      .optional()
  });