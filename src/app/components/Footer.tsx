import moment from "moment";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const year = moment().format("YYYY");
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME;
  const companyWebURL = process.env.NEXT_PUBLIC_COMPANY_WEB_URL;
  const copyrightMessage = process.env.NEXT_PUBLIC_COPYRIGHT_MESSAGE;
  return (
    <>
      {/* {className: "md:ml-64"} */}
      <footer className="p-4 my-6 mx-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 xl:p-8 dark:bg-gray-900">
        <p className="mb-4 text-sm text-center dark:text-white sm:mb-0">
          &copy; {year}{" "}
          <a href={companyWebURL} className="hover:underline" target="_blank">
            {companyName}
          </a>
          . {copyrightMessage}
        </p>

        <div className="flex space-x-6 sm:justify-center">
          <a
            href="https://facebook.com"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <FaFacebook className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <FaTwitter className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
