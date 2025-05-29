"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  isMobileNav?: boolean;
  userId?: string;
}

const NavLinks = ({ isMobileNav = false, userId }: NavLinksProps) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map((link) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;

        let dynamicRoute = link.route;
        if (link.route === "/profile") {
          if (userId) {
            dynamicRoute = `${link.route}/${userId}`;
          } else {
            return null;
          }
        }

        const LinkComponent = (
          <Link
            href={dynamicRoute}
            key={link.label}
            className={cn(
              "flex justify-start items-center gap-4 bg-transparent p-4",
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900"
            )}
          >
            <Image
              className={cn({ "invert-colors": !isActive })}
              src={link.imgURL}
              alt={link.label}
              width={20}
              height={20}
              style={{ width: 20, height: 20 }}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {link.label}
            </p>
          </Link>
        );
        return isMobileNav ? (
          <SheetClose asChild key={dynamicRoute}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={dynamicRoute}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
