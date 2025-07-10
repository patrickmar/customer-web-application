import React, { ChangeEvent } from "react";
import { IStepFormState, ITouchedBoolean } from "../../../utils/Interface";
import { BiCalendar } from "react-icons/bi";
import {
  eventCategories,
  eventMode,
  eventTags,
} from "../../../constants/constant";
import CreatableSelect from "react-select/creatable";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";

interface Props extends IStepFormState {
  params: Iparams;
  touched: ITouchedBoolean;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onMultiSelectChange: (param: { name: string; value: any }) => void;
  onFocus: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onBlur: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

type Iparams = {
  title: string;
  description: string;
  category: string;
  mode: string;
  tags: string[];
};

const Step1 = (props: Props) => {
  const {
    currentStep,
    params,
    formErrors,
    touched,
    disabled,
    handleChange,
    onMultiSelectChange,
    onFocus,
    onBlur,
  } = props;
  const { title, tags, mode, description, category } = params;

  const handleCreate = (inputValue: any) => {
    // This function is called when a user creates a new option
    const newOption = {
      label: inputValue,
      value: inputValue,
    };
  };

  // Custom styles for CreatableSelect
  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: "48px",
      borderColor: state.isFocused ? "#dc2626" : "#e2e8f0",
      boxShadow: state.isFocused ? "0 0 0 1px #dc2626" : "none",
      "&:hover": {
        borderColor: state.isFocused ? "#dc2626" : "#cbd5e1",
      },
      backgroundColor: "transparent",
      borderRadius: "0.375rem",
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 50,
      borderRadius: "0.375rem",
      backgroundColor: "#ffffff",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#fee2e2"
        : state.isFocused
        ? "#fef2f2"
        : "white",
      color: "#1f2937",
      "&:active": {
        backgroundColor: "#fee2e2",
      },
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: "#fee2e2",
      borderRadius: "0.25rem",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: "#b91c1c",
      fontWeight: "500",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: "#b91c1c",
      "&:hover": {
        backgroundColor: "#fca5a5",
        color: "#7f1d1d",
      },
    }),
  };

  if (currentStep !== 1) {
    return null;
  }
  return (
    <>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="title"
            >
              Event Title
            </label>
            <input
              className="w-full rounded border text-sm border-[#E2E8F0] dark:text-white py-3 px-4.5 text-black focus:red-red-600 focus-visible:outline-none dark:bg-[#313D4A] dark:border-gray-600  dark:focus:border-red-600 dark:placeholder-gray-400 focus:ring-red-500 dark:focus:ring-red-500"
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <small className="mt-2 text-xs text-red-600 dark:text-red-600">
              {touched.title && formErrors.title}
            </small>
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="category"
          >
            Event Category
          </label>
          <div className="relative">
            <span className="absolute top-1/2 left-4 z-10 -translate-y-1/2 text-gray-400">
              <BiCalendar className="w-5 h-5" />
            </span>
            <select
              id="category"
              name="category"
              value={category}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className="w-full rounded-lg border text-sm border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 shadow-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-gray-600 dark:bg-[#1d2a39] dark:text-white dark:focus:border-red-500 dark:focus:ring-red-500 appearance-none"
            >
              <option value="">Select Category</option>
              {eventCategories &&
                eventCategories
                  .sort((a, b) => a.localeCompare(b))
                  .map((p, i) => (
                    <option key={i} value={p} className="py-2">
                      {p}
                    </option>
                  ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <small className="mt-2 text-xs text-red-600 dark:text-red-600">
            {touched.category && formErrors.category}
          </small>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="tags"
            >
              Event Tags {"(Optional)"}
            </label>
            <CreatableSelect
              isMulti
              name="tags"
              options={eventTags}
              styles={customSelectStyles}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(e) => onMultiSelectChange({ name: "tags", value: e })}
              placeholder="Select or create tags..."
              noOptionsMessage={() => "No tags found"}
              formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="mode"
          >
            Event Mode
          </label>
          <div className="relative">
            <span className="absolute top-1/2 left-4 z-10 -translate-y-1/2 text-gray-400">
              <HiOutlineCurrencyDollar className="w-5 h-5" />
            </span>
            <select
              id="mode"
              name="mode"
              value={mode}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className="w-full rounded-lg border text-sm border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 shadow-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-gray-600 dark:bg-[#1d2a39] dark:text-white dark:focus:border-red-500 dark:focus:ring-red-500 appearance-none"
            >
              {eventMode &&
                eventMode
                  .sort((a, b) => a.localeCompare(b))
                  .map((p, i) => (
                    <option key={i} value={p} className="py-2">
                      {p}
                    </option>
                  ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <small className="mt-2 text-xs text-red-600 dark:text-red-600">
            {touched.mode && formErrors.mode}
          </small>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="description"
          >
            Description
          </label>
          <div className="relative">
            <textarea
              id="description"
              rows={6}
              name="description"
              placeholder="Type event description here..."
              className="w-full rounded border text-sm border-stroke bg-white py-3 px-4.5 text-black focus:border-red-600 focus-visible:outline-none dark:bg-[#313D4A] dark:border-gray-600 dark:text-white dark:focus:border-red-600 dark:placeholder-gray-400 focus:ring-red-500 dark:focus:ring-red-500"
              value={description}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <small className="mt-2 text-xs text-red-600 dark:text-red-600">
              {touched.description && formErrors.description}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
