"use client";
import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Sidebar from "../../components/Sidebar";
import Header from "@/app/components/Header/index";
import useAuth from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/state/features/authSlice";
import { AppDispatch } from "@/app/redux";
// import { AppDispatch } from "@/redux/store/store";
// import { logout } from "@/redux/features/auth/authSlice";

const Private2 = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAuth();
  console.log(user);
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const publicPath = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/verify",
  ];
  const path = publicPath.find((p) => p === pathname);
  console.log(path);
  const dispatch = useDispatch<AppDispatch>();

  const logoutUser = () => {
    console.log(user);
    dispatch(logout());
  };

  useEffect(() => {
    if (user == undefined) {
      // Still loading, show loading spinner
      return;
    }
    if (user == null) {
      router.replace("/auth/login");
    }
  }, [user, dispatch, router]);

  useEffect(() => {
    console.log(pathname);
    // Redirect to login page if user is not authenticated
    if (
      (!user || user == null) &&
      pathname !== "/auth/login" &&
      pathname !== "/auth/register"
    ) {
      router.replace("/auth/login");
    }
  }, [user, pathname, router]);
  //   return <>{children}</>;
  // };
  return (
    <div className="dark:bg-[#1A222C] dark:text-[#AEB7C0]">
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            logoutUser={logoutUser}
            user={user}
          />
          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Footer start ===== --> */}
          <Footer />
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
    </div>
  );
};

export default Private2;
