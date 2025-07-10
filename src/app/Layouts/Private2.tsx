"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/app/components/Footer";
import Sidebar from "@/app/Layouts/Sidebar";
import Header from "@/app/components/Header";
import { usePathname, useRouter } from "next/navigation";
import { useLogoutMutation } from "@/state/api";
import { IUser } from "@/app/utils/Interface"; // Import your user interface

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const Private2: React.FC<PrivateLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null); // Add user state
  const router = useRouter();
  const pathname = usePathname();
  const [logout] = useLogoutMutation();

  const publicPaths = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/verify",
  ];

  const isPublicPath = publicPaths.includes(pathname);

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData)); // Parse and set user data
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }

    if (!token && !isPublicPath) {
      router.replace("/auth/login");
    }
    setIsLoading(false);
  }, [pathname, isPublicPath, router]);

  const logoutUser = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      setUser(null); // Clear user state
      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-red border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header
            user={user} // Pass the user prop
            sidebarOpen={sidebarOpen}
            onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
            onLogout={logoutUser}
          />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Private2;
