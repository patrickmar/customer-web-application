"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Client = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return; // Wait for hydration
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default Client;
