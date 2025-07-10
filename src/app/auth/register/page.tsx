"use client";
import { strengthColor, strengthIndicator } from "@/app/utils/PasswordStrength";
import Link from "next/link";
import React, {
  ChangeEvent,
  FocusEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { E164Number } from "libphonenumber-js";
import { validationSchema } from "./validation";
import Public from "@/app/Layouts/Public";
import { IRegister, IString, IBoolean } from "@/app/utils/Interface";
import { useRegisterMutation } from "@/state/api";
import ButtonLoader from "@/app/components/ButtonLoader";
import { toast } from "react-hot-toast";

const Register = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phoneno: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const [formData, setFormData] = useState<IRegister>(initialValues);
  const [errors, setErrors] = useState<IRegister>(initialValues);
  const [type, setType] = useState<IString>({
    type1: "password",
    type2: "password",
  });
  const [level, setLevel] = useState({
    label: "",
    color: "",
    bgColor: "",
    percent: 0,
  });
  const [touched, setTouched] = useState<IBoolean>({
    firstname: false,
    lastname: false,
    email: false,
    phoneno: false,
    password: false,
    confirmPassword: false,
    terms: false,
  });
  const [disabled, setDisabled] = useState(true);

  const {
    firstname,
    lastname,
    email,
    phoneno,
    password,
    confirmPassword,
    terms,
  } = formData;
  const { type1, type2 } = type;

  const [register, { data, error, isLoading, isSuccess, isError }] =
    useRegisterMutation();
  const router = useRouter();

  // Enhanced debugging
  useEffect(() => {
    console.log("Form data updated:", formData);
    console.log("Current errors:", errors);
    console.log("Form disabled:", disabled);
  }, [formData, errors, disabled]);

  const setPassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const changePasswordType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button: HTMLButtonElement = e.currentTarget;
    setType((prevState) => ({
      ...prevState,
      [button.name]: type[button.name] === "password" ? "text" : "password",
    }));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(
      `Field ${e.target.name} changed to:`,
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === "terms" ? e.target.checked : e.target.value,
    }));
  };

  const handleChange = (value: E164Number) => {
    console.log("Phone number changed to:", value);
    setFormData((prevState) => ({
      ...prevState,
      phoneno: value,
    }));
  };

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    console.log(`Field ${name} focused`);
    setTouched({ ...touched, [name]: true });
  };

  useEffect(() => {
    validate();
  }, [formData]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("Form submission initiated");

    if (!terms) {
      console.log("Registration blocked - terms not accepted");
      toast.error("Please accept the terms and conditions");
      return;
    }

    if (password !== confirmPassword) {
      console.log("Registration blocked - password mismatch");
      toast.error("Passwords do not match");
      return;
    }

    try {
      console.log("Attempting to register with data:", formData);
      const result = await register(formData).unwrap();
      console.log("Registration successful:", result);
    } catch (err: any) {
      console.error("Registration failed:", err);
      if (err.data) {
        console.error("API error details:", err.data);
        toast.error(err.data.message || "Registration failed");
      }
    }
  };

  useEffect(() => {
    if (isError) {
      console.error("Registration mutation error:", error);
      toast.error(
        (error as any)?.data?.message ||
          "Registration failed. Please try again."
      );
    }
    if (isSuccess) {
      console.log("Registration success data:", data);
      toast.success(data?.message || "Registration successful");
      router.replace(`/auth/login`);
    }
  }, [isError, isSuccess, error, data, router]);

  const validate = () => {
    console.log("Running validation...");
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        console.log("Validation passed");
        setErrors(initialValues);
      })
      .catch((err: any) => {
        console.log("Validation errors found:", err.inner);
        const errs: IRegister = initialValues;
        err.inner.forEach((error: any) => {
          if (touched[error.path]) errs[error.path] = error.message;
        });
        setErrors(errs);
      });

    validationSchema.isValid(formData).then((valid) => {
      console.log("Form validity:", valid);
      setDisabled(!valid);
    });
  };

  const onBlur = () => {
    console.log("Field blurred - validating...");
    validate();
  };

  return (
    <Public>
      <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Create an account
      </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="w-full">
            <label
              htmlFor="firstname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              autoComplete="off"
              id="firstname"
              onFocus={onFocus}
              value={firstname}
              onChange={onChange}
              onBlur={onBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            />
            {/* <small className="form-error">{errors && errors.firstName}</small> */}
            <small className="form-error">
              {touched.firstname && errors.firstname}
            </small>
          </div>
          <div className="w-full">
            <label
              htmlFor="lastname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              autoComplete="off"
              id="lastname"
              onFocus={onFocus}
              value={lastname}
              onChange={onChange}
              onBlur={onBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            />
            <small className="form-error">
              {touched.lastname && errors.lastname}
            </small>
          </div>

          <div className="">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              id="email"
              onFocus={onFocus}
              value={email}
              onChange={onChange}
              onBlur={onBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            />
            <small className="form-error">
              {touched.email && errors.email}
            </small>
          </div>

          <div className="w-full">
            <label
              htmlFor="phoneno"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone Number
            </label>
            <PhoneInput
              defaultCountry="NG"
              name="phoneno"
              autoComplete="off"
              id="phoneno"
              onFocus={onFocus}
              value={phoneno}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            />
            {/* <input type="text" name="phoneno" autoComplete='off' id="phoneno" onFocus={onFocus} value={phoneno} onChange={onChange} onBlur={onBlur} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" /> */}
            <small className="form-error">
              {touched.phoneno && errors.phoneno}
            </small>
          </div>
          <div className="">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={type1}
                autoComplete="new-password"
                onFocus={onFocus}
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  onChange(e);
                  setPassword(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
                <button type="button" name="type1" onClick={changePasswordType}>
                  {type1 === "password" ? (
                    <FaEyeSlash className="dark:text-white" />
                  ) : (
                    <FaEye className="dark:text-white" />
                  )}
                </button>
              </div>
            </div>
            {password.length > 0 && (
              <div>
                <div className="flex justify-between my-1">
                  <span
                    className={`${level?.color} text-sm font-medium  dark:text-white`}
                  >
                    {level?.label}
                  </span>
                  <span className="text-sm font-medium text-blue-700 dark:text-white">
                    {level?.percent}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className={`${level?.bgColor} w-[${level?.percent}%] h-2.5 rounded-full`}
                  ></div>
                </div>
              </div>
            )}
            <small className="form-error">
              {touched.password && errors.password}
            </small>
          </div>
          <div className="">
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={type2}
                autoComplete="new-password"
                name="confirmPassword"
                id="confirm-password"
                onFocus={onFocus}
                value={confirmPassword}
                onChange={onChange}
                onBlur={onBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
                <button type="button" name="type2" onClick={changePasswordType}>
                  {type2 === "password" ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <small className="form-error">
              {touched.confirmPassword && errors.confirmPassword}
            </small>
          </div>
          {/* <div> */}
          <div className="flex items-start sm:col-span-2">
            <div className="flex items-center h-5">
              <input
                name="terms"
                checked={terms}
                onFocus={onFocus}
                onChange={onChange}
                onBlur={onBlur}
                id="terms"
                type="checkbox"
                className="checkboxClass"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <Link
                  className="font-medium text-red-600 hover:underline dark:text-red-500"
                  href="/terms"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </div>
          <small className="text-xs text-red-600 dark:text-red-600">
            {touched.terms && errors.terms}
          </small>
          {/* </div> */}
          <button
            type="submit"
            disabled={disabled}
            className={`${
              isLoading || disabled ? "disabled" : " "
            } sm:col-span-2 authSubmitButton w-full py-2 bg-blue-500 text-white rounded-lg cursor-pointer`}
          >
            <ButtonLoader
              isLoading={isLoading}
              text="Register"
              loadingText="Loading"
            />
          </button>
          <p className="sm:col-span-2 text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-red-600 hover:underline dark:text-red-500"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </Public>
  );
};

export default Register;
