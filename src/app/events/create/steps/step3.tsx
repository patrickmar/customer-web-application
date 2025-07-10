import { currencies, discountModes } from "../../../constants/constant";
import {
  IStepFormState,
  ITicket,
  ITouchedBoolean,
} from "../../../utils/Interface";
import React, { ChangeEvent } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { HiTrash } from "react-icons/hi2";

interface Props extends IStepFormState {
  params: Iparams;
  touched: ITouchedBoolean;
  handleTicketChange: (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onFocus: (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onIncrement: (i: number) => void;
  onDecrement: (i: number) => void;
  onAddTicket: () => void;
  onRemoveTicket: (i: number) => void;
}

type Iparams = {
  title: string;
  ticket: ITicket[];
};

const Step3 = (props: Props) => {
  const {
    currentStep,
    params,
    formErrors,
    touched,
    handleTicketChange,
    onFocus,
    onBlur,
    onIncrement,
    onDecrement,
    onAddTicket,
    onRemoveTicket,
  } = props;

  const {} = params.ticket;

  const filterCurrency = (currency: string) => {
    const curr = currencies.filter((cur) => cur.name == currency);
    const newValue = { name: "price", value: curr[0].value };
    console.log(newValue);
    return newValue;
  };

  const DisplayString = () => {
    console.log(typeof formErrors?.ticket);
    console.log(formErrors?.ticket);
    return typeof formErrors?.ticket === "string" ? formErrors?.ticket : "";
  };

  if (currentStep !== 3) {
    return null;
  }
  return (
    <>
      <div className="flex justify-end gap-4.5 mb-5">
        <button
          type="button"
          className="flex justify-center rounded bg-red-600 py-2 px-6 font-medium text-white hover:bg-opacity-95"
          onClick={onAddTicket}
        >
          Add Ticket
        </button>
      </div>
      {params.ticket.map((t, i) => (
        <div key={i} className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/5">
            <div className="relative">
              {i == 0 && (
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor={"name-" + i}
                >
                  Name
                </label>
              )}
              <input
                className="w-full rounded border text-sm border-stroke bg-white py-3 px-4.5 text-black focus:border-red-600 focus-visible:outline-none dark:bg-[#313D4A] dark:border-gray-600 dark:text-white dark:focus:border-red-600 dark:placeholder-gray-400 focus:ring-red-500 dark:focus:ring-red-500"
                type="text"
                name="name"
                id={"name-" + i}
                placeholder="Regular"
                style={{ paddingLeft: "0.5rem" }}
                value={t.name}
                onChange={(e) => handleTicketChange(i, e)}
                onFocus={(e) => onFocus(i, e)}
                onBlur={onBlur}
              />
              <small className="mt-2 text-xs text-red-600 dark:text-red-600">
                {touched.ticket[i]?.name &&
                  Array.isArray(formErrors?.ticket) &&
                  formErrors?.ticket[i]?.name}
              </small>
            </div>
          </div>
          <div className="w-full sm:w-1/4">
            {i == 0 && (
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor={`price-${i}`}
              >
                Price
              </label>
            )}
            <div className="relative z-20">
              {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">
                  {currencies.filter((cur) => cur.name == t.currency)[0].value}
                </span>
              </div> */}
              <input
                className="w-full rounded border text-sm border-stroke bg-white py-3 px-2 text-black focus:border-red-600 focus-visible:outline-none dark:bg-[#313D4A] dark:border-gray-600 dark:text-white dark:focus:border-red-600 dark:placeholder-gray-400 focus:ring-red-500 dark:focus:ring-red-500"
                type="number"
                name={`price`}
                placeholder="100"
                id={`price-${i}`}
                value={t.price}
                onChange={(e) => handleTicketChange(i, e)}
                onFocus={(e) => onFocus(i, e)}
                onBlur={onBlur}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor={`currency-${i}`} className="sr-only">
                  Currency
                </label>
                <select
                  id={`currency-${i}`}
                  name={"currency"}
                  value={t.currency}
                  style={{ paddingRight: "1.5rem" }}
                  className="h-full rounded-md border-0 bg-transparent py-0 px-2 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm"
                  onChange={(e) => handleTicketChange(i, e)}
                  onFocus={(e) => onFocus(i, e)}
                  onBlur={onBlur}
                >
                  {currencies.map((currency, i) => (
                    <option key={i} value={currency.name}>
                      {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <small className="mt-2 text-xs text-red-600 dark:text-red-600">
              {touched.ticket[i]?.price &&
                Array.isArray(formErrors?.ticket) &&
                formErrors?.ticket[i]?.price}
            </small>
            <small className="mt-2 text-xs text-red-600 dark:text-red-600">
              {touched.ticket[i]?.currency &&
                Array.isArray(formErrors?.ticket) &&
                formErrors?.ticket[i]?.currency}
            </small>
          </div>

          <div className="w-full sm:w-1/4">
            <div className="relative">
              {i == 0 && (
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor={`quantity-${i}`}
                >
                  Quantity
                </label>
              )}

              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  onClick={() => onDecrement(i)}
                  className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  <BiMinus />
                </button>
                {/* <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                ></button> */}
                <input
                  className="w-full border-t border-b text-sm border-stroke bg-white py-3 px-3 text-black focus:border-red-600 focus-visible:outline-none dark:bg-[#313D4A] dark:border-gray-600 dark:text-white dark:focus:border-red-600 dark:placeholder-gray-400 focus:ring-red-500 dark:focus:ring-red-500"
                  type="number"
                  name={`quantity`}
                  id={`quantity-${i}`}
                  value={t.quantity}
                  onChange={(e) => handleTicketChange(i, e)}
                  onFocus={(e) => onFocus(i, e)}
                  onBlur={onBlur}
                />
                <button
                  type="button"
                  onClick={() => onIncrement(i)}
                  className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  <BiPlus />
                </button>
              </div>

              <small className="mt-2 text-xs text-red-600 dark:text-red-600">
                {touched.ticket[i]?.quantity &&
                  Array.isArray(formErrors?.ticket) &&
                  formErrors?.ticket[i]?.quantity}
              </small>
            </div>
          </div>

          <div className="w-full sm:w-1/4">
            {i == 0 && (
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor={`discount-${i}`}
              >
                Discount
              </label>
            )}
            <div className="relative z-20">
              <input
                className="w-full rounded border text-sm border-stroke bg-white py-3 px-2 text-black focus:border-red-600 focus-visible:outline-none dark:bg-[#313D4A] dark:border-gray-600 dark:text-white dark:focus:border-red-600 dark:placeholder-gray-400 focus:ring-red-500 dark:focus:ring-red-500"
                type="number"
                name="discount"
                id={`discount-${i}`}
                value={t.discount}
                onChange={(e) => handleTicketChange(i, e)}
                onFocus={(e) => onFocus(i, e)}
                onBlur={onBlur}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor={`discountMode-${i}`} className="sr-only">
                  Discount Mode
                </label>
                <select
                  id={`discountMode-${i}`}
                  name={"discountMode"}
                  value={t.discountMode}
                  style={{ paddingRight: "1.5rem" }}
                  className="h-full rounded-md border-0 bg-transparent py-0 px-2 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm"
                  onChange={(e) => handleTicketChange(i, e)}
                  onFocus={(e) => onFocus(i, e)}
                  onBlur={onBlur}
                >
                  {[
                    { ...filterCurrency(t.currency) },
                    { ...discountModes },
                  ].map((d, i) => (
                    <option key={i} value={d.name}>
                      {d.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <small className="mt-2 text-xs text-red-600 dark:text-red-600">
              {touched.ticket[i]?.discount &&
                Array.isArray(formErrors?.ticket) &&
                formErrors?.ticket[i]?.discount}
            </small>
            <small className="mt-2 text-xs text-red-600 dark:text-red-600">
              {touched.ticket[i]?.discountMode &&
                Array.isArray(formErrors?.ticket) &&
                formErrors?.ticket[i]?.discountMode}
            </small>
          </div>

          <div className="w-full sm:w-1/12">
            {i == 0 && (
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor={`delete-${i}`}
              >
                Action
              </label>
            )}
            <div className="relative">
              {i > 0 && (
                <button
                  type="button"
                  className="flex items-center text-red-700 hover:text-white  hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2"
                  onClick={() => onRemoveTicket(i)}
                >
                  <HiTrash className="h-7 text-2xl" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      <small className="mt-2 text-xs text-red-600 dark:text-red-600">
        <DisplayString />
      </small>
    </>
  );
};

export default Step3;
