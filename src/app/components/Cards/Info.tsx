import React, { ReactNode } from "react";
import { MdClose } from "react-icons/md";

type Props = {
  name: string;
};

const Info = (props: Props) => {
  const { name } = props;
  return (
    <div
      id="cta"
      className="p-4 mb-4 rounded-lg bg-[#DECBFC] dark:bg-[#DECBFC]"
    >
      <div className="flex items-center mb-3">
        <span className="bg-[#B98EF9] text-[#533087] text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-[#CFB2FB] dark:text-[#3F2567]">
          {name}
        </span>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-[#F5EEFE] inline-flex justify-center items-center text-[#3F2567] rounded-lg focus:ring-2 focus:ring-[#AB79F8] p-1 hover:bg-[#CFB2FB] h-6 w-6 dark:bg-[#3F2567] dark:text-[#AB79F8] dark:hover:bg-[#533087]"
        >
          <MdClose className="w-5 h-5" />
        </button>
      </div>
      <p className="mb-3 text-sm text-[#6B3EAF] dark:text-[#6B3EAF]">
        You are currently saving with our agent at{" "}
        <span className="font-bold">
          Alimosho local government, Lagos, Nigeria.
        </span>
      </p>
    </div>
  );
};

export default Info;
