import JobCard from "@/components/cards/JobCard";
import DataRenderer from "@/components/DataRenderer";
import JobsLocationFilter from "@/components/filters/JobsLocationFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import { EMPTY_JOBS } from "@/constants/states";
import { getJobs } from "@/lib/actions/jobs.action";

export default async function Jobs({ searchParams }: RouteParams) {
  const params = await searchParams;
  const { query, location, page, pageSize } = params;

  const { success, data, error } = await getJobs({
    query: query || "",
    location: location || "all",
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
  });

  const { jobs, isNext } = data || {};

  return (
    <>
      <section className="flex sm:flex-row flex-col-reverse justify-between sm:items-center gap-4 w-full">
        <h1 className="text-dark100_light900 h1-bold">Jobs</h1>
      </section>
      <section className="flex max-sm:flex-col flex-wrap sm:items-center gap-5 mt-11">
        <div className="flex max-sm:flex-col flex-1 sm:items-center gap-5">
          <LocalSearch
            route={ROUTES.JOBS}
            placeholder="Job Title, Company, or Keywords"
            otherClasses="flex-1 min-w-[230px]"
          />
          <JobsLocationFilter />
        </div>
        {/* <Button className="px-4 py-3 lg:w-fit max-lg:w-full min-h-[46px] !text-light-900 cursor-pointer primary-gradient">
          Find Jobs
        </Button> */}
      </section>
      <DataRenderer
        success={success}
        error={error}
        data={jobs}
        empty={EMPTY_JOBS}
        render={(jobs) => (
          <div className="flex flex-col gap-6 mt-10 w-full">
            {jobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>
        )}
      />
      <Pagination page={page} isNext={isNext || false} />
    </>
  );
}
