// components/SidebarNav3.tsx
"use client";
import React from "react";
import { IUser } from "@/app/utils/Interface";

interface SidebarNav3Props {
  user: IUser | null; // Changed to accept null
  open: boolean;
}

const SidebarNav3: React.FC<SidebarNav3Props> = ({ user, open }) => {
  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 border-gray-200 border-r h-screen transition-transform md:translate-x-0 ${
        open ? "" : "-translate-x-full"
      } bg-white dark:bg-gray-800`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        {user && (
          <div className="p-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                {user.firstName?.charAt(0) || "U"}
                {user.lastName?.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SidebarNav3;
