import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { getDevIconClassName } from "@/lib/utils";

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
      <Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
        {content}
      </Link>
    );
  }
};

export default TagCard;
