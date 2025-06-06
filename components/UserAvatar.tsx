import Link from "next/link";

import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
  id: string;
  name: string;
  imageUrl?: string;
  className?: string;
  fallbackClassName?: string;
}

const UserAvatar = ({
  id,
  name,
  imageUrl,
  className = "h-9 w-9",
  fallbackClassName,
}: Props) => {
  const initials = name
    ?.split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={cn("relative", className)}>
        <AvatarImage
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <AvatarFallback
          className={cn(
            "font-space-grotesk font-bold text-white tracking-wider primary-gradient",
            fallbackClassName
          )}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
