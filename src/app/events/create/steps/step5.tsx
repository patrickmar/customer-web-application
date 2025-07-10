import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import {
  IStepFormState,
  IString,
  ITouchedBoolean,
} from "../../../utils/Interface";
import BankDropdown from "@/app/components/Banks";
import { IFreeEvent, IPaidEvent } from "../../../utils/types";
import axios from "axios";
import { toast } from "react-toastify";

interface Props extends IStepFormState {
  params: IPaidEvent | IFreeEvent;
  touched: ITouchedBoolean;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleObjectSelectChange: (value: IString) => void;
  onSelectFocus: (name: string) => void;
  onFocus: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onBlur: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

const Step5 = (props: Props) => {
  const {
    currentStep,
    params,
    formErrors,
    touched,
    disabled,
    handleChange,
    handleObjectSelectChange,
    onFocus,
    onSelectFocus,
    onBlur,
  } = props;
  const { bank, mode } = params as IPaidEvent;
  const { details, account } = bank;
  const { account_number, account_name } = account;
  const { code } = details;
  const [accountNo, setAccountNo] = useState("");

  const getAccountName = async () => {
    //const { value } = e.target.value;
    console.log(accountNo);
    if (accountNo.length == 10) {
      try {
        const response = await axios.get(
          `${process.env
            .NEXT_PUBLIC_PAYSTACK_BASEURL!}/bank/resolve?account_number=${accountNo}&bank_code=${code}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.status) {
          handleObjectSelectChange({
            value: response.data.data,
            name: "bank",
            type: "account",
          });
        }
        //setCountries(sortedCountries);
      } catch (error) {
        console.error("Error confirming account details:", error);
        toast.error("Error confirming account details");
      }
    }
  };
  if (currentStep !== 5) {
    return null;
  }
  return (
    <>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <BankDropdown
          bank={bank.details}
          touched={touched}
          formErrors={formErrors}
          handleSelectChange={handleObjectSelectChange}
          onFocus={onSelectFocus}
          onBlur={onBlur}
        />
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="accountNo"
            >
              Account Number
            </label>
            <input
              className="w-full rounded border text-sm border-stroke bg-white py-3 px-4.5 text-black focus:border-red-600 focus-visible:outline-none dark:bg-[#313D4A] dark:border-gray-600 dark:text-white dark:focus:border-red-600 dark:placeholder-gray-400 focus:ring-red-500 dark:focus:ring-red-500"
              type="text"
              name="accountNo"
              id="accountNo"
              value={accountNo}
              onChange={
                (e) => setAccountNo(e.target.value)
                // handleObjectSelectChange({
                //   value: e.target.value,
                //   name: "bank",
                //   type: "account",
                // })
              }
              onKeyUp={getAccountName}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <small className="form-error">
              {touched.bank.account && formErrors.bank.account}
            </small>
            <small className="text-sm text-success-700">
              {account_name !== "" ? account_name : ""}
            </small>
          </div>
        </div>
      </div>

      {/* <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2"></div>
      </div> */}
    </>
  );
};

export default Step5;
