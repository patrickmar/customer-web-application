import * as yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";

export const airtimeValidationSchema = yup.object({
  phoneNo: yup
    .string()
    .min(10, "Phone No can not be less than 10 characters")
    .max(16, "Phone No can not be more than 16 characters")
    .typeError("Phone no must be valid")
    .test((value, { path, createError }) => {
      if (!isValidPhoneNumber(String(value), "NG")) {
        return createError({ path, message: "Invalid phone number" });
      }
      return true;
    })
    .required("Please enter your Phone no."),
  network: yup.string().trim().required("Please choose your network"),
  amount: yup
    .number()
    .min(50, "Amount can not be less than 50")
    .max(500000, "Amount must be less than 500,000")
    .typeError("Amount must be a number")
    .required("Please enter your amount"),
});

export const dataValidationSchema = yup.object({
  phoneNo: yup
    .string()
    .min(10, "Phone No can not be less than 10 characters")
    .max(16, "Phone No can not be more than 16 characters")
    .typeError("Phone no must be valid")
    .test((value, { path, createError }) => {
      if (!isValidPhoneNumber(String(value), "NG")) {
        return createError({ path, message: "Invalid phone number" });
      }
      return true;
    })
    .required("Please enter your Phone no."),
  network: yup.string().trim().required("Please choose network"),
  plan: yup.string().trim().required("Please choose your data plan"),
});
