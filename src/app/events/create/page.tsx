"use client";
import Breadcrumb from "@/app/components/Breadcrumbs";
import Private2 from "@/app/components/Layouts/Private2";
import {
  IBooleanDate,
  ICustomSelect,
  IDateFocus,
  IDateProps,
  IEventDate,
  IReactSelect,
  ISocials,
  IStepFormState,
  IString,
  ITicket,
  ITicketBoolean,
  ITouchedBoolean,
} from "../../utils/Interface";
import moment from "moment";
import React, { ChangeEvent, FormEvent, FocusEvent } from "react";
import { toast } from "react-toastify";
import {
  step1ValidationSchema,
  step2ValidationSchema,
  step3ValidationSchema,
  step4ValidationSchema,
  step5ValidationSchema,
} from "./validations";
import RightBar from "../../components/RightBar";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import { convertToObj, setNestedProperty } from "../../utils/functions";
import {
  IBankDetails,
  IFreeEvent,
  IOnlineEvent,
  IPaidEvent,
  IPhysicalEvent,
  ISelect,
} from "../../utils/types";
import Step4 from "./steps/step4";
import Step5 from "./steps/step5";

export interface ICreateEventProps {}

export interface ICreateEventState extends IStepFormState {
  params: IParams;
  touched: ITouchedBoolean;
}

// In Step3 component props
interface Props {
  // ...
  onFocus: (e: FocusEvent<HTMLElement, Element>) => void;
  // ...
}

type IParams = {
  title: string;
  tags: any[];
  description: string;
  category: string;
  start: IEventDate;
  end: IEventDate;
  socials: ISocials;
  ticket: ITicket[];
  banner: string[];
  [key: string]:
    | string
    | string[]
    | IEventDate
    | ISocials
    | IString
    | IBankDetails
    | ITicket[];
} & (IPhysicalEvent | IOnlineEvent) &
  (IPaidEvent | IFreeEvent);

const initialDate = { date: null, time: null };
const InitialSocials = { website: "", facebook: "", twitter: "" };
const initialTicket = {
  name: "",
  price: 0,
  quantity: 100,
  discount: 0,
  discountMode: "percent",
  currency: "NGN",
};
const initialBankDetails = {
  details: { value: "", label: "", code: "" },
  account: { account_number: "", account_name: "", bank_id: "" },
};
const initialTicketBoolean = {
  name: false,
  price: false,
  quantity: false,
  discount: false,
  discountMode: false,
  currency: false,
};

class CreateEvent extends React.Component<
  ICreateEventProps,
  ICreateEventState
> {
  initialTicketBoolean = [initialTicketBoolean];
  initialTicket = [initialTicket];

  initialTouched: ITouchedBoolean = {
    title: false,
    description: false,
    category: false,
    type: false,
    tags: false,
    venue: false,
    country: false,
    state: false,
    link: false,
    mode: false,
    platform: false,
    start: { date: false, time: false },
    end: { date: false, time: false },
    bank: { details: false, account: false },
    banner: [false],
    ticket: this.initialTicketBoolean,
  };

  initialValues: IParams = {
    title: "",
    description: "",
    category: "",
    venue: "",
    type: "Physical",
    country: { value: "Nigeria", label: "ng" },
    state: "",
    tags: [],
    mode: "Paid",
    bank: initialBankDetails,
    start: initialDate,
    end: initialDate,
    socials: InitialSocials,
    ticket: this.initialTicket,
    banner: [""],
  };

  totalSteps = 5;

  constructor(props: ICreateEventProps) {
    super(props);

    this.state = {
      mount: false,
      currentStep: 1,
      params: this.initialValues,
      formErrors: {},
      touched: this.initialTouched,
      disabled: this.generateInitialDisabled(),
    };
  }

  generateInitialDisabled = () => {
    const initialDisabled: Record<string, boolean> = {};
    for (let step = 1; step <= this.totalSteps; step++) {
      initialDisabled[`step${step}`] = true;
    }
    return initialDisabled;
  };

  componentDidMount() {
    this.setState({ mount: true });
  }

  componentDidUpdate(
    prevProps: Readonly<ICreateEventProps>,
    prevState: Readonly<ICreateEventState>
  ): void {
    if (prevState.params !== this.state.params) {
      this.validateForm();
    }
    // since our country is changing, then state must be empty string
    if (prevState.params.country !== this.state.params.country) {
      this.customSetState("state", "");
    }

    const prevBank = prevState.params?.bank as IBankDetails;
    const currentBank = this.state.params?.bank as IBankDetails;

    // Extract the code property
    const prevDetails =
      typeof prevBank === "object" ? prevBank.details : undefined;
    const currentDetails =
      typeof currentBank === "object" ? currentBank.details : undefined;

    if (prevDetails !== currentDetails) {
      console.log(currentDetails);
      this.handleObjectSelectChange({
        name: "bank",
        value: "",
        type: "account",
      });
    }
  }

  customSetState = (name: string, value: string) => {
    const { params } = this.state;
    this.setState({
      params: {
        ...params,
        [name]: value,
      },
    });
  };

  handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    this.customSetState(name, value);
  };

  handleSelectChange = (props: ICustomSelect) => {
    const { name, value } = props;
    console.log(value);
    this.customSetState(name, value);
    console.log(this.state.params);
  };

  handleDateChange = (props: IDateProps) => {
    const { name, type, value } = props;
    this.setState({
      params: {
        ...this.state.params,
        [name]: { ...(this.state.params[name] as {}), [type!]: value },
      },
    });
  };

  handleObjectSelectChange = (props: IString) => {
    const { name, type, value } = props;
    console.log(name);
    this.setState({
      params: {
        ...this.state.params,
        [name]: { ...(this.state.params[name] as {}), [type!]: value },
      },
    });
  };

  handleArrayChange = (props: { name: string; value: IReactSelect[] }) => {
    const { name, value } = props;
    console.log(value);
    const { params } = this.state;
    const newValues = value.map((option) => option.value);
    this.setState({ params: { ...params, [name]: newValues } });
  };

  onFocus1 = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    this.setState({ touched: { ...this.state.touched, [name]: true } });
  };

  onFocus = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    this.setState((prevState) => ({
      touched: {
        ...prevState.touched,
        [name]: true,
      },
    }));
  };

  onTicketFocus = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    this.setState((prevState) => {
      const updatedTouched = { ...prevState.touched };
      updatedTouched.ticket[index][name as keyof ITicketBoolean] = true;
      return { touched: updatedTouched };
    });
  };
  onDateFocus = (props: IDateFocus) => {
    // destructure the values from props
    const { e, name, type } = props;
    const { touched } = this.state;
    const updatedTouched = {
      ...touched,
      [name]: {
        ...(touched[name as keyof ITouchedBoolean] as IBooleanDate),
        [type!]: true,
      },
    };
    this.setState({
      touched: updatedTouched,
    });
  };

  onSelectFocus = (name: string) => {
    this.setState((prevState) => {
      // Using a shallow copy to avoid mutating the state directly
      const updatedTouched: ITouchedBoolean = { ...prevState.touched };
      console.log(updatedTouched);
      updatedTouched[name] = true;
      return { touched: updatedTouched };
    });
  };

  onBlur = () => {
    this.validateForm();
  };

  // validateForm0 = async (values: any) => {
  //   try {
  //     await step3ValidationSchema.validate(values, { abortEarly: false });
  //     return { isValid: true, errors: {} };
  //   } catch (errors: any) {
  //     const validationErrors:IString = {};
  //     errors.inner.forEach((error: any) => {
  //       validationErrors[error.path] = error.message;
  //     });
  //     return { isValid: false, errors: validationErrors };
  //   }
  // };

  // validateForm = async (schema: Schema, values: Record<string, any>): Promise<IValidationResult> => {
  //   // Validate array properties
  // for (const key in values) {
  //   if (Array.isArray(values[key])) {
  //     try {
  //       await schema.validate(values, { abortEarly: false });
  //       return { isValid: true, errors: [] };
  //     } catch (errors: any) {
  //       console.log(typeof(errors))
  //       const validationErrors = errors.inner.reduce((acc: any, error: any) => {
  //       //const validationErrors = errors.inner.reduce<Record<string, string>[]>((acc, error) => {
  //         const path = error.path;
  //         const errorMessage = error.message;
  //         // Splitting the path to extract ticket index and property
  //         const [, ticketIndex, property] = path.match(/ticket\[(\d+)\]\.(\w+)/)!;
  //         // Create an object for the specific ticket
  //         if (!acc[ticketIndex]) {
  //           acc[ticketIndex] = {};
  //         }
  //         // Assign the error message to the property
  //         acc[ticketIndex][property] = errorMessage;
  //         return acc;
  //       }, []);
  //       return { isValid: false, errors: validationErrors };
  //     }
  //   }

  // }

  // };

  // this.validateForm(this.state.params).then((result) => {
  //   if (result.isValid) {
  //     console.log('Form is valid!');
  //   } else {
  //     console.log('Form validation failed:', result.errors);
  //   }
  // });

  validate = () => {
    const { currentStep, params, touched, disabled, formErrors } = this.state;
    const validationSchemas = {
      1: step1ValidationSchema,
      2: step2ValidationSchema,
      3: step3ValidationSchema,
      4: step4ValidationSchema,
      5: step5ValidationSchema,
    };
    const validationSchema =
      validationSchemas[currentStep as keyof typeof validationSchemas] ||
      step1ValidationSchema;

    const initialFormErrors: IString = {};
    validationSchema
      .validate(params, { abortEarly: false })
      .then(() => {
        this.setState({ formErrors: initialFormErrors });
      })
      .catch((err: any) => {
        const errors: { [key: string]: string | object } = initialFormErrors;
        err?.inner.forEach((error: ITouchedBoolean | any) => {
          if (currentStep == 2 || currentStep == 5) {
            const obj = error.path.split(".");
            const type = obj[0];
            const name = obj[1];
            //const objectError = touched?.[type as keyof ITouchedBoolean][name as keyof ITouchedBoolean] as keyof ITouchedBoolean;
            const objectError = touched?.[type as keyof ITouchedBoolean]?.[
              name as keyof ITouchedBoolean
            ] as keyof ITouchedBoolean;
            // const typeKey = type;
            // const nameKey = name;
            // const objectError = this.state.touched?.[typeKey]?.[
            //   nameKey
            // ] as keyof ITouchedBoolean;
            if (objectError) {
              convertToObj(errors, error.path, error.message);
            }
          } else if (currentStep == 3) {
            console.log(params);
            console.log(error);
            console.log(error.path); // ticket
            console.log(error.message);
            //errors[error.path] = error.message;
            //console.log(errors);
            const validationErrors = err.inner.reduce(
              (acc: any, error: any) => {
                const path = error.path;
                console.log(path); // ticket[0].price
                const errorMessage = error.message;
                console.log(errorMessage);
                // Splitting the path to extract ticket index and property
                const ticketArray = path.match(/ticket\[(\d+)\]\.(\w+)/);
                console.log(ticketArray);
                if (ticketArray) {
                  const [, ticketIndex, property] = ticketArray;
                  console.log(ticketIndex);
                  console.log(property);
                  // Create an object for the specific ticket
                  if (!acc[ticketIndex]) {
                    acc[ticketIndex] = {};
                  }
                  // Assign the error message to the property
                  acc[ticketIndex][property] = errorMessage;
                  console.log(acc);
                  return acc;
                } else {
                  acc = errorMessage;
                  console.log(typeof errorMessage);
                  return acc;
                }
              },
              []
            );
            errors.ticket = validationErrors;
            console.log(errors);
          } else {
            if (touched[error.path as keyof ITouchedBoolean]) {
              errors[error.path] = error.message;
            }
          }
        });
        console.log(errors);
        this.setState({ formErrors: errors });
      });

    validationSchema.isValid(params).then((valid) =>
      this.setState({
        disabled: {
          ...disabled,
          ["step" + currentStep]: !valid,
        },
      })
    );
  };

  validateForm = async () => {
    const { currentStep, params, touched, disabled, formErrors } = this.state;
    const validationSchemas = {
      1: step1ValidationSchema,
      2: step2ValidationSchema,
      3: step3ValidationSchema,
      4: step4ValidationSchema,
      5: step5ValidationSchema,
    };
    const validationSchema =
      validationSchemas[currentStep as keyof typeof validationSchemas] ||
      step1ValidationSchema;

    try {
      await validationSchema.validate(params, { abortEarly: false });
      // If validation succeeds, clear form errors
      this.setState({ formErrors: {} });
    } catch (errors: any) {
      const formErrors = {};
      errors.inner.forEach((error: any) => {
        // Flatten the error messages to match the structure of the state
        setNestedProperty(formErrors, error.path, error.message);
      });
      // Update the state with the form errors
      this.setState({ formErrors });
      // Validation failed
    }

    validationSchema.isValid(params).then((valid) =>
      this.setState({
        disabled: {
          ...disabled,
          ["step" + currentStep]: !valid,
        },
      })
    );
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      moment(this.state.params.end?.date!).isBefore(
        moment(this.state.params.start.date!)
      )
    ) {
      toast.error("End date must be greater than start date.");
    } else {
      console.log(this.state);
    }
  };

  next = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep:
        currentStep >= this.totalSteps - 1 ? this.totalSteps : currentStep + 1,
    });
  };

  prev = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep <= 1 ? 1 : currentStep - 1,
    });
  };

  previousButton() {
    const { currentStep } = this.state;
    if (currentStep !== 1) {
      return (
        <button
          className="flex justify-center rounded border border-[#E2E8F0] py-2 px-6 font-medium text-black hover:shadow-1 dark:border-[#3d4d60] dark:text-white"
          type="button"
          onClick={this.prev}
        >
          Previous
        </button>
      );
    }
    return null;
  }

  nextButton() {
    const { currentStep, disabled } = this.state;
    const stepDisabled = disabled[`step${currentStep}`] || false;
    if (currentStep < this.totalSteps) {
      return (
        <button
          disabled={stepDisabled}
          className={`${
            stepDisabled ? "disabled" : ""
          } flex justify-center rounded bg-red-600 py-2 px-6 font-medium text-white hover:bg-opacity-95`}
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
    const { currentStep } = this.state;
    if (currentStep == this.totalSteps) {
      return (
        <button
          className="flex justify-center rounded bg-red-600 py-2 px-6 font-medium text-white hover:bg-opacity-95"
          type="submit"
        >
          Submit
        </button>
      );
    }
    return null;
  }

  onIncrement = (index: number): void => {
    // Create a copy of the current state
    const updatedParams = { ...this.state.params };
    // Create a copy of the current ticket array
    const updatedTickets = [...updatedParams.ticket];
    // Increment the quantity for the specified index
    updatedTickets[index] = {
      ...updatedTickets[index],
      quantity: Number(updatedTickets[index].quantity) + 1,
    };
    // Update the params in the state
    updatedParams.ticket = updatedTickets;
    // Update the state
    this.setState({
      params: updatedParams,
    });
  };

  onDecrement = (index: number): void => {
    // Create a copy of the current state
    const updatedParams = { ...this.state.params };
    // Create a copy of the current ticket array
    const updatedTickets = [...updatedParams.ticket];
    // Ensure the quantity doesn't go below 0
    if (updatedTickets[index].quantity > 0) {
      // Decrement the quantity for the specified index
      updatedTickets[index] = {
        ...updatedTickets[index],
        quantity: updatedTickets[index].quantity - 1,
      };
      // Update the params in the state
      updatedParams.ticket = updatedTickets;
      // Update the state
      this.setState({
        params: updatedParams,
      });
    }
  };

  handleTicketChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { type, name, value } = e.target;
    const { params } = this.state;
    // Create a copy of the current state
    const updatedParams = { ...params };
    //Create a copy of the current ticket array
    const updatedTickets = [...params.ticket];
    // Update the value for the specified index
    updatedTickets[index] = {
      ...updatedTickets[index],
      [name]: value,
    };
    console.log(updatedTickets);
    // Update the params in the state
    updatedParams.ticket = updatedTickets;
    // Update the state
    this.setState({
      params: updatedParams,
    });
  };

  AddTicket = (): void => {
    const { params } = this.state;
    const updatedParams = { ...params }; // Create a copy of the current state
    const updatedTickets = [...params.ticket]; // Create a copy of the current ticket array
    updatedTickets.push(initialTicket); // Add a new ticket with initial values
    updatedParams.ticket = updatedTickets; // Update the params in the state
    // Update the state
    this.setState({
      params: updatedParams,
    });
  };

  AddTicketTouched = (): void => {
    const { touched } = this.state;
    const updatedTouched = { ...touched }; // Create a copy of the current state
    const updatedTouchedTickets = [...touched.ticket]; // Create a copy of the current ticket array
    updatedTouchedTickets.push(initialTicketBoolean); // Add a new ticket boolean with initial values
    updatedTouched.ticket = updatedTouchedTickets; // Update the params in the state
    // Update the state
    this.setState({
      touched: updatedTouched,
    });
  };

  onAddTicket = (): void => {
    this.AddTicket();
    this.AddTicketTouched();
  };

  onRemoveTicket = (index: number): void => {
    const { params } = this.state;
    // Create a copy of the current state
    const updatedParams = { ...params };
    // Create a copy of the current ticket array
    const updatedTickets = [...params.ticket];
    // Remove the last ticket
    //updatedTickets.pop();
    updatedTickets.splice(index, 1);
    // Update the params in the state
    updatedParams.ticket = updatedTickets;
    // Update the state
    this.setState({
      params: updatedParams,
    });
  };

  public render() {
    const { mount } = this.state;
    const {} = this.state.params;
    return (
      <>
        {mount && (
          <Private2>
            <div className="mx-auto max-w-270">
              <Breadcrumb pageName="Create Event" />
              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                  <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-[#2E3A47] dark:bg-[#24303F]">
                    {/* {!showReview ? ( */}
                    <>
                      <div className="border-b border-stroke py-4 px-7 dark:border-[#2E3A47]">
                        <h3 className="font-medium text-black dark:text-white">
                          Create Event
                        </h3>
                      </div>
                      <div className="p-7 px-5">
                        <form action="/" onSubmit={this.handleSubmit}>
                          <Step1
                            currentStep={this.state.currentStep}
                            params={this.state.params}
                            formErrors={this.state.formErrors}
                            touched={this.state.touched}
                            disabled={this.state.disabled}
                            handleChange={this.handleChange}
                            onMultiSelectChange={this.handleArrayChange}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                          />
                          <Step2
                            currentStep={this.state.currentStep}
                            params={this.state.params}
                            formErrors={this.state.formErrors}
                            touched={this.state.touched}
                            disabled={this.state.disabled}
                            handleDateChange={this.handleDateChange}
                            handleBannerChange={this.handleArrayChange}
                            onDateFocus={this.onDateFocus}
                            handleChange={this.handleChange}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                          />
                          <Step3
                            currentStep={this.state.currentStep}
                            params={this.state.params}
                            formErrors={this.state.formErrors}
                            touched={this.state.touched}
                            disabled={this.state.disabled}
                            handleTicketChange={this.handleTicketChange}
                            onFocus={this.onTicketFocus}
                            onBlur={this.onBlur}
                            onIncrement={this.onIncrement}
                            onDecrement={this.onDecrement}
                            onAddTicket={this.onAddTicket}
                            onRemoveTicket={this.onRemoveTicket}
                          />
                          <Step4
                            currentStep={this.state.currentStep}
                            params={this.state.params}
                            formErrors={this.state.formErrors}
                            touched={this.state.touched}
                            disabled={this.state.disabled}
                            handleChange={this.handleChange}
                            handleSelectChange={this.handleSelectChange}
                            onSelectFocus={this.onSelectFocus}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                          />
                          <Step5
                            currentStep={this.state.currentStep}
                            params={this.state.params}
                            formErrors={this.state.formErrors}
                            touched={this.state.touched}
                            disabled={this.state.disabled}
                            handleChange={this.handleChange}
                            handleObjectSelectChange={
                              this.handleObjectSelectChange
                            }
                            onSelectFocus={this.onSelectFocus}
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
                    </>
                    {/* // ) : (
                    //   <PaymentReview
                    //     type="Savings"
                    //     params={this.state.paymentValue}
                    //     data={this.state.params}
                    //     reviewOpen={showReview}
                    //     setShowReview={this.onShowReview.bind(this)}
                    //   />
        // )} */}
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

export default CreateEvent;
