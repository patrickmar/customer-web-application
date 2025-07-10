import React, { ChangeEvent, useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { ICustomSelect, IString, ITouchedBoolean } from "../utils/Interface";
import Image from "next/image";

type Props = {
  country: IString;
  state?: string;
  touched: ITouchedBoolean;
  formErrors: IString | any;
  handleSelectChange: (value: ICustomSelect) => void;
  onFocus: (name: string) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
};

interface ICountry {
  name: string;
  alpha3Code: string;
  flag: string;
  label: string;
}

interface ICountryOptions {
  value: string;
  flag: string;
  label: string;
}

const CountryDropdown = (props: Props) => {
  const {
    country,
    state,
    touched,
    formErrors,
    handleSelectChange,
    onFocus,
    onBlur,
  } = props;
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    label: country.label,
    value: country.value,
    flag: `${process.env.NEXT_PUBLIC_FLAG_API}/48x36/${country.label}.png`,
  });
  // Default to Nigeria

  useEffect(() => {
    fetchCountries();
  }, []); // selectedCountry

  const fetchCountries = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_COUNTRY_API2!);
      const sortedCountries = response.data
        .map((country: any) => ({
          name: country.name.common,
          alpha3Code: country.cca3,
          flag: country.flags.png,
          label: country.cca2,
        }))
        .sort((a: ICountry, b: ICountry) => a.name.localeCompare(b.name));
      setCountries(sortedCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
      toast.error("Error fetching countries");
    }
  };

  const handleCountryChange = (selectedOption: any) => {
    // change the value of country
    handleSelectChange({ value: selectedOption, name: "country" });
    // set the selected country
    setSelectedCountry(selectedOption);
  };

  // Transform the country data into the format required by react-select
  const countryOptions: ICountryOptions[] = countries.map((country: any) => ({
    value: country.name,
    flag: country.flag,
    label: country.label.toLowerCase(),
  }));

  const label = (country: any) => (
    <div className="flex items-center">
      <img
        src={`${
          process.env.NEXT_PUBLIC_FLAG_API
        }/48x36/${country.label.toLowerCase()}.png`}
        alt={`${country.name} flag`}
        className="mr-3 w-7"
      />
      {country.name}
    </div>
  );

  return (
    <>
      <div className="w-full sm:w-1/2">
        <div className="relative">
          <label className="inputLabelClass" htmlFor="country">
            Select Country
          </label>
          <Select
            options={countryOptions}
            classNamePrefix="react-select"
            value={selectedCountry}
            id="country"
            name="country"
            placeholder={"Select Country"}
            inputId="country"
            instanceId="countries"
            onChange={handleCountryChange}
            onFocus={() => onFocus("country")}
            onBlur={onBlur}
            formatOptionLabel={(item: any) => (
              <div className="flex gap-1">
                {item.flag !== "" && (
                  <div className="">
                    <Image
                      //src={item.flag}
                      src={`${process.env.NEXT_PUBLIC_FLAG_API}/48x36/${item.label}.png`}
                      width={30}
                      height={30}
                      alt={`${item.value} flag`}
                    />
                  </div>
                )}
                <span className="dark:text-white">{item.value}</span>
              </div>
            )}
          />
          <small className="form-error">
            {touched.country && formErrors.country}
          </small>
        </div>
      </div>
    </>
  );
};

export default CountryDropdown;
