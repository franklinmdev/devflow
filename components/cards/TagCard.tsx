import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { getDevIconClassName } from "@/lib/utils";

import { Badge } from "../ui/badge";

interface Props {
  id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TagCard = ({ id, name, questions, showCount, compact }: Props) => {
  const iconClass = getDevIconClassName(name);

  return (
    <Link href={ROUTES.TAGS(id)} className="flex justify-between gap-2">
      <Badge className="px-4 py-2 border-none rounded-md text-light400_light500 uppercase subtle-medium background-light800_dark300">
        <div className="flex-center space-x-2">
          <i className={`${iconClass} text-sm`}></i>
          <span>{name}</span>
        </div>
      </Badge>

      {showCount && (
        <p className="text-dark500_light700 small-medium">{questions}</p>
      )}
    </Link>
  );
};

export default TagCard;
