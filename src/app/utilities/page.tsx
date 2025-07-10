"use client";
import React, { ChangeEvent, Component, FormEvent } from "react";
import Private2 from "../components/Layouts/Private2";
import Breadcrumb from "../components/Breadcrumbs";
import Image from "next/image";
import { TbCurrencyNaira } from "react-icons/tb";
import Select from "react-select";
import { validationSchema } from "../validations/utilitiesValidation";
import { IBoolean, IString } from "../utils/Interface";
import RightBar from "../components/RightBar";
import PaymentReview from "../components/Paymentreview";

type Props = {};
interface IState {
  selectedProvider: IString;
  mount: boolean;
  params: IParams;
  formErrors: IString;
  touched: IBoolean;
  disabled: boolean;
  showReview: boolean;
  paymentValue: any[];
}

interface IParams {
  accountNo: string;
  provider: string;
  amount: number;
  [key: string]: string | number;
}

const options = [
  {
    value: "Ikeja Disco",
    label: "Ikeja Disco",
    icon: "/imgs/discos/ikedc.svg",
  },
  { value: "EKEDC", label: "Eko Eletricity", icon: "/imgs/discos/ikedc.svg" },
  {
    value: "IBEDC",
    label: "Ibadan Electricity",
    icon: "/imgs/discos/ikedc.svg",
  },
  {
    value: "BEDC",
    label: "Benin Electricity",
    icon: "/imgs/discos/ikedc.svg",
  },
  {
    value: "Abuja Electricity",
    label: "Abuja Electricity",
    icon: "/imgs/discos/ikedc.svg",
  },
  {
    value: "Jos Electricity",
    label: "Jos Electricity",
    icon: "/imgs/discos/ikedc.svg",
  },
];

class Utilities extends Component<Props, IState> {
  initialValues = { accountNo: "", provider: "", amount: 0 };
  initialProvider = { icon: "", label: "", value: "" };
  initialTouched = { accountNo: false, provider: false, amount: false };

  constructor(props: any) {
    super(props);
    this.state = {
      selectedProvider: this.initialProvider,
      mount: false,
      params: this.initialValues,
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
    prevState: Readonly<IState>
  ): void {
    if (prevState.params !== this.state.params) {
      this.validate();
    }
  }

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

  handleChange = (selectedProvider: any) => {
    this.setState({ selectedProvider }, () => {
      // console.log(`Option selected:`, this.state.selectedProvider);
    });
    this.setState({
      params: { ...this.state.params, provider: selectedProvider.value },
    });
  };

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      params: {
        ...this.state.params,
        [e.target.name]: e.target.value,
      },
    });
  };

  submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ showReview: !this.state.showReview });
    console.log(this.state.params);
    const params = [
      {
        name: "Meter Details",
        value: [
          {
            key: "Meter Number",
            value: this.state.params.accountNo,
          },
          {
            key: "Account/Meter Customer Name",
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
  render() {
    const {
      selectedProvider,
      mount,
      formErrors,
      touched,
      disabled,
      showReview,
    } = this.state;
    const { accountNo, amount } = this.state.params;
    return (
      <>
        {mount && (
          <Private2>
            <div className="mx-auto max-w-270">
              <Breadcrumb pageName="Utilities" />
              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                  <div className="rounded-lg border border-[#E2E8F0] bg-white shadow-default dark:border-[#2E3A47] dark:bg-[#24303F]">
                    {showReview ? (
                      <>
                        <div className="border-b border-[#E2E8F0] py-4 px-7 dark:border-[#2E3A47]">
                          <h3 className="font-medium text-black dark:text-white">
                            Cable Payment
                          </h3>
                        </div>

                        <div className="p-7">
                          <form action="" onSubmit={this.submit}>
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                              <div className="w-full sm:w-1/2">
                                <label
                                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                                  htmlFor="provider"
                                >
                                  Service Provider
                                </label>
                                <div className="relative z-20 bg-white dark:bg-[#1d2a39]">
                                  <Select
                                    classNamePrefix="react-select"
                                    isSearchable={false}
                                    className=""
                                    value={selectedProvider}
                                    id="provider"
                                    name="provider"
                                    onChange={this.handleChange}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                    options={options}
                                    formatOptionLabel={(item: any) => (
                                      <div className="flex gap-1">
                                        {item.icon !== "" && (
                                          <div className="">
                                            <Image
                                              src={item.icon}
                                              width={30}
                                              height={30}
                                              alt="provider"
                                            />
                                          </div>
                                        )}
                                        <span className="dark:text-white">
                                          {item.label}
                                        </span>
                                      </div>
                                    )}
                                  />
                                  <small className="mt-2 text-xs text-red-600 dark:text-red-600">
                                    {touched.provider && formErrors.provider}
                                  </small>
                                </div>
                              </div>
                              <div className="w-full sm:w-1/2">
                                <label
                                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                                  htmlFor="accountNo"
                                >
                                  Account/Meter Number
                                </label>
                                <input
                                  className="w-full rounded border border-[#E2E8F0] bg-gray py-3 px-4.5 text-black focus:border-red-600 focus-visible:outline-none dark:border-[#2E3A47] dark:bg-[#313D4A] dark:text-white dark:focus:border-red-600"
                                  type="number"
                                  name="accountNo"
                                  id="accountNo"
                                  value={accountNo}
                                  onChange={this.onChange}
                                  onFocus={this.onFocus}
                                  onBlur={this.onBlur}
                                />
                                <small className="mt-2 text-xs text-red-600 dark:text-red-600">
                                  {touched.accountNo && formErrors.accountNo}
                                </small>
                              </div>
                            </div>

                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                              <div className="w-full sm:w-1/2">
                                <label
                                  className="inputLabelClass"
                                  htmlFor="amount"
                                >
                                  Amount
                                </label>
                                <div className="relative">
                                  <span className="absolute left-4.5 top-4">
                                    <TbCurrencyNaira className="w-5 h-5 text-greyIcon" />
                                  </span>
                                  <input
                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-red-600 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary-600"
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    value={amount}
                                    onChange={this.onChange}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                  />
                                  <small className="form-error">
                                    {touched.amount && formErrors.amount}
                                  </small>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end gap-4.5">
                              <button className="cancelButton" type="button">
                                Cancel
                              </button>
                              <button
                                disabled={disabled}
                                className={`${
                                  disabled ? "disabled" : ""
                                } submitButton`}
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
                        type="Utilities"
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

export default Utilities;
