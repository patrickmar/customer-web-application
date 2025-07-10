export type Props = {
  profile: IProfile;
  fetchProfile(): any;
};

export type IAccount = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  country: string;
  city: string;
  address: string;
};

export type IPassword = {
  currentPassword: string;
  newPassword: string;
  newConfirmPassword: string;
};

export type IBank = {
  account_name: string;
  bank_name: string;
  bank_code: string;
  account_number: string;
};

export type IState = {
  mount: boolean;
  account: IAccount;
  pass: IPassword;
  image: string;
  countries: Array<any>;
  bank: IBank;
  banks: Array<any>;
  imageBool: boolean;
  errorMessage: string;
  avatar: string;
  disabled?: boolean;
};

export type IProfile = {
  data: any;
  response: any;
  isLoading: boolean;
  isFullLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
};

export type ICustomer = {
  firstname: string;
  lastname: string;
  phoneno: string;
  email: string;
  city: string;
};
