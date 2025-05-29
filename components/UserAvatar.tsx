import Link from "next/link";

import ROUTES from "@/constants/routes";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
  id: string;
  name: string;
  imageUrl?: string;
  className?: string;
}

const UserAvatar = ({ id, name, imageUrl, className = "h-9 w-9" }: Props) => {
  const initials = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={className}>
        <AvatarImage
          src={imageUrl}
          alt={name}
          className="object-cover"
          width={36}
          height={36}
        />
        <AvatarFallback className="font-space-grotesk font-bold text-white tracking-wider primary-gradient">
          {initials}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
