import Link from "next/link";
import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

type Props = {
  title: string;
  text: string;
  button: string;
  href: string;
  color: string;
};

const Cta = (props: Props) => {
  const { title, text, button, href, color } = props;
  return (
    <>
      <div id="cta" className="flex items-center mb-3">
        <span className="text-gray-800 text-sm font-semibold rounded dark:bg-gray-700 dark:text-white">
          {title}
        </span>
      </div>
      <p className="mb-3 text-sm text-gray-700 dark:text-white">{text}</p>
      <div className={`mt-4 text-${color}`}>
        <Link href={href} className="text-xs font-bold">
          <span className="flex gap-1 items-center">
            {button}
            <HiArrowNarrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </>
  );
};

export default Cta;
