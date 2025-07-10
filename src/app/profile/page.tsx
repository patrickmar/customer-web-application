"use client";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import ButtonLoader from "../components/ButtonLoader";
import Private2 from "../components/Layouts/Private2";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { E164Number } from "libphonenumber-js";
import externalService from "@/state/features/externals/externalService";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../redux";
import { createBankCard, reset } from "@/state/features/payment/paymentSlice";

interface Bank {
  code: string;
  name: string;
}

interface ICountry {
  name: string;
  code: string;
}

interface BankData {
  account_number: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  country: string;
  city?: string;
  address?: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  newConfirmPassword: string;
}

interface IUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneno?: string;
  country_code?: string;
  city?: string;
  address?: string;
}

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const imageRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ProfileData>({
    firstName: auth.user?.user?.firstName || "",
    lastName: auth.user?.user?.lastName || "",
    email: auth.user?.user?.email || "",
    phoneNo: auth.user?.user?.phoneno || "",
    country: auth.user?.user?.country_code || "NG",
    city: auth.user?.user?.city || "",
    address: auth.user?.user?.address || "",
  });

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    newConfirmPassword: "",
  });

  const [bankData, setBankData] = useState<BankData>({
    account_number: "",
    account_name: "",
    bank_code: "",
    bank_name: "",
  });

  const [image, setImage] = useState("");
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    getCountries();
    getBanks();
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handlePhoneNoChange = (value: E164Number) => {
    setFormData((prev) => ({
      ...prev,
      phoneNo: value?.toString() || "",
    }));
  };

  const handleProfileChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBankChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "bank_code") {
      const bankName = banks.find((b) => b.code === value)?.name || "";
      setBankData((prev) => ({
        ...prev,
        bank_name: bankName,
        [name]: value,
      }));
    } else {
      setBankData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const params = {
        ...formData,
        image: image || "",
      };
      // await dispatch(updateProfileAction(params));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBankSubmit = async () => {
    if (!bankData.account_number || !bankData.bank_code) {
      toast.error("Please fill all bank details");
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(createBankCard(bankData));
      setBankData({
        account_number: "",
        account_name: "",
        bank_code: "",
        bank_name: "",
      });
      toast.success("Bank details saved successfully");
    } catch (error) {
      toast.error("Failed to save bank details");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    const { currentPassword, newPassword, newConfirmPassword } = passwordData;

    if (newPassword !== newConfirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      // await dispatch(updatePasswordAction({
      //   currentPassword,
      //   newPassword
      // }));
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        newConfirmPassword: "",
      });
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error("Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const img = files[0];
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!validTypes.includes(img.type)) {
      setErrorMessage("Only JPG, JPEG, PNG files are allowed");
      return;
    }

    if (img.size > 500000) {
      setErrorMessage("Maximum image size is 500KB");
      return;
    }

    setErrorMessage("");
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
  };

  const handleDeleteImage = () => {
    setImage("");
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  const getCountries = async () => {
    try {
      const response = await externalService.countries();
      if (response) {
        setCountries(response);
      }
    } catch (error) {
      toast.error("Error fetching countries");
    }
  };

  const getBanks = async () => {
    try {
      const response = await externalService.banks();
      if (response) {
        setBanks(response.data);
      }
    } catch (error) {
      toast.error("Error fetching banks");
    }
  };

  const resolveAccount = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { bank_code } = bankData;

    if (value.length === 10 && bank_code) {
      try {
        const response = await externalService.resolveAccount(value, bank_code);
        if (response.status) {
          setBankData((prev) => ({
            ...prev,
            account_name: response.data.account_name,
          }));
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Could not resolve account name");
      }
    }
  };

  if (!mount) return null;

  return (
    <Private2>
      <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
        {/* Left Sidebar */}
        <div className="col-span-full xl:col-auto">
          {/* Profile Picture Upload */}
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
              <div className="relative mb-4 rounded-full w-30 h-30">
                <img
                  className="mb-4 rounded-full w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                  src={image || "/imgs/profiles/img1.jpg"}
                  alt="profile"
                />
                <label className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-red-700 text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2">
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                      fill=""
                    />
                  </svg>
                  <input
                    id="profile"
                    type="file"
                    ref={imageRef}
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              {errorMessage && (
                <small className="form-error">{errorMessage}</small>
              )}
              <div>
                <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  JPG or PNG. Max size of 500KB
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => imageRef.current?.click()}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    <HiOutlineCloudUpload
                      size={20}
                      className="w-4 h-4 mr-2 -ml-1"
                    />
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Details Section */}
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Bank Details
            </h3>
            <div className="mb-4">
              <label
                htmlFor="bank"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Bank
              </label>
              <select
                id="bank"
                name="bank_code"
                value={bankData.bank_code}
                onChange={handleBankChange}
                className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              >
                <option value="">Select Bank</option>
                {banks.map((bank, i) => (
                  <option key={i} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="account_number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Account Number
              </label>
              <input
                type="number"
                value={bankData.account_number}
                onChange={(e) => {
                  handleBankChange(e);
                  resolveAccount(e);
                }}
                name="account_number"
                id="account_number"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
              {bankData.account_name && (
                <div className="mt-1 mb-4 text-sm text-success-700 dark:text-[#219653]">
                  {bankData.account_name}
                </div>
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={handleBankSubmit}
                disabled={isLoading}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                <ButtonLoader
                  isLoading={isLoading}
                  text="Save Account"
                  loadingText="Saving"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="col-span-2">
          {/* Personal Information Form */}
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Personal Information
            </h3>
            <form onSubmit={handleProfileSubmit}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={handleProfileChange}
                    name="firstName"
                    id="firstName"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="John"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={handleProfileChange}
                    name="lastName"
                    id="lastName"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Doe"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleProfileChange}
                    name="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="example@company.com"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="phoneNo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <PhoneInput
                    defaultCountry={formData.country as any}
                    value={formData.phoneNo}
                    onChange={handlePhoneNoChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    name="address"
                    id="address"
                    onChange={handleProfileChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="25, Okeke Street"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    name="city"
                    id="city"
                    onChange={handleProfileChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="e.g. Ikoyi"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleProfileChange}
                    className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  >
                    <option>Select Country</option>
                    {countries.map((country, i) => (
                      <option key={i} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-6 sm:col-full">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    <ButtonLoader
                      isLoading={isLoading}
                      text="Save Profile"
                      loadingText="Processing"
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Password Update Form */}
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Password Information
            </h3>
            <form>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="current-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Current password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    name="currentPassword"
                    id="current-password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    name="newPassword"
                    id="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newConfirmPassword}
                    onChange={handlePasswordChange}
                    name="newConfirmPassword"
                    id="confirm-password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div className="col-span-6 sm:col-full">
                  <button
                    type="button"
                    onClick={handlePasswordSubmit}
                    disabled={isLoading}
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <ButtonLoader
                      isLoading={isLoading}
                      text="Save Password"
                      loadingText="Loading"
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Private2>
  );
};

export default ProfilePage;
