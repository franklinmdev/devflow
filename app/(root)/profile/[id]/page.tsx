import dayjs from "dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import AnswerCard from "@/components/cards/AnswerCard";
import QuestionCard from "@/components/cards/QuestionCard";
import TagCard from "@/components/cards/TagCard";
import DataRenderer from "@/components/DataRenderer";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileLink from "@/components/user/ProfileLink";
import Stats from "@/components/user/Stats";
import UserAvatar from "@/components/UserAvatar";
import ROUTES from "@/constants/routes";
import { EMPTY_ANSWERS, EMPTY_QUESTION, EMPTY_TAGS } from "@/constants/states";
import {
  getUser,
  getUserAnswers,
  getUserQuestions,
  getUserTopTags,
} from "@/lib/actions/user.action";

export default async function Profile({ params, searchParams }: RouteParams) {
  const { id } = await params;
  const { page = 1, pageSize = 10 } = await searchParams;

  if (!id) return notFound();

  const loggedInUser = await auth();
  const { success, data, error } = await getUser({ userId: id });

  if (!success)
    return (
      <div>
        <h1 className="text-dark100_light900 h1-bold">{error?.message}</h1>
      </div>
    );

  const {
    user: { _id, name, image, username, bio, location, portfolio, createdAt },
    totalQuestions,
    totalAnswers,
  } = data!;

  const {
    success: userQuestionsSuccess,
    data: userQuestions,
    error: userQuestionsError,
  } = await getUserQuestions({
    userId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
  });

  const { questions, isNext: hasMoreQuestions } = userQuestions!;

  const {
    success: userAnswersSuccess,
    data: userAnswers,
    error: userAnswersError,
  } = await getUserAnswers({
    userId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
  });

  const { answers, isNext: hasMoreAnswers } = userAnswers!;

  const {
    success: userTopTagsSuccess,
    data: userTopTags,
    error: userTopTagsError,
  } = await getUserTopTags({
    userId: id,
  });

  const { tags } = userTopTags!;

  return (
    <>
      <section className="flex sm:flex-row flex-col-reverse justify-between items-start">
        <div className="flex lg:flex-row flex-col items-start gap-4">
          <UserAvatar
            id={_id}
            name={name}
            imageUrl={image}
            className="rounded-full size-[140px] object-cover"
            fallbackClassName="text-6xl fond-bolder"
          />
          <div className="mt-3">
            <h2 className="text-dark100_light900 h2-bold">{name}</h2>
            <p className="text-dark200_light800 paragraph-regular">
              @{username}
            </p>
            <div className="flex flex-wrap items-center gap-5 mt-5 justiy-start">
              {portfolio && (
                <ProfileLink
                  imgUrl="/icons/link.svg"
                  href={portfolio}
                  title="Portfolio"
                />
              )}
              {location && (
                <ProfileLink imgUrl="/icons/location.svg" title="Location" />
              )}
              <ProfileLink
                imgUrl="/icons/calendar.svg"
                title={dayjs(createdAt).format("MMMM YYYY")}
              />
            </div>
            {bio && (
              <p className="mt-8 text-dark400_light800 paragraph-regular">
                {bio}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end sm:mt-3 max-sm:mb-5 max-sm:w-full">
          {loggedInUser?.user?.id === _id && (
            <Link href={ROUTES.EDIT_PROFILE}>
              <Button className="px-4 py-3 min-w-44 min-h-12 text-dark300_light900 paragraph-medium btn-secondary">
                Edit Profile
              </Button>
            </Link>
          )}
        </div>
      </section>
      <Stats
        totalQuestions={totalQuestions}
        totalAnswers={totalAnswers}
        badges={{
          GOLD: 0,
          SILVER: 0,
          BRONZE: 0,
        }}
      />
      <section className="flex gap-10 mt-10">
        <Tabs defaultValue="top-posts" className="flex-[2]">
          <TabsList className="p-1 min-h-[42px] background-light800_dark400">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="top-posts"
            className="flex flex-col gap-6 mt-5 w-full"
          >
            <DataRenderer
              success={userQuestionsSuccess}
              error={userQuestionsError}
              empty={EMPTY_QUESTION}
              data={questions}
              render={(questions) => (
                <div className="flex flex-col gap-6 w-full">
                  {questions.map((question) => (
                    <QuestionCard key={question._id} question={question} />
                  ))}
                </div>
              )}
            />
            <Pagination
              page={Number(page)}
              isNext={hasMoreQuestions || false}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex flex-col gap-6 w-full">
            <DataRenderer
              success={userAnswersSuccess}
              error={userAnswersError}
              empty={EMPTY_ANSWERS}
              data={answers}
              render={(answers) => (
                <div className="flex flex-col gap-6 w-full">
                  {answers.map((answer) => (
                    <AnswerCard
                      key={answer._id}
                      {...answer}
                      content={answer.content.slice(0, 150)}
                      containerClasses="card-wrapper rounded-[10px] px-7 py-9 sm:px-11"
                      showReadMore
                    />
                  ))}
                </div>
              )}
            />
            <Pagination page={Number(page)} isNext={hasMoreAnswers || false} />
          </TabsContent>
        </Tabs>

        <div className="max-lg:hidden flex flex-col flex-1 w-full min-w-[250px]">
          <h3 className="text-dark200_light900 h3-bold">Top Tech</h3>
          <div className="flex flex-col gap-4 mt-7">
            <DataRenderer
              success={userTopTagsSuccess}
              error={userTopTagsError}
              empty={EMPTY_TAGS}
              data={tags}
              render={(tags) => (
                <div className="flex flex-col gap-4 mt-4">
                  {tags.map((tag) => (
                    <TagCard
                      key={tag._id}
                      _id={tag._id}
                      name={tag.name}
                      questions={tag.questions}
                      showCount
                      compact
                    />
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      </section>
    </>
  );
}
