import { ordinalNumbers } from "../utils/functions";
import { IBoolean, IString } from "../utils/Interface";
import moment from "moment";
import React, { ChangeEvent, Fragment } from "react";
import { NumericFormat } from "react-number-format";

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
  amount: string | number;
  fundSource: string;
  time: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  timeline: string;
  frequency: string;
};

const Step3 = (props: Props) => {
  const { currentStep, params } = props;

  const { amount, frequency, startDate, endDate, time, fundSource, timeline } =
    params;

  const data = [
    {
      key: fundSource === "Wallet" ? "Fund Source" : "Account Number",
      value: fundSource === "Wallet" ? "Wallet" : "0922993029",
    },
    fundSource !== "Wallet"
      ? {
          key: "Account Name",
          value: "John Adepoju",
        }
      : {
          key: undefined,
          value: undefined,
        },
    { key: "Payment Frequency", value: frequency },
    {
      key: "Amount",
      value: (
        <NumericFormat
          value={Number(amount).toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₦"}
        />
      ),
    },
    { key: "Start Date", value: moment(startDate).format("d MMMM, yyyy.") },
    { key: "End Date", value: moment(endDate).format("d MMMM, yyyy.") },
    { key: "Time", value: moment(time).format("hh:mm:ss") },
    {
      key:
        frequency !== "Daily" && "Day of the " + frequency.replaceAll("ly", ""),
      value:
        frequency !== "Daily" && frequency === "Weekly"
          ? `Every ${timeline}s `
          : `Every ${ordinalNumbers(+timeline)} `,
    },
  ];

  if (currentStep !== 3) {
    return null;
  }

  return (
    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
      <div className="w-full">
        <dl className="max-w-md text-gray-900 divide-gray-200 dark:text-white dark:divide-gray-700">
          {data.map((item, i) => (
            <Fragment key={i}>
              {item.key != undefined && (
                <div className="flex py-1">
                  <dt className="sm:w-1/2 mr-2 text-right text-gray-500 md:text-base dark:text-gray-400">
                    {item?.key + ":"}
                  </dt>
                  <dd className="text-base font-semibold">{item?.value}</dd>
                </div>
              )}
            </Fragment>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Step3;
