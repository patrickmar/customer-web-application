"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validationSchema } from "@/app/validations/loginValidation";
import Public from "@/app/Layouts/Public";
import { useLoginMutation } from "@/state/api";
import { AppDispatch } from "@/app/redux";
import { ILogin } from "@/app/utils/Interface";
import { ValidationError } from "yup";

const Login = () => {
  const loginRef = useRef(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const identity = searchParams.has("identity")
    ? searchParams.get("identity")
    : "";

  const initialValue = { identity: identity || "", password: "" };
  const [formData, setFormData] = useState<ILogin>(initialValue);
  const [formErrors, setFormErrors] = useState<ILogin>(initialValue);
  const [touched, setTouched] = useState({ identity: false, password: false });
  const [disabled, setDisabled] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const [mount, setMount] = useState(false);

  const [login, { data, error, isLoading, isSuccess, isError }] =
    useLoginMutation();

  const token = data?.token;
  const userData = data?.data;
  console.log(userData);
  const message =
    data?.message || (error as any)?.data?.message || "Login failed";

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onFocus = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginRef.current) {
      loginRef.current = true;
      login(formData);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      loginRef.current = false;
    }
  }, [isError, message]);

  useEffect(() => {
    if (isSuccess && token) {
      toast.success(message);
      // Store both token and user data
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_data", JSON.stringify(userData));

      // Use replace instead of push to prevent going back to login
      router.replace("/dashboard");
      // No need for router.refresh() here
    }
  }, [isSuccess, token, userData, message, router]);
  useEffect(() => {
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => setFormErrors(initialValue))
      .catch((err: ValidationError) => {
        const errors = { ...initialValue };
        err.inner.forEach((error) => {
          const path = error.path as keyof typeof errors;
          if (touched[path]) errors[path] = error.message;
        });
        setFormErrors(errors);
      });

    validationSchema.isValid(formData).then((valid) => setDisabled(!valid));
  }, [formData, touched]);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      {mount && (
        <Public>
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Login to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="identity"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="identity"
                id="identity"
                autoComplete="off"
                value={formData.identity}
                onFocus={onFocus}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                required
              />
              <small className="form-error">
                {touched.identity && formErrors.identity}
              </small>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordType}
                  autoComplete="off"
                  name="password"
                  id="password"
                  onFocus={onFocus}
                  value={formData.password}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      setPasswordType(
                        passwordType === "password" ? "text" : "password"
                      )
                    }
                  >
                    {passwordType === "password" ? (
                      <FaEyeSlash className="dark:text-white" />
                    ) : (
                      <FaEye className="dark:text-white" />
                    )}
                  </button>
                </div>
              </div>
              <small className="form-error">
                {touched.password && formErrors.password}
              </small>
            </div>

            {/* Rest of your form remains the same */}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="checkboxClass"
                    required={false}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-red-600 hover:underline dark:text-red-500"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={disabled || isLoading}
              className={`${
                isLoading || disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-red-500"
              } w-full py-2 bg-[#c10006] text-white rounded-lg transition`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account yet?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-red-600 hover:underline dark:text-red-500"
              >
                Register
              </Link>
            </p>
          </form>
        </Public>
      )}
    </>
  );
};

export default Login;
