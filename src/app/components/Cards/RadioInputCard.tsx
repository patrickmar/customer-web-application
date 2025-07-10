import React, { ChangeEvent } from "react";
import { BsCheckCircleFill } from "react-icons/bs";

type Props = {
  id: string;
  name: string;
  value: string;
  item: IParams;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFocus: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

interface IParams {
  value: string;
  label: string;
  text: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const RadioInputCard = (props: Props) => {
  const { id, name, item, value, handleChange, handleFocus, handleBlur } =
    props;
  return (
    <>
      <input
        type="radio"
        id={id}
        name={name}
        value={item.value}
        checked={item.value === value}
        className="hidden peer"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label
        htmlFor={id}
        className={`relative bg-${item.bgColor} text-${item.color} border-${item.bgColor} dark:border-${item.bgColor} dark:peer-checked:text-${item.color} peer-checked:border-${item.borderColor} peer-checked:text-${item.color} inline-flex items-center justify-between w-full p-2 border-2 rounded-lg cursor-pointer hover:text-gray-600 dark:text-gray-400 dark:bg-gray-800`}
      >
        <div
          className={`-top-3 -right-3 absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full dark:border-gray-900`}
        >
          {item.value === value && (
            <BsCheckCircleFill className={`text-${item.borderColor} w-3 h-3`} />
          )}
        </div>
        <div className="mt-10">
          <div className="text-sm text-black font-semibold uppercase">
            {item.value}
          </div>
          <div className="text-xs font-bold">{item.text}</div>
        </div>
      </label>
    </>
  );
};

export default RadioInputCard;
