"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { formUrlQuery } from "@/lib/url";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const locationFilters = [
  { name: "United States", value: "united-states" },
  { name: "Canada", value: "canada" },
  { name: "United Kingdom", value: "united-kingdom" },
  { name: "Australia", value: "australia" },
  { name: "India", value: "india" },
  { name: "All", value: "all" },
];

const JobsLocationFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramsLocation = searchParams.get("location");

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "location",
      value,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="relative flex-1">
      <Select
        onValueChange={handleUpdateParams}
        defaultValue={paramsLocation || undefined}
      >
        <SelectTrigger
          className="flex items-center gap-4 px-4 rounded-[10px] w-full min-h-[56px] background-light800_darkgradient grow"
          aria-label="Filter options"
        >
          <div className="flex-1 text-dark400_light700 text-left line-clamp-1 paragraph-regular placeholder">
            <SelectValue placeholder="Select location" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {locationFilters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default JobsLocationFilter;
