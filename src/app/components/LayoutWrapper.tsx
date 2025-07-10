"use client";

import StoreProvider from "@/app/redux";
import { ModeToggle } from "@/app/components/toggle";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ModeToggle />
      <StoreProvider>{children}</StoreProvider>
    </>
  );
}
