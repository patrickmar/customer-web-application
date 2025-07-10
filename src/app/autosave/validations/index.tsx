import * as yup from "yup";

export const step1ValidationSchema = yup.object({
  frequency: yup.string().trim().required("Please choose payment frequency"),
  amount: yup
    .number()
    .min(200, "Amount can not be less than 200")
    .max(500000, "Amount can not be more than 500,000")
    .typeError("Amount must be a number")
    .required("Please enter your amount"),
});

export const step2ValidationSchema = yup.object({
  fundSource: yup
    .string()
    .trim()
    .required("Please choose the primary source of funding"),
  timeline: yup.string().trim().required("Please select the timeline"),
  startDate: yup.date().required("Please choose a start date"),
  endDate: yup.date().required("Please choose a end date"),
  time: yup.date().required("Please choose a time"),
});

export const step3ValidationSchema = yup.object({
  amount: yup
    .number()
    .min(200, "Amount can not be less than 200")
    .max(500000, "Amount can not be more than 500,000")
    .typeError("Amount must be a number")
    .required("Please enter your amount"),
});
