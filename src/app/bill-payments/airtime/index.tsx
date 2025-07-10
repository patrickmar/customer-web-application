import React, { ChangeEvent, Component, FormEvent } from "react";
import Image from "next/image";
import { TbCurrencyNaira } from "react-icons/tb";
import Select from "react-select";
import { IBoolean, IString } from "../../utils/Interface";
import parsePhoneNumberFromString from "libphonenumber-js";
import { airtimeValidationSchema } from "../../validations/billPaymentValidation";
import PaymentReview from "../../components/Paymentreview";

interface IAirtimeProps {
  options: any[];
  showReview: boolean;
  setShowReview: (open: boolean) => void;
}

interface IState {
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
  [key: string]: string | number;
}

class Airtime extends Component<IAirtimeProps, IState> {
  initialValues = { phoneNo: "", network: "", amount: 0 };
  initialNetwork = { icon: "", label: "", value: "" };
  initialTouched = { phoneNo: false, network: false, amount: false };
  constructor(props: IAirtimeProps) {
    super(props);
    this.state = {
      selectedNetwork: this.initialNetwork,
      params: this.initialValues,
      formErrors: {},
      touched: this.initialTouched,
      disabled: true,
      PaymentValue: [],
    };
  }

  componentDidUpdate(
    prevProps: Readonly<IAirtimeProps>,
    prevState: Readonly<IState>
  ): void {
    if (prevState.params !== this.state.params) {
      this.validate();
    }
  }

  validate = () => {
    const initialFormErrors = {};
    airtimeValidationSchema
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

    airtimeValidationSchema
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
        name: "Airtime Details",
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

  public render() {
    const { selectedNetwork, formErrors, touched, disabled } = this.state;
    const { phoneNo, amount, network } = this.state.params;
    const { showReview } = this.props;
    return (
      <>
        {!showReview ? (
          <div className="p-7">
            <form action="/" onSubmit={this.submit}>
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="network"
                  >
                    Service Provider
                  </label>
                  <div className="relative z-20 bg-white dark:bg-[#1d2a39]">
                    <Select
                      classNamePrefix="react-select dark:bg-[#1d2a39]"
                      className="relative z-20 w-full dark:bg-[#1d2a39] appearance-none rounded border border-[#E2E8F0] bg-transparent py-1.5 outline-none transition focus:border-red-600 active:border-red-600 dark:border-[#2E3A47]"
                      isSearchable={false}
                      value={selectedNetwork}
                      id="network"
                      name="network"
                      placeholder={"Select Provider"}
                      inputId="network"
                      instanceId="airtime"
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
                    Recipient Phone Number
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
                      className="w-full rounded border border-[#E2E8F0] bg-white py-3 pl-11.5 pr-4.5 text-black focus:border-red-600 focus-visible:outline-none dark:border-[#2E3A47] dark:bg-[#313D4A] dark:text-white dark:focus:border-red-600"
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
          </div>
        ) : (
          <div>
            <PaymentReview
              type="airtime"
              params={this.state.PaymentValue}
              data={this.state.params}
              reviewOpen={showReview}
              setShowReview={this.props.setShowReview}
            />
          </div>
        )}
      </>
    );
  }
}

const mapState2Props = (state: any) => {
  return {};
};

// export default connect(mapState2Props)(Airtime);

export default Airtime;
