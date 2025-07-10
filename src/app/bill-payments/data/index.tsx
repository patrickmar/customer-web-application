import React, { ChangeEvent, Component, FormEvent } from "react";
import Image from "next/image";
import Select from "react-select";
import { IBoolean, IString } from "../../utils/Interface";
import parsePhoneNumberFromString from "libphonenumber-js";
import { NumericFormat } from "react-number-format";
import { dataValidationSchema } from "../../validations/billPaymentValidation";
import PaymentReview from "../../components/Paymentreview";

interface IDataProps {
  options: any[];
  showReview: boolean;
  setShowReview: (open: boolean) => void;
}

interface IDataState {
  selectedNetwork: IString;
  params: IParams;
  formErrors: IString;
  touched: IBoolean;
  disabled: boolean;
  PaymentValue: Array<any>;
}

interface IParams {
  phoneNo: string;
  network: string;
  amount: number;
  plan: string;
  [key: string]: string | number;
}
interface IDataPlans {
  plan: string;
  label: string;
  operator: string;
  validity: string;
  planId: string;
  price: string;
  currency: string;
}
export default class Data extends Component<IDataProps, IDataState> {
  initialValues = { phoneNo: "", network: "", amount: 0, plan: "" };
  initialErrors = { phoneNo: "", network: "", plan: "" };
  initialNetwork = { icon: "", label: "", value: "" };
  initialTouched = { phoneNo: false, network: false, plan: false };
  dataPlans = {
    request: "fetch_data_plans",
    status: "success",
    data: [
      {
        plan: "1000",
        label: "1GB",
        operator: "MTN",
        validity: "30",
        planId: "1",
        price: "600",
        currency: "NGN",
      },
      {
        plan: "2000",
        label: "2GB",
        operator: "MTN",
        validity: "30",
        planId: "2",
        price: "1100",
        currency: "NGN",
      },
      {
        plan: "10000.01",
        label: "10GB",
        operator: "MTN",
        validity: "30",
        planId: "3",
        price: "2000",
        currency: "NGN",
      },
      {
        plan: "1000",
        label: "1GB",
        operator: "MTN",
        validity: "30",
        planId: "4",
        price: "600",
        currency: "NGN",
      },
      {
        plan: "2000",
        label: "2GB",
        operator: "MTN",
        validity: "30",
        planId: "5",
        price: "1100",
        currency: "NGN",
      },
      {
        plan: "10000.01",
        label: "10GB",
        operator: "MTN",
        validity: "30",
        planId: "6",
        price: "2000",
        currency: "NGN",
      },
    ],
  };
  constructor(props: IDataProps) {
    super(props);

    this.state = {
      selectedNetwork: this.initialNetwork,
      params: this.initialValues,
      formErrors: this.initialErrors,
      touched: this.initialTouched,
      disabled: true,
      PaymentValue: [],
    };
  }

  componentDidUpdate(
    prevProps: Readonly<IDataProps>,
    prevState: Readonly<IDataState>
  ): void {
    if (prevState.params !== this.state.params) {
      this.validate();
    }
  }

  validate = () => {
    const initialFormErrors = {};
    dataValidationSchema
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

    dataValidationSchema
      .isValid(this.state.params)
      .then((valid) => this.setState({ disabled: !valid }));
  };

  handleChange = (selectedNetwork: any) => {
    this.setState({ selectedNetwork }, () => {
      this.onBlur();
    });
    this.setState({
      params: { ...this.state.params, network: selectedNetwork.value },
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
    console.log(this.state.params);
    console.log(
      JSON.stringify(
        parsePhoneNumberFromString(this.state.params.phoneNo, "NG"),
        null,
        2
      )
    );
    this.props.setShowReview(!this.props.showReview);
    const params = [
      {
        name: "Data Details",
        value: [
          {
            key: "Mobile Number",
            value: this.state.params.phoneNo,
          },
          {
            key: "Service Provider",
            value: this.state.params.network,
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
    this.setState({ PaymentValue: params });
  };

  onFocus = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    const { id } = e.target;
    this.setState({
      touched: { ...this.state.touched, [name === "" ? id : name]: true },
    });
  };

  onBlur = () => {
    this.validate();
  };

  selectData(item: IDataPlans) {
    console.log(item);
    const price = this.dataPlans.data.filter((d) => d.planId === item.planId)[0]
      .price;
    this.setState({
      params: {
        ...this.state.params,
        plan: item.planId,
        amount: Number(price),
      },
    });
  }

  public render() {
    const { selectedNetwork, formErrors, touched, disabled } = this.state;
    const { phoneNo, plan, network } = this.state.params;
    const { showReview } = this.props;

    return (
      <div className="p-7">
        {!showReview ? (
          <form action="/" onSubmit={this.submit}>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="networkData"
                >
                  Service Network
                </label>
                <div className="relative z-20 bg-white dark:bg-[#1d2a39]">
                  <Select
                    classNamePrefix="react-select"
                    className="relative z-20 w-full appearance-none rounded border border-[#E2E8F0] bg-transparent py-1.5 outline-none transition focus:border-red-600 active:border-red-600 dark:border-[#2E3A47]"
                    isSearchable={false}
                    value={selectedNetwork}
                    inputId="network"
                    name="network"
                    onChange={this.handleChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    options={this.props.options}
                    formatOptionLabel={(item: any) => (
                      <div className="flex gap-1">
                        {item.icon !== "" && (
                          <div className="">
                            <Image
                              src={item.icon}
                              width={30}
                              height={30}
                              alt="network"
                            />
                          </div>
                        )}
                        <span className="dark:text-white">{item.label}</span>
                      </div>
                    )}
                  />
                  <small className="mt-2 text-xs text-red-600 dark:text-red-600">
                    {touched.network && formErrors.network}
                  </small>
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="phoneNo"
                >
                  Phone Number
                </label>
                <input
                  className="w-full rounded border text-sm border-[#E2E8F0] bg-white py-3 px-4.5 text-black focus:border-red-600 focus-visible:outline-none dark:bg-[#313D4A] dark:border-gray-600 dark:text-white dark:focus:border-red-600 dark:placeholder-gray-400 focus:ring-red-500 dark:focus:ring-red-500"
                  type="number"
                  name="phoneNo"
                  id="phoneNo"
                  value={phoneNo}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                />
                <small className="mt-2 text-xs text-red-600 dark:text-red-600">
                  {touched.phoneNo && formErrors.phoneNo}
                </small>
              </div>
            </div>

            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="plan"
                >
                  Choose Plan
                </label>
                <ul className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-3 gap-2">
                  {this.dataPlans.data.map((item: IDataPlans, i: number) => (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => this.selectData(item)}
                        className={`${
                          plan === item.planId ? "border border-red-600" : ""
                        } rounded-xl bg-gray-50 hover:bg-red-100 dark:bg-black dark:hover:bg-red-800 p-2.5 flex flex-col items-center justify-center`}
                      >
                        <span className="text-lg dark:text-white font-medium">
                          {item.label}
                        </span>
                        <span className="text-sm dark:text-white">
                          {item.validity} Days
                        </span>
                        <span className="text-xs dark:text-white">
                          <NumericFormat
                            value={Number(item.price).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={false}
                            prefix={"₦"}
                          />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-4.5 mt-5">
              <button
                className="flex justify-center rounded border border-[#E2E8F0] py-2 px-6 font-medium text-black hover:shadow-1 dark:border-[#2E3A47] dark:text-white"
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
        ) : (
          <div>
            <PaymentReview
              type="data"
              params={this.state.PaymentValue}
              data={this.state.params}
              reviewOpen={showReview}
              setShowReview={this.props.setShowReview}
            />
          </div>
        )}
      </div>
    );
  }
}
