import Link from "next/link";

import ROUTES from "@/constants/routes";

import UserAvatar from "../UserAvatar";

const UserCard = ({ _id, name, image, username }: User) => {
  console.log(image);
  return (
    <div className="shadow-light100_darknone w-full xs:w-[230px]">
      <article className="flex flex-col justify-center items-center p-8 border light-border rounded-2xl w-full background-light900_dark200">
        <UserAvatar
          id={_id}
          name={name}
          imageUrl={image}
          className="size-[100px]"
        />
        <Link href={ROUTES.PROFILE(_id)}>
          <div className="mt-4 text-center">
            <h3 className="text-dark200_light900 line-clamp-1 h3-bold">
              {name}
            </h3>
            <p className="mt-2 text-dark500_light500 body-regular">
              @{username}
            </p>
          </div>
        </Link>
      </article>
    </div>
  );
};

export default UserCard;
