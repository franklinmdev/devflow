import Image from "next/image";

import { formatNumber } from "@/lib/utils";

interface StatsProps {
  totalQuestions: number;
  totalAnswers: number;
  badges: BadgeCounts;
  reputationPoints: number;
}

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, value, title }: StatsCardProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 shadow-light-300 dark:shadow-dark-200 p-6 border light-border rounded-md background-light900_dark300">
      <Image src={imgUrl} alt={title} width={40} height={50} />
      <div>
        <p className="text-dark200_light900 paragraph-semibold">
          {formatNumber(value)}
        </p>
        <p className="text-dark400_light700 body-medium">{title}</p>
      </div>
    </div>
  );
};

const Stats = ({
  totalQuestions,
  totalAnswers,
  badges,
  reputationPoints,
}: StatsProps) => {
  return (
    <div className="mt-3">
      <h4 className="text-dark200_light900 h3-semibold">
        Stats{" "}
        <span className="primary-text-gradient small-semibold">
          {formatNumber(reputationPoints)}
        </span>
      </h4>
      <div className="gap-5 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 mt-5">
        <div className="flex flex-wrap justify-evenly items-center gap-4 shadow-light-300 dark:shadow-dark-200 p-6 border light-border rounded-md background-light900_dark300">
          <div>
            <p className="text-dark200_light900 paragraph-semibold">
              {formatNumber(totalQuestions)}
            </p>
            <p className="text-dark400_light900 body-medium">Questions</p>
          </div>
          <div>
            <p className="text-dark200_light900 paragraph-semibold">
              {formatNumber(totalAnswers)}
            </p>
            <p className="text-dark400_light900 body-medium">Answers</p>
          </div>
        </div>
        <StatsCard
          imgUrl="/icons/gold-medal.svg"
          value={badges.GOLD}
          title="Gold Badges"
        />
        <StatsCard
          imgUrl="/icons/silver-medal.svg"
          value={badges.SILVER}
          title="Silver Badges"
        />
        <StatsCard
          imgUrl="/icons/bronze-medal.svg"
          value={badges.BRONZE}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};

export default Stats;
