import { FaWallet } from "react-icons/fa";
import {
  BsCreditCard2Back,
  BsFillCreditCardFill,
  BsPiggyBank,
} from "react-icons/bs";
import {
  BiCreditCard,
  BiMoney,
  BiSolidWalletAlt,
  BiSupport,
} from "react-icons/bi";
import { HiSwitchHorizontal } from "react-icons/hi";
import { MdOutlinePhoneIphone } from "react-icons/md";

export const data = [
  {
    heading: "Total Balance",
    subheading: "Your remaining balance",
    amount: "350000",
    icon: <BiCreditCard />,
    color: "bg-blue-300",
    bg: "bg-red-600",
  },
  {
    heading: "Total Wallet",
    subheading: "Your wallet balance",
    amount: "38000",
    icon: <FaWallet />,
    color: "bg-purple-300",
    bg: "bg-primary-600",
  },
  {
    heading: "Total Rewards",
    subheading: "Loyalty accrued so far",
    amount: "15000",
    icon: <BsFillCreditCardFill />,
    color: "bg-green-300",
    bg: "bg-primary-600",
  },
  {
    heading: "Total Interest",
    subheading: "Interest accrued so far",
    amount: "3000",
    icon: <BsCreditCard2Back />,
    color: "bg-red-300",
    bg: "bg-red-600",
  },
];
export const data2 = [
  {
    heading: "Deposit",
    icon: <BiCreditCard />,
    color: "text-lime-300",
    bg: "bg-lime-100",
    button: "",
  },
  {
    heading: "Withdraw",
    icon: <BiCreditCard />,
    color: "text-red-300",
    bg: "bg-red-100",
    button: "",
  },
  {
    heading: "Fund Wallet",
    icon: <BiCreditCard />,
    color: "text-yellow-300",
    bg: "bg-yellow-100",
    button: "",
  },
  {
    heading: "Deposit",
    icon: <BiCreditCard />,
    color: "text-orange-300",
    bg: "bg-orange-100",
    button: "",
  },
];
export const data3 = [
  {
    heading: "Deposit",
    color: "red",
    href: "/savings",
    icon: (classes: string) => {
      return <BsPiggyBank className={classes} />;
    },
  },
  {
    heading: "Withdraw",
    color: "red",
    href: "/withdraw",
    icon: (classes: string) => {
      return <BiCreditCard className={classes} />;
    },
  },
  {
    heading: "Fund Wallet",
    color: "red",
    href: "/fund-wallet",
    icon: (classes: string) => {
      return <BiSolidWalletAlt className={classes} />;
    },
  },
  {
    heading: "Top Up",
    color: "red",
    href: "/bill-payments",
    icon: (classes: string) => {
      return <MdOutlinePhoneIphone className={classes} />;
    },
  },
  {
    heading: "Transactions",
    color: "red",
    href: "/transaction-history",
    icon: (classes: string) => {
      return <HiSwitchHorizontal className={classes} />;
    },
  },
  {
    heading: "Get Help",
    color: "red",
    href: "/support",
    icon: (classes: string) => {
      return <BiSupport className={classes} />;
    },
  },
];

export const trans = [
  {
    type: "Deposit",
    ref: "3456723489",
    color: "customError",
    amount: "5000",
    icon: (classes: string) => {
      return <BsPiggyBank className={classes} />;
    },
  },
  {
    type: "Withdraw",
    ref: "123456789",
    color: "customSuccess",
    amount: "3000",
    icon: (classes: string) => {
      return <BiCreditCard className={classes} />;
    },
  },
  {
    type: "Commission",
    ref: "1238296789",
    color: "warning",
    amount: "500",
    icon: (classes: string) => {
      return <BiMoney className={classes} />;
    },
  },
];

export const callToAction = [
  {
    title: "Manage your budget",
    text: "Create a budget for your new car and save ahead for it.",
    button: "Create budget",
    href: "/",
    color: "blue-400",
  },
  {
    title: "Share Earn Rewards",
    text: "Lorem ipsum dolor sit amet consectetur. Egestas nunc sed sit sed.",
    button: "Refer Friends",
    href: "/",
    color: "red-400",
  },
  {
    title: "Invest and Grow your Cash",
    text: "Lorem ipsum dolor sit amet consectetur. Egestas nunc sed sit sed.",
    button: "Proceed",
    href: "/",
    color: "tertiary-700",
  },
];
