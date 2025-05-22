import Image from "next/image";
import Link from "next/link";

import ROUTES from "@/constants/routes";

import TagCard from "../cards/tag-card";

const topQuestions = [
  {
    id: "1",
    title: "What is the best way to learn React?",
  },
  {
    id: "2",
    title: "How to use Tailwind CSS?",
  },
  {
    id: "3",
    title: "What is the best way to learn Next.js?",
  },
];

const popularTags = [
  {
    id: "1",
    name: "React",
    questions: 10,
  },
  {
    id: "2",
    name: "Next.js",
    questions: 10,
  },
  {
    id: "3",
    name: "Tailwind CSS",
    questions: 10,
  },
  {
    id: "4",
    name: "JavaScript",
    questions: 10,
  },
  {
    id: "5",
    name: "TypeScript",
    questions: 10,
  },
];

const RightSidebar = () => {
  return (
    <section className="max-xl:hidden top-0 right-0 sticky flex flex-col gap-6 shadow-light-300 dark:shadow-none p-6 pt-36 light-border border-l w-[350px] h-screen overflow-y-auto custom-scrollbar background-light900_dark200">
      <div>
        <h3 className="text-dark200_light900 h3-bold">Top Questions</h3>
        <div className="flex flex-col gap-[30px] mt-7 w-full">
          {topQuestions.map(({ id, title }) => (
            <Link
              className="flex justify-between items-center gap-2 cursor-pointer"
              href={ROUTES.QUESTION(id.toString())}
              key={id}
            >
              <p className="text-dark500_light700 body-medium">{title}</p>
              <Image
                src="/icons/chevron-right.svg"
                alt="chevron-right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-dark200_light900 h3-bold">Popular Tags</h3>
        <div className="flex flex-col gap-4 mt-7">
          {popularTags.map(({ id, name, questions }) => (
            <TagCard
              key={id}
              id={id}
              name={name}
              questions={questions}
              showCount
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
