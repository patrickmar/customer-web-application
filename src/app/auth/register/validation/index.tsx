import { isValidPhoneNumber } from "libphonenumber-js";
import * as yup from "yup";

export const validationSchema = yup.object({
  firstname: yup
    .string()
    .trim()
    .min(2, "Please enter a valid first name (min 2 chars)")
    .max(30, "First name cannot exceed 30 characters")
    .matches(/^[a-zA-Z]+$/, "Only letters allowed")
    .required("First name is required"),

  lastname: yup
    .string()
    .trim()
    .min(2, "Please enter a valid last name (min 2 chars)")
    .max(30, "Last name cannot exceed 30 characters")
    .matches(/^[a-zA-Z]+$/, "Only letters allowed")
    .required("Last name is required"),

  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(50, "Email cannot exceed 50 characters")
    .required("Email is required"),

  phoneno: yup
    .string()
    .test(
      "is-valid-phone",
      "Please enter a valid Nigerian phone number",
      (value) => isValidPhoneNumber(String(value), "NG")
    )
    .required("Phone number is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password cannot exceed 16 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
      "Must contain at least one uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),

  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("Terms acceptance is required"),
});
