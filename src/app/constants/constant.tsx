import { BiDollarCircle, BiMessageSquareDetail } from "react-icons/bi";
import { BsCalendar, BsCreditCard, BsGear, BsPerson } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa6";
import { HiOutlineSave } from "react-icons/hi";
import { MdPayment } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

interface ISection {
  name: string;
  link: string;
  icon: any;
  count?: number;
  badge?: string;
  submenus?: Array<any> | undefined;
}

interface IMenu {
  name: string;
  section: ISection[];
}

export const menus: IMenu[] = [
  {
    name: "Savings",
    section: [
      {
        name: "Dashboard",
        link: "/dashboard",
        icon: <RxDashboard />,
        count: 0,
        submenus: [],
      },
      {
        name: "MoSave",
        link: "/savings",
        icon: <HiOutlineSave />,
        submenus: [
          {
            name: "Savings",
            link: "/savings",
          },
          {
            name: "Withdrawal",
            link: "/withdraw",
          },
          {
            name: "View Plans",
            link: "/plans",
          },
        ],
      },
      {
        name: "Transaction History",
        link: "/transaction-history",
        icon: <BsCreditCard />,
      },
    ],
  },
  {
    name: "Tickets",
    section: [
      {
        name: "MoTicket",
        link: "/tickets",
        icon: <BsCalendar />,
        count: 0,
        submenus: [
          {
            name: "Create Event",
            link: "/events/create",
          },
          {
            name: "View tickets",
            link: "/events/view",
          },
          {
            name: "Ticket Records",
            link: "/ticket-history",
          },
        ],
      },
    ],
  },
  {
    name: "Payments",
    section: [
      {
        name: "Bill Payments",
        link: "/bill-payments",
        icon: <MdPayment />,
        badge: "new",
      },
      {
        name: "Utilities",
        link: "/utilities",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    name: "Support",
    section: [
      {
        name: "Profile",
        link: "/profile",
        icon: <BsPerson />,
        submenus: [],
      },
      {
        name: "Settings",
        link: "/settings",
        icon: <BsGear />,
      },
      {
        name: "Notifications",
        link: "/notifications",
        count: 3,
        icon: <BiMessageSquareDetail />,
      },
      {
        name: "Referrals",
        link: "/referrals",
        icon: <BiDollarCircle />,
      },
    ],
  },
];

export const eventCategories = [
  "Music",
  "Music Concerts",
  "Music Festivals",
  "Music Carnivals",
  "Exhibitions",
  "Food exhibitions",
  "Product exhibitions",
  "Career exhibitions",
  "Conventions",
  "Parties & Nightlife",
  "Virtual Events",
  "Sporting Events",
  "Conferences",
  "Free Events",
  "Comedy",
  "Fashion Shows",
  "Art & Crafts",
];

export const currencies = [
  { name: "NGN", value: "₦" },
  { name: "USD", value: "$" },
  { name: "PDS", value: "£" },
  { name: "EUR", value: "€" },
];

export const discountModes = { name: "percent", value: "%" };

export const eventTypes = [
  {
    value: "Physical",
    label: "An event where people meet physically at a particular location",
  },
  {
    value: "Online",
    label:
      "An event that is hosted on a online platform such as zoom, google meet",
  },
];

export const onlinePlatforms = [
  { label: "Google Meet", value: "Google Meet" },
  { label: "Zoom", value: "Zoom" },
  { label: "Teams", value: "Teams" },
  { label: "Skype", value: "Skype" },
  { label: "WhatsApp", value: "WhatsApp" },
  { label: "Webex", value: "Webex" },
  { label: "Others", value: "Others" },
];

export const eventTags = [
  { label: "Event", value: "Event" },
  { label: "Free", value: "Free" },
  { label: "Online", value: "Online" },
];

export const eventMode = ["Paid", "Free"];
