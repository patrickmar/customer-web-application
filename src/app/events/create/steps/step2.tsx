import Dropzone from "../../../components/Dropzone";
import {
  IDateFocus,
  IDateProps,
  IEventDate,
  IReactSelect,
  IStepFormState,
  ITouchedBoolean,
} from "../../../utils/Interface";
import React, { ChangeEvent, FocusEvent } from "react";
import DatePicker from "react-datepicker";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { FiCalendar, FiClock } from "react-icons/fi";

interface Props extends IStepFormState {
  params: Iparams;
  touched: ITouchedBoolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBannerChange: (param: { name: string; value: IReactSelect[] }) => void;
  handleDateChange: (value: IDateProps) => void;
  onFocus: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onDateFocus: (props: IDateFocus) => void;
  onBlur: (e: FocusEvent<HTMLElement>) => void;
}

type Iparams = {
  start: IEventDate;
  end?: IEventDate;
  banner: string[];
};

const Step2 = (props: Props) => {
  const {
    currentStep,
    params,
    formErrors,
    touched,
    disabled,
    handleChange,
    handleDateChange,
    handleBannerChange,
    onDateFocus,
    onBlur,
  } = props;
  const { start, end, banner } = params;

  const handleDateChangeWrapper = (
    date: Date | null,
    name: "start" | "end",
    type: "date" | "time"
  ) => {
    if (date) {
      handleDateChange({ value: date, name, type });
    }
  };

  if (currentStep !== 2) {
    return null;
  }

  return (
    <>
      {/* Date and Time Section */}
      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Start Date & Time */}
        <div className="space-y-5">
          {/* Start Date */}
          <div className="relative">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiCalendar className="w-5 h-5 text-gray-400" />
              </div>
              <DatePicker
                selected={start.date}
                onChange={(date) =>
                  handleDateChangeWrapper(date, "start", "date")
                }
                selectsStart
                startDate={start.date}
                endDate={end?.date}
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
                className="w-full pl-10 p-2.5 text-sm rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                popperClassName="z-50"
                calendarClassName="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
                dayClassName={(date) =>
                  date.getDate() === start.date?.getDate() &&
                  date.getMonth() === start.date?.getMonth() &&
                  date.getFullYear() === start.date?.getFullYear()
                    ? "bg-red-100 text-red-600 rounded-full"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                      type="button"
                      className="p-1 text-gray-500 hover:text-red-600 disabled:opacity-50"
                    >
                      <HiChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                      }).format(date)}
                    </span>
                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                      type="button"
                      className="p-1 text-gray-500 hover:text-red-600 disabled:opacity-50"
                    >
                      <HiChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
                onFocus={(e) => onDateFocus({ e, name: "start", type: "date" })}
                onBlur={onBlur}
                autoComplete="off"
              />
            </div>
            {touched.start?.date && formErrors.start?.date && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-500">
                {formErrors.start.date}
              </p>
            )}
          </div>

          {/* Start Time */}
          <div className="relative">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiClock className="w-5 h-5 text-gray-400" />
              </div>
              <DatePicker
                selected={start.time}
                onChange={(date) =>
                  handleDateChangeWrapper(date, "start", "time")
                }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                timeFormat="h:mm aa"
                className="w-full pl-10 p-2.5 text-sm rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                popperClassName="z-50"
                timeClassName={(time) =>
                  time.getHours() === start.time?.getHours() &&
                  time.getMinutes() === start.time?.getMinutes()
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }
                onFocus={(e) => onDateFocus({ e, name: "start", type: "time" })}
                onBlur={onBlur}
                autoComplete="off"
              />
            </div>
            {touched.start?.time && formErrors.start?.time && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-500">
                {formErrors.start.time}
              </p>
            )}
          </div>
        </div>

        {/* End Date & Time */}
        <div className="space-y-5">
          {/* End Date */}
          <div className="relative">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              End Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiCalendar className="w-5 h-5 text-gray-400" />
              </div>
              <DatePicker
                selected={end?.date}
                onChange={(date) =>
                  handleDateChangeWrapper(date, "end", "date")
                }
                selectsEnd
                startDate={start.date}
                endDate={end?.date}
                minDate={start.date || new Date()}
                dateFormat="MMMM d, yyyy"
                className="w-full pl-10 p-2.5 text-sm rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                popperClassName="z-50"
                calendarClassName="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
                dayClassName={(date) =>
                  date.getDate() === end?.date?.getDate() &&
                  date.getMonth() === end?.date?.getMonth() &&
                  date.getFullYear() === end?.date?.getFullYear()
                    ? "bg-red-100 text-red-600 rounded-full"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                      type="button"
                      className="p-1 text-gray-500 hover:text-red-600 disabled:opacity-50"
                    >
                      <HiChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                      }).format(date)}
                    </span>
                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                      type="button"
                      className="p-1 text-gray-500 hover:text-red-600 disabled:opacity-50"
                    >
                      <HiChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
                onFocus={(e) => onDateFocus({ e, name: "end", type: "date" })}
                onBlur={onBlur}
                autoComplete="off"
              />
            </div>
            {touched.end?.date && formErrors.end?.date && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-500">
                {formErrors.end.date}
              </p>
            )}
          </div>

          {/* End Time */}
          <div className="relative">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              End Time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiClock className="w-5 h-5 text-gray-400" />
              </div>
              <DatePicker
                selected={end?.time}
                onChange={(date) =>
                  handleDateChangeWrapper(date, "end", "time")
                }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                timeFormat="h:mm aa"
                className="w-full pl-10 p-2.5 text-sm rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                popperClassName="z-50"
                timeClassName={(time) =>
                  time.getHours() === end?.time?.getHours() &&
                  time.getMinutes() === end?.time?.getMinutes()
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }
                onFocus={(e) => onDateFocus({ e, name: "end", type: "time" })}
                onBlur={onBlur}
                autoComplete="off"
              />
            </div>
            {touched.end?.time && formErrors.end?.time && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-500">
                {formErrors.end.time}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Event Banner */}
      <div className="mb-6">
        <div className="relative">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Event Banner
          </label>
          <Dropzone
            onBannerChange={handleBannerChange}
            banner={banner}
            touched={touched}
            className="p-12 my-2 relative block w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-red-500 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-red-500 dark:hover:bg-gray-600"
          />
        </div>
      </div>
    </>
  );
};

export default Step2;
