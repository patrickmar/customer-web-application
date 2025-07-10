import { ChangeEvent, FocusEvent } from "react";

export type ILogin = {
  identity: string;
  password: string;
  email?: string; // Make optional if not always required
  // firstName:string
};

export type IRegister = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneno: string;
  terms: boolean;
  [key: string]: string | boolean;
};

export interface IUserData {
  country_code: string;
  email: string;
  email_confirm_flag: string;
  expireAt: number;
  firstName: string;
  id: string;
  lastName: string;
  message: string;
  mobilenetwork: string;
  phoneno: string;
  phoneno_confirm_flag: string;
  serialNo: string;
  token: string;
  city?: string;
  address?: string;
}

export interface IUser {
  user: IUserData;
  token: string;
  country_code: string;
  email: string;
  email_confirm_flag: string;
  expireAt: number;
  firstName: string;
  id: string;
  lastName: string;
  message: string;
  mobilenetwork: string;
  phoneno: string;
  phoneno_confirm_flag: string;
  serialNo: string;
  city?: string;
  address?: string;
}

export interface AuthState {
  user: IUser | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  data: any;
  message: string;
  isAuthenticated: false;
  loading: false;
}

export type IForgotPassword = {
  email: string;
  [key: string]: string;
};

export type IResetPassword = {
  password: string;
  confirmPassword: string;
  [key: string]: string;
};

export type IVerifyOTP = {
  code: string;
  phone?: string;
  email?: string;
};

export type IPasswordValidation = {
  label: string;
  color: string;
  bgColor: string;
  percent: number;
};

export type IBoolean = {
  [key: string]: boolean;
};

export type IString = {
  [key: string]: string;
};

export type IStepFormState = {
  mount?: boolean;
  currentStep: number;
  formErrors: IString | any;
  disabled: IBoolean;
};

export interface IDateProps {
  value: Date | null;
  name: string;
  type?: string;
}

export interface IDateFocus {
  e: FocusEvent<HTMLElement>;
  name: string;
  type?: string;
}

export type IBooleanDate = {
  date: boolean;
  time: boolean;
};

export type ITouchedBoolean = {
  title: boolean;
  description: boolean;
  category: boolean;
  type: boolean;
  tags: boolean;
  start: IBooleanDate;
  end: IBooleanDate;
  ticket: ITicketBoolean[];
  [key: string]: boolean | IBooleanDate | ITicketBoolean[] | any;
  //ticket: IBoolean[];
  //ticket: { [key: string]: boolean }[];
  //[key: string]: boolean | IBooleanDate;
};

export interface ITicketBoolean {
  name: boolean;
  price: boolean;
  quantity: boolean;
  discount: boolean;
  discountMode: boolean;
  currency: boolean;
}

export interface ISocials {
  website?: string;
  facebook?: string;
  twitter?: string;
}

export interface IEventDate {
  date: Date | null;
  time: Date | null;
}

export interface ITicket {
  name: string;
  price: number;
  quantity: number;
  discount?: number;
  discountMode?: string;
  currency: string;
}

export interface IValidationResult {
  isValid: boolean;
  errors: Record<string, string>[];
}

export interface ICustomSelect {
  name: string;
  type?: string;
  value: any;
}

export interface IReactSelect {
  value: string;
  label: string;
  __isNew__?: boolean;
}

export interface ISavings {
  transAmount: number;
  paymentcard_id: number;
  planId: number;
  accountId: number;
}

export interface IWithdrawal {
  transAmount: number;
  planId: number;
  accountId: number;
  otp: number;
}
