import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { cn, getDevIconClassName, getTechDescription } from "@/lib/utils";

import { Badge } from "../ui/badge";

interface TagCardProps {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  remove,
  isButton,
  handleRemove,
}: TagCardProps) => {
  const iconClass = getDevIconClassName(name);
  const iconDescription = getTechDescription(name);

  const content = (
    <>
      <Badge className="flex flex-row justify-between gap-2 px-4 py-2 border-none rounded-md text-light400_light500 uppercase subtle-medium background-light800_dark300">
        <div className="flex-center space-x-2">
          <i className={`${iconClass} text-sm`}></i>
          <span>{name}</span>
        </div>
        {remove && (
          <Image
            onClick={handleRemove}
            src="/icons/close.svg"
            alt="close"
            width={12}
            height={12}
            className="dark:invert invert-0 object-contain cursor-pointer"
          />
        )}
      </Badge>
      {showCount && (
        <p className="text-dark500_light700 small-medium">{questions}</p>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button type="button" className="flex justify-between gap-2">
        {content}
      </button>
    ) : (
      <Link href={ROUTES.TAG(_id)} className="flex justify-between gap-2">
        {content}
      </Link>
    );
  }

  return (
    <Link
      href={ROUTES.TAG(_id)}
      className="shadow-light100_darknone w-full sm:w-auto"
    >
      <article className="flex flex-col flex-shrink-0 px-8 py-10 border light-border rounded-2xl w-full sm:w-[260px] sm:min-w-[260px] sm:max-w-[260px] background-light900_dark200">
        <div className="flex justify-between items-center gap-3">
          <div className="px-5 py-1.5 rounded-sm w-fit background-light800_dark400">
            <p className="text-dark300_light900 paragraph-semibold">{name}</p>
          </div>
          <i className={cn(iconClass, "text-2xl")} aria-hidden="true"></i>
        </div>
        <p className="mt-5 w-full text-dark500_light700 line-clamp-3 small-regular">
          {iconDescription}
        </p>
        <p className="mt-3.5 text-dark400_light500 small-mediym">
          <span className="mr-2.5 primary-text-gradient body-semibold">
            {questions}+
          </span>
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
