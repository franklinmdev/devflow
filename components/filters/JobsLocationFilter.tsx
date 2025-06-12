"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

import { api } from "@/lib/api";
import { formUrlQuery } from "@/lib/url";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const JobsLocationFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [locationFilters, setLocationFilters] = useState<
    { name: string; value: string }[]
  >([{ name: "All", value: "all" }]);
  const [hasAttemptedLocationFetch, setHasAttemptedLocationFetch] =
    useState(false);

  const paramsLocation = searchParams.get("location");
  const selectValue = paramsLocation || "all";

  const routerPush = useCallback(
    (url: string) => router.push(url, { scroll: false }),
    [router]
  );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const result = await api.location.getCountries();
        if (result.success && result.data) {
          setLocationFilters(result.data);
        }
      } catch (error) {
        console.error("Countries fetch error:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (paramsLocation || hasAttemptedLocationFetch) return;

    const fetchLocation = async () => {
      try {
        const result = await api.location.getUserLocation();
        if (result.success && result.data) {
          const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: "location",
            value: result.data.countryCode || "all",
          });
          routerPush(newUrl);
        }
      } catch (error) {
        console.error("Location fetch error:", error);
      } finally {
        setHasAttemptedLocationFetch(true);
      }
    };

    fetchLocation();
  }, [paramsLocation, hasAttemptedLocationFetch, searchParams, routerPush]);

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
      <Select onValueChange={handleUpdateParams} value={selectValue}>
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
