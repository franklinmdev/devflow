"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";

import { globalSearch } from "@/lib/actions/search.action";
import { getSearchResultIcon, getSearchResultLink } from "@/lib/utils";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const GlobalSearch = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        startTransition(async () => {
          try {
            const result = await globalSearch({ query: searchQuery });
            const data = result instanceof Error ? [] : result.data || [];
            setResults(data);
            setIsOpen(true);
          } catch (error) {
            console.error("Search error:", error);
            setResults([]);
          }
        });
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleResultClick = (result: GlobalSearchResult) => {
    router.push(getSearchResultLink(result));
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleInputFocus = () => {
    if (searchQuery.trim() && results.length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    const currentTarget = e.currentTarget as HTMLElement;

    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      setTimeout(() => setIsOpen(false), 150);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-4 px-4 rounded-[10px] min-h-[56px] background-light800_darkgradient">
        <Image
          src="/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          style={{ width: "24px", height: "auto" }}
          className="cursor-pointer"
        />
        <Input
          type="search"
          placeholder="Search..."
          className="shadow-none border-none outline-none text-dark400_light700 paragraph-regular no-focus placeholder"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </div>

      {isOpen && (
        <div className="top-full right-0 left-0 z-10 absolute shadow-light100_darknone mt-1 border light-border rounded-[10px] max-h-[400px] overflow-y-auto background-light900_dark200">
          {isPending ? (
            <div className="p-4 text-dark400_light700 text-center">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <Button
                  key={`${result.type}-${result.id}-${index}`}
                  variant="ghost"
                  onClick={() => handleResultClick(result)}
                  onMouseDown={(e) => e.preventDefault()}
                  className="flex justify-start items-center gap-3 px-4 py-3 w-full h-auto text-left transition-colors cursor-pointer hover:background-light800_dark400 focus:background-light800_dark400"
                >
                  <Image
                    src={getSearchResultIcon(result.type)}
                    alt={result.type}
                    width={20}
                    height={20}
                    style={{ width: "20px", height: "auto" }}
                    className="flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-dark200_light800 truncate body-medium">
                      {result.title}
                    </p>
                    <p className="text-dark400_light700 capitalize small-regular">
                      {result.type}
                    </p>
                  </div>
                </Button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-dark400_light700 text-center">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
