"use client";
import React from "react";
import { useLogoutMutation } from "@/state/api";
import { IUser } from "@/app/utils/Interface"; // Make sure you have this interface

interface HeaderProps {
  user: IUser | null; // Changed to accept null
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  onLogout: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({
  user,
  sidebarOpen,
  onSidebarToggle,
  onLogout,
}) => {
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      await onLogout(); // Call parent logout handler
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error (e.g., show toast notification)
    }
  };

  return (
    <nav className="md:ml-64 fixed z-50 md:w-[calc(100vw-276px)] w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              type="button"
              onClick={onSidebarToggle}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">
                {sidebarOpen ? "Close sidebar" : "Open sidebar"}
              </span>
              {/* Hamburger icon */}
            </button>
          </div>

          <div className="flex items-center">
            {user && (
              <div className="flex items-center ml-3">
                <div>
                  <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                    {user.firstName?.charAt(0) || "U"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-3 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
