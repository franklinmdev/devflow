import dayjs from "dayjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import TagCard from "@/components/cards/TagCard";
import Preview from "@/components/editor/Preview";
import Metric from "@/components/Metric";
import UserAvatar from "@/components/UserAvatar";
import ROUTES from "@/constants/routes";
import { getQuestion } from "@/lib/actions/question.action";
import { formatNumber } from "@/lib/utils";

const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const { success, data: question } = await getQuestion({ questionId: id });

  if (!success || !question) return redirect("/404");

  const { author, createdAt, answers, views, tags, title, content } = question;

  return (
    <React.Fragment>
      <div className="flex-col flex-start w-full">
        <div className="flex flex-col-reverse justify-between w-full">
          <div className="flex justify-start items-center gap-1">
            <UserAvatar
              id={author._id}
              name={author.name}
              imageUrl={author.image}
              className="size-[22px]"
              fallbackClassName="text-[10px]"
            />
            <Link href={ROUTES.PROFILE(author._id)}>
              <p className="text-dark300_light700 paragraph-semibold">
                {author.name}
              </p>
            </Link>
          </div>
          <div className="flex justify-end">
            <p>Votes</p>
          </div>
        </div>
        <h2 className="mt-3.5 w-full text-dark200_light900 h2-semibold">
          {title}
        </h2>
      </div>
      <div className="flex flex-wrap gap-4 mt-5 mb-8">
        <Metric
          imgUrl="/icons/clock.svg"
          alt="clock icon"
          value={` asked ${dayjs(createdAt).fromNow()}`}
          textStyles="small-regular text-dark-400_light700"
        />
        <Metric
          imgUrl="/icons/message.svg"
          alt="message icon"
          value={answers}
          textStyles="small-regular text-dark-400_light700"
        />
        <Metric
          imgUrl="/icons/eye.svg"
          alt="eye icon"
          value={formatNumber(views)}
          textStyles="small-regular text-dark-400_light700"
        />
      </div>
      <Preview content={content} />
      <div className="flex flex-wrap gap-2 mt-8">
        {tags.map((tag: Tag) => (
          <TagCard key={tag._id} _id={tag._id} name={tag.name} compact />
        ))}
      </div>
    </React.Fragment>
  );
};

export default QuestionDetails;
