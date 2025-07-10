"use client";
import React, { ChangeEvent, Component, FormEvent } from "react";
import Private2 from "../components/Layouts/Private2";
import Breadcrumb from "../components/Breadcrumbs";
import RightBar from "../components/RightBar";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { IBoolean, IDateFocus, IDateProps, IString } from "../utils/Interface";
import {
  step1ValidationSchema,
  step2ValidationSchema,
  step3ValidationSchema,
} from "./validations";
import { toast } from "react-toastify";
import moment from "moment";

interface IAutosaveProps {}

interface IAutosaveState {
  mount: boolean;
  currentStep: number;
  params: IParams;
  formErrors: IString;
  touched: IBoolean;
  disabled: IBoolean;
}

interface IParams {
  amount: number;
  frequency: string;
  fundSource: string;
  time: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  timeline: string;
  [x: string]: string | number | boolean | Date | null;
}

class Autosave extends Component<IAutosaveProps, IAutosaveState> {
  initialTouched = {
    amount: false,
    frequency: false,
    startDate: false,
    endDate: false,
    time: false,
    fundSource: false,
    timeline: false,
  };

  initialValues = {
    amount: 0,
    frequency: "",
    startDate: null,
    endDate: null,
    time: null,
    fundSource: "",
    timeline: "",
  };

  initialDisabled = {
    step1: true,
    step2: true,
    step3: true,
  };
  constructor(props: IAutosaveProps) {
    super(props);

    this.state = {
      mount: false,
      currentStep: 1,
      params: this.initialValues,
      formErrors: {},
      touched: this.initialTouched,
      disabled: this.initialDisabled,
    };
  }

  componentDidMount() {
    this.setState({ mount: true });
  }

  componentDidUpdate(
    prevProps: Readonly<IAutosaveProps>,
    prevState: Readonly<IAutosaveState>
  ): void {
    if (prevState.params !== this.state.params) {
      this.validate();
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    this.setState({
      params: {
        ...this.state.params,
        [name]: value,
      },
    });
  };

  handeDateChange = (props: IDateProps) => {
    const { name, value } = props;
    this.setState({
      params: {
        ...this.state.params,
        [name]: value,
      },
    });
  };

  onFocus = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    this.setState({ touched: { ...this.state.touched, [name]: true } });
  };

  onDateFocus = (props: IDateFocus) => {
    const { e, name } = props;
    this.setState({ touched: { ...this.state.touched, [name]: true } });
  };

  onBlur = () => {
    this.validate();
  };

  validate = () => {
    const step = this.state.currentStep;
    const validationSchema =
      step == 1
        ? step1ValidationSchema
        : step == 2
        ? step2ValidationSchema
        : step3ValidationSchema;
    const initialFormErrors = {};
    validationSchema
      .validate(this.state.params, { abortEarly: false })
      .then(() => {
        this.setState({ formErrors: initialFormErrors });
      })
      .catch((err: any) => {
        const errors: IString = initialFormErrors;
        err.inner.forEach((error: any) => {
          if (this.state.touched[error.path]) {
            errors[error.path] = error.message;
          }
        });
        this.setState({ formErrors: errors });
      });

    validationSchema.isValid(this.state.params).then((valid) =>
      this.setState({
        disabled: {
          ...this.state.disabled,
          ["step" + this.state.currentStep]: !valid,
        },
      })
    );
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      moment(this.state.params.endDate!).isBefore(
        moment(this.state.params.startDate!)
      )
    ) {
      toast.error("End date must be greater than start date.");
    } else {
      console.log(this.state);
    }
  };

  next = () => {
    const currentStep = this.state.currentStep;
    this.setState({
      currentStep: currentStep >= 2 ? 3 : currentStep + 1,
    });
  };

  prev = () => {
    const currentStep = this.state.currentStep;
    this.setState({
      currentStep: currentStep <= 1 ? 1 : currentStep - 1,
    });
  };

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button className="cancelButton" type="button" onClick={this.prev}>
          Previous
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    const disable = this.state.disabled;
    let disabled =
      currentStep == 1
        ? disable.step1
        : currentStep == 2
        ? disable.step2
        : disable.step3;
    if (currentStep < 3) {
      return (
        <button
          disabled={disabled}
          className={`${disabled ? "disabled" : ""} submitButton`}
          type="button"
          onClick={this.next}
        >
          Next
        </button>
      );
    }
    return null;
  }

  submitButton() {
    let currentStep = this.state.currentStep;
    if (currentStep == 3) {
      return (
        <button className="submitButton" type="submit">
          Submit
        </button>
      );
    }
    return null;
  }

  public render() {
    const { mount } = this.state;
    const { amount, frequency } = this.state.params;
    return (
      <>
        {mount && (
          <Private2>
            <div className="mx-auto max-w-270">
              <Breadcrumb pageName="Autosave" />
              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                  <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Set up Autosave
                      </h3>
                    </div>
                    <div className="p-7">
                      <form action="/" onSubmit={this.handleSubmit}>
                        <Step1
                          currentStep={this.state.currentStep}
                          params={this.state.params}
                          formErrors={this.state.formErrors}
                          touched={this.state.touched}
                          disabled={this.state.disabled}
                          handleChange={this.handleChange}
                          onFocus={this.onFocus}
                          onBlur={this.onBlur}
                        />
                        <Step2
                          currentStep={this.state.currentStep}
                          params={this.state.params}
                          formErrors={this.state.formErrors}
                          touched={this.state.touched}
                          disabled={this.state.disabled}
                          handleDateChange={this.handeDateChange}
                          handleChange={this.handleChange}
                          onFocus={this.onFocus}
                          onDateFocus={this.onDateFocus}
                          onBlur={this.onBlur}
                        />
                        <Step3
                          currentStep={this.state.currentStep}
                          params={this.state.params}
                          formErrors={this.state.formErrors}
                          touched={this.state.touched}
                          disabled={this.state.disabled}
                          handleChange={this.handleChange}
                          onFocus={this.onFocus}
                          onBlur={this.onBlur}
                        />

                        <div className="flex justify-end gap-4.5 mt-5">
                          {this.previousButton()}
                          {this.nextButton()}
                          {this.submitButton()}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <RightBar />
              </div>
            </div>
          </Private2>
        )}
      </>
    );
  }
}

export default Autosave;
