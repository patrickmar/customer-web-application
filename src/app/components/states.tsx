import React, { ChangeEvent, useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { ICustomSelect, IString, ITouchedBoolean } from "../utils/Interface";

type Props = {
  country: string;
  state: string;
  touched: ITouchedBoolean;
  formErrors: IString | any;
  handleSelectChange: (value: ICustomSelect) => void;
  onFocus: (e: string) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
};

const StateDropdown = (props: Props) => {
  const {
    country,
    state,
    touched,
    formErrors,
    handleSelectChange,
    onFocus,
    onBlur,
  } = props;
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState({
    label: state,
    value: state,
  });

  useEffect(() => {
    // fetch states if the value of country change
    fetchStates(country);
  }, [country]);

  const fetchStates = async (country: string) => {
    const body = { country };
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_STATE_API + "/countries/states",
        body
      );
      setStates(response.data.data.states);
    } catch (error) {
      toast.error("Error fetching states");
      console.error("Error fetching states:", error);
    }
  };

  const handleStateChange = (selectedOption: any) => {
    const value =
      country === "Nigeria"
        ? selectedOption.value.split(" ")[0]
        : selectedOption.value;
    console.log(value);
    handleSelectChange({ value, name: "state" });
    setSelectedState(selectedOption);
  };

  const stateOptions = states.map((state: any) => ({
    value: state.name,
    label: state.name,
    code: state.state_code,
  }));

  return (
    <>
      <div className="w-full sm:w-1/2">
        <div className="relative">
          <label className="inputLabelClass" htmlFor="state">
            Select State
          </label>
          <Select
            options={stateOptions}
            value={selectedState}
            id="state"
            name="state"
            placeholder={"Select State"}
            inputId="state"
            instanceId="states"
            onChange={handleStateChange}
            onFocus={() => onFocus("state")}
            onBlur={onBlur}
          />
          <small className="form-error">
            {touched.state && formErrors.state}
          </small>
        </div>
      </div>
    </>
  );
};

export default StateDropdown;
