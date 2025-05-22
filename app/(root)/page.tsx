import Link from "next/link";
import { select } from "radash";

import HomeFilter from "@/components/filters/home-filter";
import LocalSearch from "@/components/search/local-search";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const questions = [
  {
    id: 1,
    title: "What is the best way to learn React?",
    description: "I want to learn React and I'm not sure where to start.",
    tags: ["react", "javascript", "web development"],
    author: { id: 1, name: "John Doe" },
    upvotes: 10,
    views: 100,
    answers: 5,
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "How to use Next.js?",
    description: "I want to learn Next.js and I'm not sure where to start.",
    tags: ["next.js", "javascript", "web development"],
    author: { id: 2, name: "Jane Doe" },
    upvotes: 10,
    views: 100,
    answers: 5,
    createdAt: new Date(),
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
      (filter === "" || q.tags.includes(filter)) &&
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
          <h1 key={question.id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
};

export default Home;
