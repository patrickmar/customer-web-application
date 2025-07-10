"use client";
import React, { ChangeEvent, Component, FormEvent } from "react";
import Private2 from "../components/Layouts/Private2";
import { AiOutlineBank } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";
import Breadcrumb from "../components/Breadcrumbs";
import { IBoolean, IString } from "../utils/Interface";
import { validationSchema } from "../validations/savingsValidation";
import RightBar from "../components/RightBar";
import PaymentReview from "../components/Paymentreview";
import { HiChevronDown } from "react-icons/hi";

type Props = {};

type State = {
  mount: boolean;
  params: IParams;
  formErrors: IString;
  disabled: boolean;
  touched: IBoolean;
  showReview: boolean;
  paymentValue: Array<any>;
};

interface IParams {
  accountNo: string;
  plan: string;
  amount: number;
  [key: string]: string | number;
}

class Savings extends Component<Props, State> {
  values = { accountNo: "", plan: "", amount: 0 };
  initialErrors = {};

  initialTouched = {
    accountNo: false,
    plan: false,
    amount: false,
  };
  subscribedPlans = ["Starter", "Basic", "Premium", "Any Amount"];
  constructor(props: any) {
    super(props);
    this.state = {
      mount: false,
      params: this.values,
      formErrors: {},
      touched: this.initialTouched,
      disabled: true,
      showReview: false,
      paymentValue: [],
    };
  }

  componentDidMount() {
    this.setState({ mount: true });
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>
  ): void {
    if (prevState.params !== this.state.params) {
      this.validate();
    }
  }

  onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = e.target;
    this.setState({
      params: {
        ...this.state.params,
        [name]: type === "number" && name === "amount" ? Number(value) : value,
      },
    });
  };

  submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ showReview: !this.state.showReview });
    console.log(this.state.params);
    const params = [
      {
        name: "Recipient Details",
        value: [
          {
            key: "Account Number",
            value: this.state.params.accountNo,
          },
          {
            key: "Account Name",
            value: "John Adepoju",
          },
        ],
      },
      {
        name: "Amount and Fee",
        value: [
          {
            key: "Amount",
            value: this.state.params.amount,
          },
          {
            key: "Fee",
            value: "0",
          },
        ],
      },
      {
        name: "Savings Plan",
        value: [
          {
            key: "Plan",
            value: this.state.params.plan,
          },
        ],
      },
    ];
    this.setState({ paymentValue: params });
  };

  onFocus = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    this.setState({ touched: { ...this.state.touched, [name]: true } });
  };

  onBlur = () => {
    this.validate();
  };

  validate = () => {
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

    validationSchema
      .isValid(this.state.params)
      .then((valid) => this.setState({ disabled: !valid }));
  };

  onShowReview() {
    this.setState({ showReview: !this.state.showReview });
  }

  render() {
    const { accountNo, plan, amount } = this.state.params;
    const { mount, disabled, formErrors, touched, showReview } = this.state;
    return (
      <>
        {mount && (
          <Private2>
            <div className="mx-auto max-w-270">
              <Breadcrumb pageName="Savings" />
              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                  <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-[#2e3a47] dark:bg-[#24303f]">
                    {!showReview ? (
                      <>
                        <div className="border-b border-stroke py-4 px-7 dark:border-[#2e3a47]">
                          <h3 className="font-medium text-black dark:text-white">
                            Save
                          </h3>
                        </div>
                        <div className="p-7">
                          <form action="/" onSubmit={this.submit}>
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                              <div className="w-full sm:w-1/2">
                                <label
                                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                                  htmlFor="plan"
                                >
                                  Savings Plan
                                </label>
                                <div className="relative z-20 bg-white dark:bg-[#1d2a39]">
                                  {/* Left icon */}
                                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                    <AiOutlineBank className="w-5 h-5 text-[#637381]" />
                                  </span>

                                  {/* Right chevron */}
                                  <span className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                    <HiChevronDown className="w-5 h-5 text-[#637381]" />
                                  </span>

                                  <select
                                    id="plan"
                                    name="plan"
                                    value={plan}
                                    onChange={this.onChange}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                    className="w-full rounded border text-sm border-stroke bg-transparent py-3 pl-12 pr-10 relative z-20 appearance-none outline-none transition focus:border-red-600 active:border-red-600 dark:border-[#3d4d60] dark:bg-[#313D4A] focus:ring-red-500 dark:focus:ring-red-500"
                                  >
                                    <option value="">Select Plan</option>
                                    {this.subscribedPlans.map((p, i) => (
                                      <option key={i} value={p}>
                                        {p}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <small className="mt-2 text-xs text-red-600 dark:text-red-600">
                                  {touched.plan && formErrors.plan}
                                </small>
                              </div>

                              <div className="w-full sm:w-1/2">
                                <label
                                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                                  htmlFor="accountNo"
                                >
                                  Recipient Account
                                </label>
                                <input
                                  className="w-full rounded border text-sm border-stroke bg-white py-3 px-4.5 text-black focus:border-red-600 focus-visible:outline-none dark:bg-[#313D4A] dark:border-gray-600 dark:text-white dark:focus:border-red-600 dark:placeholder-gray-400 focus:ring-red-500 dark:focus:ring-red-500"
                                  type="number"
                                  name="accountNo"
                                  id="accountNo"
                                  value={accountNo}
                                  onChange={this.onChange}
                                  onFocus={this.onFocus}
                                  onBlur={this.onBlur}
                                />
                                <small className="  mt-2 text-xs text-red-600 dark:text-red-600">
                                  {touched.accountNo && formErrors.accountNo}
                                </small>
                              </div>
                            </div>

                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                              <div className="w-full sm:w-1/2">
                                <label
                                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                                  htmlFor="amount"
                                >
                                  Amount
                                </label>
                                <div className="relative">
                                  <span className="absolute left-4.5 top-4">
                                    <TbCurrencyNaira className="w-5 h-5 text-[#637381]" />
                                  </span>
                                  <input
                                    className="w-full rounded border border-stroke bg-white py-3 pl-11.5 pr-4.5 text-black focus:border-red-600 focus-visible:outline-none dark:border-[#2e3a47] dark:bg-[#313D4A] dark:text-white dark:focus:border-primary-600"
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    value={amount}
                                    onChange={this.onChange}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                  />
                                  <small className="mt-2 text-xs text-red-600 dark:text-red-600">
                                    {touched.amount && formErrors.amount}
                                  </small>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end gap-4.5 mt-5">
                              <button
                                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                type="button"
                              >
                                Cancel
                              </button>
                              <button
                                disabled={disabled}
                                className={`${
                                  disabled ? "disabled" : ""
                                } flex justify-center rounded bg-red-600 py-2 px-6 font-medium text-white hover:bg-opacity-95`}
                                type="submit"
                              >
                                Continue
                              </button>
                            </div>
                          </form>
                        </div>
                      </>
                    ) : (
                      <PaymentReview
                        type="Savings"
                        params={this.state.paymentValue}
                        data={this.state.params}
                        reviewOpen={showReview}
                        setShowReview={this.onShowReview.bind(this)}
                      />
                    )}
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

export default Savings;
