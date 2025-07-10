import { IString } from "./Interface";

export type IPhysicalEvent = {
  type: "Physical";
  venue: string;
  country: IString;
  state: string;
};

export type IOnlineEvent = {
  type: "Online";
  link: string;
  platform: string;
};

export type IPaidEvent = {
  mode: "Paid";
  bank: IBankDetails;
};

export type IFreeEvent = {
  mode: "Free";
};

export type IBankDetails = {
  details: IString;
  account: IString;
};

export type IAccountDetails = {
  account_name: string;
  account_number: string;
  bank_id: string;
};

export type ISelect = {
  value: string;
  label: string;
  code: string;
};
