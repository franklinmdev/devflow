"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const HomeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const [active, setActive] = React.useState(filterParams || "");

  const filters = [
    { name: "React", value: "react" },
    { name: "Next.js", value: "next.js" },
    { name: "Node.js", value: "nodejs" },
    { name: "Typescript", value: "typescript" },
  ];

  const handleTypeClick = (filter: string) => {
    let newUrl = "";

    if (filter === active) {
      setActive("");

      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      setActive(filter);

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="hidden sm:flex flex-wrap gap-3 mt-10">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          className={cn(
            "shadow-none px-6 py-3 rounded-lg capitalize body-medium cursor-pointer",
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-500 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          )}
          onClick={() => handleTypeClick(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
