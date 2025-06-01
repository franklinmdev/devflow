import dayjs from "dayjs";
import Link from "next/link";

import ROUTES from "@/constants/routes";

import TagCard from "./TagCard";
import Metric from "../Metric";

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({
  question: { _id, tags, title, author, upvotes, views, answers, createdAt },
}: QuestionCardProps) => {
  return (
    <div className="p-9 sm:px-11 rounded-[10px] card-wrapper">
      <div className="flex sm:flex-row flex-col-reverse justify-between items-start gap-5">
        <div>
          <span className="sm:hidden flex text-dark-400_light800 line-clamp-1 subtle-regular">
            {dayjs(createdAt).fromNow()}
          </span>
          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className="flex-1 text-dark-200_light900 line-clamp-1 sm:h3-semibold base-semibold">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-3.5 w-full">
        {tags.map((tag: Tag) => (
          <TagCard key={tag._id} _id={tag._id} name={tag.name} compact />
        ))}
      </div>
      <div className="flex-wrap flex-between gap-3 mt-6 w-full">
        <Metric
          imgUrl={author.image ?? "/icons/avatar.svg"}
          alt={author.name ?? "author"}
          value={author.name}
          title={` • asked ${dayjs(createdAt).fromNow()}`}
          href={ROUTES.PROFILE(author._id)}
          textStyles="body-medium text-dark-400_light700"
          isAuthor
        />
        <div className="flex max-sm:flex-wrap max-sm:justify-start items-center gap-3">
          <Metric
            imgUrl="/icons/like.svg"
            alt="like"
            value={upvotes}
            title=" Votes"
            textStyles="small-medium text-dark-400_light800"
            isAuthor
          />
          <Metric
            imgUrl="/icons/message.svg"
            alt="answer"
            value={answers}
            title=" Answers"
            textStyles="small-medium text-dark-400_light800"
            isAuthor
          />
          <Metric
            imgUrl="/icons/eye.svg"
            alt="views"
            value={views}
            title=" Views"
            textStyles="small-medium text-dark-400_light800"
            isAuthor
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
