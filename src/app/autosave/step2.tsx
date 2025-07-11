import React, { ChangeEvent, FocusEvent } from "react";
import DatePicker from "react-datepicker";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { BsCalendarEvent } from "react-icons/bs";
import RadioInputCard from "../components/Cards/RadioInputCard";
import { sourceOptions } from "./constants";
import moment from "moment";
import { IBoolean, IDateFocus, IDateProps, IString } from "../utils/Interface";
import { ordinalNumbers } from "../utils/functions";

type IParams = {
  fundSource: string;
  time: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  timeline: string;
  frequency: string;
};

type Props = {
  currentStep: number;
  params: IParams;
  formErrors: IString;
  touched: IBoolean;
  disabled: IBoolean;

  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

  handleDateChange: (value: IDateProps) => void;

  onFocus: (
    e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;

  onDateFocus: (props: IDateFocus) => void;

  onBlur: (
    e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
};

const Step2 = ({
  currentStep,
  params,
  formErrors,
  touched,
  disabled,
  handleChange,
  handleDateChange,
  onFocus,
  onDateFocus,
  onBlur,
}: Props) => {
  const { fundSource, time, startDate, endDate, timeline, frequency } = params;
  const weekdays = moment.weekdays();
  const monthdays = [...Array(28).keys()].map((i) => i + 1);

  if (currentStep !== 2) return null;

  return (
    <>
      {/* Fund Source */}
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="fundSource"
          >
            Set Primary Source of Funds
          </label>
          <ul className="grid w-full gap-6 md:grid-cols-3">
            {sourceOptions.map((item, index) => (
              <li key={index}>
                <RadioInputCard
                  item={item}
                  id={`fundSource${index}`}
                  name="fundSource"
                  value={fundSource}
                  handleChange={handleChange}
                  handleFocus={onFocus as any}
                  handleBlur={onBlur as any}
                />
              </li>
            ))}
          </ul>
          <small className="mt-2 text-xs text-red-600 dark:text-red-600">
            {touched.fundSource && formErrors.fundSource}
          </small>
        </div>
      </div>

      {/* Start and End Dates */}
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label className="inputLabelClass" htmlFor="startDate">
            Start Date
          </label>
          <DatePicker
            className="inputClass2"
            id="startDate"
            selectsStart
            selected={startDate ?? undefined}
            startDate={startDate ?? undefined}
            endDate={endDate ?? undefined}
            minDate={new Date()}
            dateFormat="d MMMM, yyyy"
            nextMonthButtonLabel={
              <HiChevronRight className="w-5 h-5 text-gray-600" />
            }
            previousMonthButtonLabel={
              <HiChevronLeft className="w-5 h-5 text-gray-600" />
            }
            popperClassName="react-datepicker-left"
            onChange={(date: Date | null) =>
              handleDateChange({ value: date, name: "startDate" })
            }
            onFocus={(e) => onDateFocus({ e, name: "startDate" })}
            onBlur={onBlur}
          />
          <small className="form-error">
            {touched.startDate && formErrors.startDate}
          </small>
        </div>

        <div className="w-full sm:w-1/2">
          <label className="inputLabelClass" htmlFor="endDate">
            End Date
          </label>
          <DatePicker
            className="inputClass2"
            id="endDate"
            selectsEnd
            selected={endDate ?? undefined}
            startDate={startDate ?? undefined}
            endDate={endDate ?? undefined}
            minDate={startDate ?? new Date()}
            dateFormat="d MMMM, yyyy"
            nextMonthButtonLabel={
              <HiChevronRight className="w-5 h-5 text-gray-600" />
            }
            previousMonthButtonLabel={
              <HiChevronLeft className="w-5 h-5 text-gray-600" />
            }
            popperClassName="react-datepicker-right"
            onChange={(date: Date | null) =>
              handleDateChange({ value: date, name: "endDate" })
            }
            onFocus={(e) => onDateFocus({ e, name: "endDate" })}
            onBlur={onBlur}
          />
          <small className="form-error">
            {touched.endDate && formErrors.endDate}
          </small>
        </div>
      </div>

      {/* Time and Timeline */}
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        {/* Time */}
        <div className="w-full sm:w-1/2">
          <label className="inputLabelClass" htmlFor="time">
            Preferred Time
          </label>
          <DatePicker
            className="inputClass2"
            id="time"
            selected={time ?? undefined}
            onChange={(date: Date | null) =>
              handleDateChange({ value: date, name: "time" })
            }
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
            onFocus={(e) => onDateFocus({ e, name: "time" })}
            onBlur={onBlur}
          />
          <small className="form-error">
            {touched.time && formErrors.time}
          </small>
        </div>

        {/* Timeline */}
        {(frequency === "Weekly" || frequency === "Monthly") && (
          <div className="w-full sm:w-1/2">
            <label className="inputLabelClass" htmlFor="timeline">
              Day of the {frequency.replace(/ly$/, "")}
            </label>
            <div className="relative z-20 bg-white dark:bg-form-input">
              <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                <BsCalendarEvent className="w-5 h-5 text-greyIcon" />
              </span>
              <select
                id="timeline"
                name="timeline"
                value={timeline}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className="selectClass"
                disabled={disabled.timeline}
              >
                <option value="">
                  Day of the {frequency.replace(/ly$/, "")}
                </option>
                {frequency === "Weekly"
                  ? weekdays.map((day, i) => (
                      <option key={i} value={day}>
                        Every {day}s
                      </option>
                    ))
                  : monthdays.map((day) => (
                      <option key={day} value={day}>
                        Every {ordinalNumbers(day)}
                      </option>
                    ))}
              </select>
            </div>
            <small className="form-error">
              {touched.timeline && formErrors.timeline}
            </small>
          </div>
        )}
      </div>
    </>
  );
};

export default Step2;
