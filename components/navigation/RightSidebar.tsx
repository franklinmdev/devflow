import Image from "next/image";
import Link from "next/link";

import ROUTES from "@/constants/routes";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getTopTags } from "@/lib/actions/tag.action";

import TagCard from "../cards/TagCard";
import DataRenderer from "../DataRenderer";

const RightSidebar = async () => {
  const [
    { success, data: hotQuestions, error },
    { success: topTagsSuccess, data: topTags, error: topTagsError },
  ] = await Promise.all([getHotQuestions(), getTopTags()]);

  return (
    <section className="max-xl:hidden top-0 right-0 sticky flex flex-col gap-6 shadow-light-300 dark:shadow-none p-6 pt-36 light-border border-l w-[350px] h-screen overflow-y-auto custom-scrollbar background-light900_dark200">
      <div>
        <h3 className="text-dark200_light900 h3-bold">Top Questions</h3>
        <DataRenderer
          success={success}
          error={error}
          empty={{
            title: "No questions found",
            message:
              "Be the first to break the silence! 🚀 Ask a question and kickstart the discussion. our wonders!",
          }}
          data={hotQuestions}
          render={(questions) => (
            <div className="flex flex-col gap-[30px] mt-7 w-full">
              {questions?.map(({ _id, title }) => (
                <Link
                  className="flex justify-between items-center gap-2 cursor-pointer"
                  href={ROUTES.QUESTION(_id.toString())}
                  key={_id}
                >
                  <p className="text-dark500_light700 line-clamp-2 body-medium">
                    {title}
                  </p>
                  <Image
                    src="/icons/chevron-right.svg"
                    alt="chevron-right"
                    width={20}
                    height={20}
                    className="invert-colors min-w-[20px] min-h-[20px]"
                  />
                </Link>
              ))}
            </div>
          )}
        />
      </div>
      <div className="mt-16">
        <h3 className="text-dark200_light900 h3-bold">Popular Tags</h3>
        <DataRenderer
          success={topTagsSuccess}
          error={topTagsError}
          empty={{
            title: "No tags found",
            message: "No tags found",
          }}
          data={topTags}
          render={(popularTags) => (
            <div className="flex flex-col gap-4 mt-7">
              {popularTags.map(({ _id, name, questions }) => (
                <TagCard
                  key={_id}
                  _id={_id}
                  name={name}
                  questions={questions || 0}
                  showCount
                  compact
                />
              ))}
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default RightSidebar;
