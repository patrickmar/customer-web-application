import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { IString, ITouchedBoolean } from "../utils/Interface";

type Props = {
  bank: IString;
  touched: ITouchedBoolean;
  formErrors: IString | any;
  handleSelectChange: (value: IString) => void;
  onFocus: (e: string) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
};

const BankDropdown = (props: Props) => {
  const { bank, touched, formErrors, handleSelectChange, onFocus, onBlur } =
    props;
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState({
    label: bank.label,
    value: bank.value,
    code: bank.code,
  });

  useEffect(() => {
    // fetch all banks
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_PAYSTACK_BASEURL + "/bank",
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET}`,
          },
        }
      );
      setBanks(response.data.data);
    } catch (error) {
      toast.error("Error fetching banks");
      console.error("Error fetching banks:", error);
    }
  };

  const handleStateChange = (selectedOption: any) => {
    const { value, label, code } = selectedOption;
    console.log(value);
    console.log(selectedOption);
    handleSelectChange({
      value: selectedOption,
      name: "bank",
      type: "details",
    });
    // handleSelectChange({ value: code, name: "bank", type: "code" });
    setSelectedBank(selectedOption);
  };

  const BankOptions = banks.map((bank: any) => ({
    value: bank.name,
    label: bank.name,
    code: bank.code,
  }));

  return (
    <>
      <div className="w-full sm:w-1/2">
        <div className="relative">
          <label className="inputLabelClass" htmlFor="bank">
            Select Bank
          </label>
          <Select
            options={BankOptions}
            value={selectedBank}
            id="bank"
            name="bank"
            placeholder={"Select Banks"}
            inputId="bank"
            instanceId="banks"
            onChange={handleStateChange}
            onFocus={() => onFocus("bank")}
            onBlur={onBlur}
          />
          <small className="form-error">
            {touched.bank.code && formErrors.bank.code}
          </small>
        </div>
      </div>
    </>
  );
};

export default BankDropdown;
