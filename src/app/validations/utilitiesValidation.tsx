import * as yup from "yup";
import parsePhoneNumberFromString, {
  isValidPhoneNumber,
} from "libphonenumber-js";

export const validationSchema = yup.object({
  accountNo: yup
    .string()
    .min(10, "Account No can not be less than 10 characters")
    .max(16, "Acount No can not be more than 16 characters")
    .typeError("Account no must be valid")
    .required("Please enter your meter or account no."),

  provider: yup.string().trim().required("Please choose your provider"),
  amount: yup
    .number()
    .min(50, "Amount can not be less than 50")
    .max(500000, "Amount must be less than 500,000")
    .typeError("Amount must be a number")
    .required("Please enter your amount"),
});
