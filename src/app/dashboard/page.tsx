"use client";
import { useEffect, useState } from "react";
import Private2 from "../components/Layouts/Private2";
import { Greeting } from "../utils/functions";
import { BsEye, BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Link from "next/link";
import { callToAction, data, data2, data3, trans } from "./constant";
import { NumericFormat } from "react-number-format";
import { MdKeyboardArrowDown } from "react-icons/md";
import moment from "moment";
import Cta from "../components/Cards/Cta";
import Info from "../components/Cards/Info";
import { RootState, AppDispatch, useAppSelector } from "../redux";

const DashboardPage = () => {
  const [mount, setMount] = useState(false);
  const [show, setShow] = useState(false);
  const [board] = useState(data);
  const [quickLinks2] = useState(data3);
  const [transactions] = useState(trans);

  useEffect(() => {
    setMount(true);
  }, []);
  //const { user } = useAppSelector((state) => state.auth);
const  user ='';
 // const firstName = user?.user?.firstName || "";

  return (
    <>
      {mount && (
        <Private2>
          <div className="mb-5">
            <h1 className="my-2 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              <Greeting /> {//firstName
              }
            </h1>

            {/* Stat Cards */}
            <div className="grid gap-4 mt-4 md:grid-cols-2 xl:grid-cols-4">
              {board.map((item, i) => (
                <div
                  key={i}
                  className={`${item.bg} bg-cardBg bg-blend-color-burn p-4 space-y-4 border border-gray-100 rounded-lg shadow-sm dark:border-gray-700 sm:p-2 dark:bg-gray-800`}
                >
                  <div className="flex items-center space-x-3 px-2 py-2">
                    <span className="bg-white inline-flex items-center justify-center w-12 h-12 mr-2 text-sm font-semibold text-gray-800 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      {item.icon}
                    </span>
                    <div className="space-y-0.5 font-medium text-white dark:text-white text-left">
                      <h3>{item.heading}</h3>
                      <small className="text-xs text-white dark:text-gray-400">
                        {item.subheading}
                      </small>
                    </div>
                  </div>
                  <div className="flex px-2 py-1">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-white sm:text-xl dark:text-white">
                        {show ? (
                          <NumericFormat
                            value={Number(item.amount).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₦"}
                          />
                        ) : (
                          "****"
                        )}
                      </h2>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-white dark:text-white">
                      <button onClick={() => setShow(!show)}>
                        {show ? <BsEyeFill /> : <BsEyeSlashFill />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Info and CTAs */}
            <div className="grid grid-cols-1 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
              <div className="col-span-full xl:col-auto">
                <Info name="Info" />
                {callToAction.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 mb-4 space-y-6 bg-white border border-gray-100 rounded-lg shadow-sm dark:border-gray-700 sm:p-4 dark:bg-gray-800"
                  >
                    <Cta
                      title={item.title}
                      text={item.text}
                      button={item.button}
                      href={item.href}
                      color={item.color}
                    />
                  </div>
                ))}
              </div>

              {/* Quick Links & Transactions */}
              <div className="col-span-2">
                <div className="p-4 mb-4 lg:space-y-6 bg-white border border-gray-100 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                  <div className="px-4 py-2">
                    <h3 className="font-bold dark:text-white">Quick Links</h3>
                    <div className="my-5">
                      <ul className="grid grid-cols-6 gap-2">
                        {quickLinks2.map((item, i) => (
                          <li key={i}>
                            <Link
                              href={item.href}
                              className={`rounded-xl bg-[#F5F6F7] hover:bg-${item.color}-50 dark:bg-${item.color}-500 dark:hover:bg-${item.color}-800 p-2.5 flex flex-col items-center justify-center`}
                            >
                              <span
                                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 bg-${item.color}-50 dark:bg-${item.color}-800`}
                              >
                                {item.icon(
                                  `w-5 h-5 text-${item.color}-600 dark:text-${item.color}-300`
                                )}
                              </span>
                              <span
                                className={`text-xs text-${item.color}-600 dark:text-${item.color}-300 font-medium`}
                              >
                                {item.heading}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Transactions */}
                <section className="p-4 mb-4 lg:space-y-6 bg-white border border-gray-100 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                  <div className="bg-white dark:bg-gray-800">
                    <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 justify-between py-2">
                      <span className="font-semibold text-lg">
                        Last 5 Transactions
                      </span>
                      <div className="flex space-x-3">
                        <Link
                          href="/transaction-history"
                          className="py-2 px-4 text-sm font-medium bg-white border rounded-lg dark:bg-gray-800 dark:text-white"
                        >
                          View All Transactions
                        </Link>
                        <button
                          type="button"
                          className="py-2 px-4 text-sm font-medium bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-400"
                        >
                          Actions{" "}
                          <MdKeyboardArrowDown className="-mr-1 ml-1.5 w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th className="p-4"></th>
                            <th className="p-4">Transaction Ref.</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Plan</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((item, i) => (
                            <tr
                              key={i}
                              className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <td className="p-4 w-4">
                                <div className="flex items-center">
                                  <span
                                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-red-100 dark:bg-${item.color}-800`}
                                  >
                                    {item.icon(
                                      `w-5 h-5 text-${item.color}-600 dark:text-${item.color}-300`
                                    )}
                                  </span>
                                </div>
                              </td>
                              <th className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.ref}
                              </th>
                              <td className="px-4 py-3">
                                <span className="bg-blue-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                  {item.type}
                                </span>
                              </td>
                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex items-center">
                                  <div
                                    className={`bg-${item.color}-700 h-4 w-4 rounded-full mr-2`}
                                  ></div>
                                  {item.amount}
                                </div>
                              </td>
                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Basic
                              </td>
                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {moment().format("YYYY-MM-DD hh:mm:ss")}
                              </td>
                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <button
                                  type="button"
                                  className="py-2 px-3 flex items-center text-sm font-medium bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-400"
                                >
                                  <BsEye />
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </Private2>
      )}
    </>
  );
};

export default DashboardPage;
