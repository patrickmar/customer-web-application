"use client";
import Image from "next/image";
import HomeHeader from "./Layouts/HomeHeader";

export default function Home() {
  return (
    <>
      <HomeHeader />
      <div>
        <section className="bg-white dark:bg-gray-900">
          {/* gap-8 */}
          <div className="items-center py-8 px-4 mx-auto max-w-7xl gap-8 xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
            <div>
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-black dark:text-white">
                {"Let's create more tools and ideas that brings us together."}
              </h2>
              <p className="mb-6 font-light text-gray-400 md:text-lg dark:text-gray-400">
                Flowbite helps you connect with friends and communities of
                people who share your interests. Connecting with your friends
                and family as well as discovering new ones is easy with features
                like Groups.
              </p>
              <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <a
                  href="#"
                  className="w-full sm:w-auto bg-gray-800 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700"
                >
                  <svg
                    className="mr-3 w-7 h-7"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="apple"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                    ></path>
                  </svg>
                  <div className="text-left">
                    <div className="mb-1 text-xs">Download on the</div>
                    <div className="-mt-1 text-sm font-semibold">
                      Mac App Store
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="w-full sm:w-auto bg-gray-800 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700"
                >
                  <svg
                    className="mr-3 w-7 h-7"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google-play"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                    ></path>
                  </svg>
                  <div className="text-left">
                    <div className="mb-1 text-xs">Get it on</div>
                    <div className="-mt-1 text-sm font-semibold">
                      Google Play
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <Image
              className="hidden mx-auto w-64 md:flex"
              src="/iphone-mockup.png"
              alt="mobile app"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        </section>
      </div>
    </>
  );
}
