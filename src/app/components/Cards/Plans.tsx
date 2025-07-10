import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

type Props = {
  name: string;
  text?: string;
  status?: boolean;
  interestRate?: number;
  color?: string;
  bgColor?: string;
};

const SavingsCard = (props: Props) => {
  const { name, text, status, color, bgColor, interestRate } = props;
  return (
    <div
      className={`rounded-lg border border-stroke bg-${bgColor} bg-planBg bg-blend-overlay p-2 dark:border-strokedark dark:bg-boxdark md:p-3 xl:p-3`}
    >
      <div className="flex items-end justify-between">
        <span className="text-lg font-bold text-black dark:text-white">
          {name}
        </span>
        <span
          className={`flex items-center gap-1 rounded-xl ${
            status ? "bg-success-700" : "bg-grayScale-200"
          } py-1 px-2 text-xs font-medium text-white`}
        >
          {status ? "Active" : interestRate + "% P.A"}
        </span>
      </div>
      <div>
        <span className="text-xs font-normal">{text}</span>
      </div>
      <div className={`mt-4 text-${color}`}>
        <button className="text-xs font-bold">
          <span className="flex gap-1 items-center">
            {status ? "Add Fund " : "Get Started "}{" "}
            <HiArrowNarrowRight className="w-4 h-4" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default SavingsCard;
