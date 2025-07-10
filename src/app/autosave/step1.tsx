import React, { ChangeEvent } from "react";
import { TbCurrencyNaira } from "react-icons/tb";
import RadioInputBox from "../components/Cards/RadioInputBox";
import { IBoolean, IString } from "../utils/Interface";

type Props = {
  currentStep: number;
  params: Iparams;
  formErrors: IString;
  touched: IBoolean;
  disabled: IBoolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFocus: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
};

type Iparams = {
  frequency: string;
  amount: number;
};

const Step1 = (props: Props) => {
  const {
    currentStep,
    params,
    formErrors,
    touched,
    disabled,
    handleChange,
    onFocus,
    onBlur,
  } = props;
  const { frequency, amount } = params;
  const frequencyOptions = ["Daily", "Weekly", "Monthly"];

  if (currentStep !== 1) {
    return null;
  }
  return (
    <>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full">
          <label className="inputLabelClass" htmlFor="frequency">
            Payment Frequency
          </label>
          <ul className="grid w-full gap-6 md:grid-cols-3">
            {frequencyOptions &&
              frequencyOptions.map((item: any, i: number) => (
                <RadioInputBox
                  key={i}
                  id={"frequency" + i}
                  name={"frequency"}
                  item={item}
                  value={frequency}
                  onChange={handleChange}
                />
              ))}
          </ul>
          <small className="form-error">
            {touched.frequency && formErrors.frequency}
          </small>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="inputLabelClass" htmlFor="amount">
            Preferred Amount you want to save
          </label>
          <div className="relative">
            <span className="absolute left-4.5 top-4">
              <TbCurrencyNaira className="w-5 h-5 text-greyIcon" />
            </span>
            <input
              className="w-full rounded border border-stroke bg-white py-3 pl-11.5 pr-4.5 text-black focus:border-red-600 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-red-600"
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <small className="form-error">
              {touched.amount && formErrors.amount}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
