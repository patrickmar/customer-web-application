import * as yup from "yup";

export const validationSchema = yup.object({
  identity: yup
    .string()
    .trim()
    .required("Email or phone number is required")
    .test(
      "is-email-or-phone",
      "Please enter a valid email or phone number",
      (value) => {
        // Check if it's a valid email
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const isEmail = emailRegex.test(value);

        // Check if it's a valid phone number (adjust regex as needed)
        const phoneRegex = /^[0-9]{10,15}$/; // 10-15 digits
        const isPhone = phoneRegex.test(value);

        return isEmail || isPhone;
      }
    ),
  password: yup
    .string()
    .trim()
    .matches(/^\S*$/, "Whitespace is not allowed")
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
