"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { formUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

interface PaginationProps {
  page?: number | string;
  isNext: boolean;
  containerClasses?: string;
}

const Pagination = ({
  page = 1,
  isNext,
  containerClasses,
}: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleNavigation = (direction: "prev" | "next") => {
    const nextPageNumber =
      direction === "prev" ? Number(page) - 1 : Number(page) + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center gap-2 mt-5",
        containerClasses
      )}
    >
      {Number(page) > 1 && (
        <Button
          onClick={() => handleNavigation("prev")}
          className="flex justify-center items-center gap-2 border light-border-2 min-h-[36px] cursor-pointer btn"
        >
          <p className="text-dark200_light800 body-medium">Prev</p>
        </Button>
      )}
      <div className="flex justify-center items-center bg-primary-500 px-3.5 py-2 rounded-md">
        <p className="text-light-900 body-semibold">{page}</p>
      </div>
      {isNext && (
        <Button
          onClick={() => handleNavigation("next")}
          className="flex justify-center items-center gap-2 border light-border-2 min-h-[36px] cursor-pointer btn"
        >
          <p className="text-dark200_light800 body-medium">Next</p>
        </Button>
      )}
    </div>
  );
};

export default Pagination;
