"use client";
import React, { Component } from "react";
import Private2 from "../components/Layouts/Private2";
import Breadcrumb from "../components/Breadcrumbs";
import { BsPhone, BsPhoneFlip } from "react-icons/bs";
import Airtime from "./airtime";
import Data from "./data";
import RightBar from "../components/RightBar";

interface IState {
  mount: boolean;
  currentTab: string;
  showReview: boolean;
}

type Props = {};

const options = [
  { value: "9Mobile", label: "9Mobile", icon: "/imgs/telcos/9mobile.svg" },
  { value: "Airtel", label: "Airtel", icon: "/imgs/telcos/airtel.svg" },
  { value: "GLO", label: "GLO", icon: "/imgs/telcos/glo.svg" },
  { value: "MTN", label: "MTN", icon: "/imgs/telcos/mtn.svg" },
];

class BillPayments extends Component<Props, IState> {
  tabs = [
    {
      label: "Buy Airtime",
      text: "Airtime",
      icon: (classes: string) => {
        return <BsPhone className={classes} />;
      },
    },
    {
      label: "Buy Data",
      text: "Data",
      icon: (classes: string) => {
        return <BsPhoneFlip className={classes} />;
      },
    },
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      mount: false,
      currentTab: "Airtime",
      showReview: false,
    };
  }

  componentDidMount() {
    this.setState({ mount: true });
  }

  setShowReview() {
    this.setState({ showReview: !this.state.showReview });
  }

  render() {
    const { mount, currentTab, showReview } = this.state;
    return (
      <>
        {mount && (
          <Private2>
            <div className="mx-auto max-w-270">
              <Breadcrumb pageName="Bill Payments" />
              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                  <div className="rounded-lg border border-[#E2E8F0] bg-white shadow-default dark:border-[#2E3A47] dark:bg-[#24303F]">
                    {!showReview && (
                      <ul className="border-[#E2E8F0] dark:border-[#2E3A47] text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
                        {this.tabs.map((tab, i) => (
                          <li key={i} className="w-full">
                            <button
                              type="button"
                              onClick={() =>
                                this.setState({ currentTab: tab.text })
                              }
                              className={` 
        ${i == 0 ? "rounded-l-lg" : "rounded-r-lg"} 
        ${
          currentTab === tab.text
            ? "active text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white"
            : "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 "
        } 
        inline-block w-full p-4 focus:outline-none`}
                              aria-current="page"
                            >
                              <div className="inline-flex">
                                <span>
                                  {tab.icon(
                                    `w-5 h-5 mr-2 ${
                                      currentTab === tab.text
                                        ? "text-red-600 dark:text-red-500"
                                        : ""
                                    }`
                                  )}
                                </span>
                                <span>{tab.label}</span>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div>
                      <>
                        {currentTab === "Airtime" ? (
                          <Airtime
                            options={options}
                            showReview={this.state.showReview}
                            setShowReview={this.setShowReview.bind(this)}
                          />
                        ) : (
                          <Data
                            options={options}
                            showReview={this.state.showReview}
                            setShowReview={this.setShowReview.bind(this)}
                          />
                        )}
                      </>
                    </div>
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

export default BillPayments;
