"use client";

import React, { useState } from "react";
import Header from "../Header";
import SidebarNav3 from "../SidebarNav3";
import Footer from "../Footer";
import { useAppSelector } from "@/app/redux";
import { IUser } from "../../utils/Interface"; // Adjust the path to match where IUser is defined

const Private = ({ children }: { children: React.ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const { isLoading, user } = useAppSelector((state) => state.auth);

  // Toggle sidebar visibility
  const handleSidebarToggle = () => {
    setOpenSidebar((prev) => !prev);
  };

  // Placeholder logout function
  const handleLogout = async () => {
    try {
      // TODO: Replace with actual logout logic (e.g., dispatch(logout()), router.push("/login"), etc.)
      console.log("Logout clicked");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      {/* Header expects: user, sidebarOpen, onSidebarToggle, onLogout */}
      <Header
        user={user}
        sidebarOpen={openSidebar}
        onSidebarToggle={handleSidebarToggle}
        onLogout={handleLogout}
      />

      {/* Sidebar expects: user and open (or whatever SidebarNav3Props is defined with) */}
      <SidebarNav3 user={user} open={openSidebar} />

      <main className="p-4 md:ml-64 h-auto pt-20 max-w-screen-xl md:min-h-screen rounded-lg">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Private;
