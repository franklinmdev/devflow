import Image from "next/image";
import Link from "next/link";

import Metric from "../Metric";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface Props {
  job: Job;
}

const LocationBadge = ({ location }: { location: string }) => {
  return (
    <div className="hidden md:flex max-sm:justify-center items-center gap-2 py-1.5 pr-2.5 pl-2 border-none rounded-full max-sm:w-full text-light400_light500 uppercase subtle-medium background-light800_dark300">
      <Image
        src="/icons/au.svg"
        alt="Job location in Australia"
        width={16}
        height={16}
        className="flex-shrink-0 object-contain"
      />
      <span className="hidden md:block text-dark100_light900 whitespace-nowrap small-medium">
        {location}
      </span>
    </div>
  );
};

const JobCard = ({ job }: Props) => {
  const formatSalary = () => {
    if (job.job_min_salary && job.job_max_salary) {
      return `${job.job_min_salary} - ${job.job_max_salary}`;
    }
    return "--";
  };

  return (
    <article className="p-6 sm:p-8 sm:px-11 rounded-[10px] card-wrapper">
      <div className="flex items-start gap-5">
        {/* Company Logo */}
        <Image
          src={job.employer_logo}
          alt={job.employer_name}
          width={64}
          height={64}
          className="hidden md:block rounded-lg object-contain"
        />
        <div className="w-full">
          <div className="flex justify-between items-start gap-5 w-full">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h3 className="text-dark-200_light900 line-clamp-1 h3-semibold">
                  {job.job_title}
                </h3>
                <Badge className="px-4 py-2 border-none rounded-md text-light400_light500 uppercase subtle-medium background-light800_dark300">
                  SOFTWARE
                </Badge>
              </div>
              <p className="mb-5 text-dark-400_light700 line-clamp-2 body-regular">
                {job.job_description}
              </p>
            </div>
            <LocationBadge location={job.job_location} />
          </div>
          <div className="flex xs:flex-row flex-col flex-between xs:gap-5">
            <div className="flex items-center gap-3 sm:gap-4">
              <Metric
                imgUrl="/icons/clock.svg"
                alt="Employment type"
                value={job.job_employment_type_text}
                imgStyles="shrink-0"
                textStyles="small-medium text-light-500 whitespace-nowrap"
              />
              <Metric
                imgUrl="/icons/currency-dollar-circle.svg"
                alt="Salary range"
                value={formatSalary()}
                imgStyles="shrink-0"
                textStyles="small-medium text-light-500 whitespace-nowrap"
              />
            </div>
            <Button className="w-fit" asChild variant="link">
              <Link
                target="_blank"
                rel="noreferrer"
                href={job.job_apply_link}
                className="flex-center gap-2 !no-underline"
              >
                <span className="primary-text-gradient">View job</span>
                <Image
                  src="/icons/arrow-up-right.svg"
                  alt="External link icon"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
