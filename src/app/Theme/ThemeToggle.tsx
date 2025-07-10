"use client";

import React, { useState, useEffect } from "react";
import { get, store } from "../utils/storage";
import { BsBrightnessHigh, BsMoon, BsMoonStars } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";

const ThemeToggle = () => {
  const storedTheme = get("theme");
  const [theme, setTheme] = useState(storedTheme ? storedTheme : "system");
  const [isMounted, setIsMounted] = useState(false);

  const element =
    typeof document !== "undefined" ? document.documentElement : null;
  const darkQuery =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;

  // Flag that DOM is ready
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initial theme setting on mount
  useEffect(() => {
    if (!element || !darkQuery) return;

    const savedTheme = get("theme");
    if (savedTheme === "dark" || (!savedTheme && darkQuery.matches)) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, [element, darkQuery]);

  // Update theme based on user selection
  useEffect(() => {
    if (!element) return;

    switch (theme) {
      case "dark":
        element.classList.add("dark");
        store("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        store("theme", "light");
        break;
      case "system":
        store("theme", "system");
        if (darkQuery?.matches) {
          element.classList.add("dark");
        } else {
          element.classList.remove("dark");
        }
        break;
    }
  }, [theme, element, darkQuery]);

  return (
    <>
      {isMounted && (
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="dark:text-white">
                {theme === "light" ? (
                  <BsBrightnessHigh size={20} />
                ) : theme === "dark" ? (
                  <BsMoon size={20} />
                ) : (
                  <BsMoonStars size={20} />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <BsMoonStars className="mr-2 h-4 w-4" />
                <span>Auto (System Default)</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <BsBrightnessHigh className="mr-2 h-4 w-4" />
                <span>Light Mode</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <BsMoon className="mr-2 h-4 w-4" />
                <span>Dark Mode</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );
};

export default ThemeToggle;
