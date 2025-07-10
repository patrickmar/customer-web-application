"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarCollapse,
} from "flowbite-react";
import { HiOutlineSave } from "react-icons/hi";
import { BsCalendar, BsHouseDoor, BsPerson } from "react-icons/bs";

const SidebarNav = () => {
  const menus = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: BsHouseDoor,
    },
    {
      name: "MoSave",
      icon: HiOutlineSave,
      submenus: [
        {
          name: "Savings",
          link: "/savings",
        },
        {
          name: "Withdrawal",
          link: "/withdraw",
        },
      ],
    },
    {
      name: "Profile",
      link: "/profile",
      icon: BsPerson,
    },
    {
      name: "MoTicket",
      link: "/savings",
      icon: BsCalendar,
    },
  ];

  return (
    <Sidebar className="bg-white fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full font-normal duration-75 transition-width lg:flex">
      <div className="bg-white h-full overflow-y-auto overflow-x-hidden rounded py-4 px-3 dark:bg-gray-800">
        <Image
          className="h-12 w-auto mr-2"
          src="/imgs/logo/logo.png"
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
        />

        <SidebarItemGroup className="mt-5">
          {menus.map((menu, i) => (
            <React.Fragment key={i}>
              {menu.submenus && menu.submenus.length > 0 ? (
                <SidebarCollapse icon={menu.icon} label={menu.name}>
                  {menu.submenus.map((submenu, id) => (
                    <SidebarItem as={Link} href={submenu.link} key={id}>
                      {submenu.name}
                    </SidebarItem>
                  ))}
                </SidebarCollapse>
              ) : (
                <SidebarItem icon={menu.icon} as={Link} href={menu.link}>
                  {menu.name}
                </SidebarItem>
              )}
            </React.Fragment>
          ))}
        </SidebarItemGroup>
      </div>
    </Sidebar>
  );
};

export default SidebarNav;
