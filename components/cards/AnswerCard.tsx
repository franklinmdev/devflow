import dayjs from "dayjs";
import Link from "next/link";

import ROUTES from "@/constants/routes";

import Preview from "../editor/Preview";
import UserAvatar from "../UserAvatar";

const AnswerCard = ({ _id, author, content, createdAt }: Answer) => {
  return (
    <article className="py-10 light-border border-b">
      <span id={JSON.stringify(_id)} className="hash-span" />
      <div className="flex sm:flex-row flex-col-reverse justify-between sm:items-center gap-5 sm:gap-2 mb-5">
        <div className="flex justify-start items-center gap-2">
          <div className="flex flex-1 items-start sm:items-center gap-1">
            <UserAvatar
              id={author._id}
              name={author.name}
              imageUrl={author.image}
              className="max-sm:mt-2 rounded-full size-5 object-cover"
            />
            <Link
              href={ROUTES.PROFILE(author._id)}
              className="flex sm:flex-row flex-col sm:items-center ml-1 max-sm:ml-1.5"
            >
              <p className="text-dark-300_light700 body-semibold">
                {author.name}
              </p>
              <p className="mt-0.5 ml-0.5 text-dark-400_light500 line-clamp-1 small-regular">
                <span className="max-sm:hidden"> • </span>
                answered {dayjs(createdAt).fromNow()}
              </p>
            </Link>
          </div>
          <div className="flex justify-end">Votes</div>
        </div>
      </div>
      <Preview content={content} />
    </article>
  );
};

export default AnswerCard;
