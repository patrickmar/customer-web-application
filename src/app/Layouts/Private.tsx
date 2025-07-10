"use client";
import React, { useState } from "react";
import Header from "@/app/components/Header";
import SidebarNav3 from "@/app/components/SidebarNav3";
import Footer from "@/app/components/Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux";
import { useLogoutMutation } from "@/state/api";

const Private = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const [logout] = useLogoutMutation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <Header
        user={user}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={toggleSidebar}
        onLogout={handleLogout}
      />

      <SidebarNav3 user={user} open={sidebarOpen} />

      <main className="p-4 md:ml-64 h-auto pt-20 max-w-screen-xl md:min-h-screen rounded-lg">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Private;
