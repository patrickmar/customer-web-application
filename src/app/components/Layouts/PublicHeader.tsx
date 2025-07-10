"use client";
import React from "react";
import ThemeToggle from "../../Theme/ThemeToggle";
import Link from "next/link";

const publicHeader = () => {
  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center"></a>
        <div className="flex items-center lg:order-2">
          <ThemeToggle />
          <Link
            href="/auth/register"
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default publicHeader;
