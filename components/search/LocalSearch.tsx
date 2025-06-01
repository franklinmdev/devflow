"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

import { Input } from "../ui/input";

interface LocalSearchProps {
  route: string;
  imgSrc?: string;
  placeholder?: string;
  otherClasses?: string;
  iconPosition?: "left" | "right";
}

const LocalSearch = ({
  route,
  imgSrc = "/icons/search.svg",
  placeholder = "Search here...",
  otherClasses,
  iconPosition = "left",
}: LocalSearchProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = React.useState(query);

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [pathname, query, router, route, searchParams, searchQuery]);

  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 rounded-[10px] min-h-[56px] background-light800_darkgradient grow",
        otherClasses
      )}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="search"
        placeholder={placeholder}
        className="shadow-none border-none outline-none text-dark400_light700 paragraph-regular no-focus placeholder"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
