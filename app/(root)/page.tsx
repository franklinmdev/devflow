import Link from "next/link";
import { select } from "radash";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const questions = [
  {
    _id: "1",
    title: "What is the best way to learn React?",
    tags: [
      { _id: "1", name: "react" },
      { _id: "2", name: "javascript" },
      { _id: "3", name: "web development" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    upvotes: 10,
    views: 100,
    answers: 5,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "How to use Next.js?",
    tags: [
      { _id: "1", name: "next.js" },
      { _id: "2", name: "javascript" },
      { _id: "3", name: "web development" },
    ],
    author: {
      _id: "2",
      name: "Jane Doe",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    upvotes: 10,
    views: 100,
    answers: 5,
    createdAt: new Date("2025-05-22"),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = select(
    questions,
    (q) => q,
    (q) =>
      (filter === "" || q.tags.some((tag) => tag.name === filter)) &&
      q.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <section className="flex sm:flex-row flex-col-reverse justify-between sm:items-center gap-4 w-full">
        <h1 className="text-dark100_light900 h1-bold">All Questions</h1>
        <Button
          className="px-4 py-3 min-h-[46px] !text-light-900 primary-gradient"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search for questions here..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="flex flex-col gap-6 mt-10 w-full">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
