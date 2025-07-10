"use client";

import { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import Public from "@/app/Layouts/Public";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyOtpMutation, useForgotPasswordMutation } from "@/state/api";

const VerifyEmailPage = () => {
  const [otp, setOtp] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [date, setDate] = useState<number>(
    Date.now() + parseInt(process.env.NEXT_PUBLIC_COUNTDOWN_TIMER || "1800000")
  );
  const [complete, setComplete] = useState(false);
  const countdownRef = useRef<any>(null);

  const searchParams = useSearchParams();
  const identity = searchParams.get("identity") || "";
  const router = useRouter();

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useForgotPasswordMutation();

  useEffect(() => {
    setDisabled(otp.length !== 6);
  }, [otp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await verifyOtp({ code: otp, email: identity }).unwrap();

      // Check for successful verification based on your API response structure
      if (result.success || result.verified) {
        toast.success("Email verified successfully");
        router.push(`/auth/login?identity=${identity}`);
      } else {
        toast.error(result.message || "Verification failed");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Verification failed");
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp({ email: identity }).unwrap();
      toast.success("OTP resent successfully");
      setDate(
        Date.now() +
          parseInt(process.env.NEXT_PUBLIC_COUNTDOWN_TIMER || "1800000")
      );
      setComplete(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <Public>
      <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Verify your email
      </h2>
      <form
        className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="otp"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
          >
            We've sent an OTP to your registered email address to complete this
            process.
          </label>

          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputType="password"
            shouldAutoFocus={true}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: "3rem",
              height: "3rem",
              margin: "0 0.5rem 0.5rem 0",
              fontSize: "2rem",
              borderRadius: "4px",
              border: "1px solid rgba(0, 0, 0, 0.3)",
            }}
            containerStyle={{ justifyContent: "center" }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-300">
            Code Expires in{" "}
            <Countdown
              key={date}
              ref={countdownRef}
              date={date}
              onComplete={() => setComplete(true)}
              autoStart
            />
          </span>

          {complete && (
            <div className="text-xs text-gray-500 dark:text-gray-300">
              Didn't receive the OTP?{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={handleResend}
              >
                Resend
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={disabled || isVerifying}
          className={`w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ${
            isVerifying || disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isVerifying ? "Verifying..." : "Submit"}
        </button>
      </form>
    </Public>
  );
};

export default VerifyEmailPage;
