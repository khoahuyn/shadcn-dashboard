/** @format */
"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";

type Props = {};

import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  ArrowRight,
  Plane,
  BaggageClaim,
  Backpack
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({ }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3  pb-10 pt-24 ">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          // {
          //   title: "Dashboard",
          //   href: "/",
          //   icon: LayoutDashboard,
          //   variant: "ghost"
          // },
          // {
          //   title: "Users",
          //   href: "/users",
          //   icon: UsersRound,
          //   variant: "ghost"
          // },
          // {
          //   title: "Ordrs",
          //   href: "/orders",
          //   icon: ShoppingCart,
          //   variant: "ghost"
          // },
          // {
          //   title: "Settings",
          //   href: "/settings",
          //   icon: Settings,
          //   variant: "ghost"
          // },
          {
            title: "Post Blog",
            href: "/postblog",
            icon: ArrowRight,
            variant: "default"
          },
          {
            title: "Tours",
            href: "/tours",
            icon: Plane,
            variant: "ghost"
          },
          {
            title: "Post Tour",
            href: "/posttour",
            icon: BaggageClaim,
            variant: "ghost"
          },
          // {
          //   title: "Type Tour",
          //   href: "/typetour",
          //   icon: Backpack,
          //   variant: "ghost"
          // },
        ]}
      />
    </div>
  );
}
