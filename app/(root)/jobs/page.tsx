import JobCard from "@/components/cards/JobCard";
import DataRenderer from "@/components/DataRenderer";
import JobsLocationFilter from "@/components/filters/JobsLocationFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { DEFAULT_ERROR, EMPTY_JOBS } from "@/constants/states";

const jobs = [
  {
    job_id: "1",
    employer_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQYoo7Keio8qsOsEA4YelR08GaHWug8MGWcCB-&s=0",
    job_title: "Principal Salesforce Developer",
    employer_name: "Atlassian",
    job_location: "Melbourne, AU",
    job_country: "AU",
    job_apply_link:
      "https://careers.united.com/us/en/job/WHQ00024224/Software-Developer?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
    job_employment_type_text: "Full-time",
    job_min_salary: "80k",
    job_max_salary: "100k",
    job_description:
      "Atlassian Company Join Atlassian and reimagine the communications and technologies that connect the world.",
    job_highlights: {
      Qualifications: ["Salesforce", "Development", "Principal"],
    },
    job_posted_at_datetime_utc: "2024-01-15T00:00:00.000Z",
  },
  {
    job_id: "2",
    job_title: "C++ Software Developer",
    employer_name: "TechCorp",
    job_location: "Melbourne, AU",
    job_country: "AU",
    job_apply_link:
      "https://careers.united.com/us/en/job/WHQ00024224/Software-Developer?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
    job_employment_type_text: "Full-time",
    employer_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQYoo7Keio8qsOsEA4YelR08GaHWug8MGWcCB-&s=0",
    job_min_salary: "70k",
    job_max_salary: "90k",
    job_description:
      "We're looking for a mid-level UX designer to join our team.",
    job_highlights: {
      Qualifications: ["C++", "Software", "Development"],
    },
    job_posted_at_datetime_utc: "2024-01-12T00:00:00.000Z",
  },
  {
    job_id: "3",
    job_title: "Application Developer III",
    employer_name: "DRW",
    job_location: "Melbourne, AU",
    job_country: "AU",
    job_apply_link:
      "https://careers.united.com/us/en/job/WHQ00024224/Software-Developer?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
    job_employment_type_text: "Full-time",
    employer_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQYoo7Keio8qsOsEA4YelR08GaHWug8MGWcCB-&s=0",
    job_min_salary: "85k",
    job_max_salary: "105k",
    job_description:
      "Atlassian Company Join Atlassian and reimagine the communications and technologies that connect the world.",
    job_highlights: {
      Qualifications: ["Application Development", "Senior Level"],
    },
    job_posted_at_datetime_utc: "2024-01-10T00:00:00.000Z",
  },
  {
    job_id: "4",
    job_title: "Staff Developer Advocate",
    employer_name: "Microsoft",
    job_location: "Melbourne, AU",
    job_country: "AU",
    job_apply_link:
      "https://careers.united.com/us/en/job/WHQ00024224/Software-Developer?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
    job_employment_type_text: "Full-time",
    employer_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQYoo7Keio8qsOsEA4YelR08GaHWug8MGWcCB-&s=0",
    job_min_salary: "90k",
    job_max_salary: "120k",
    job_description:
      "We're looking for an experienced frontend developer to join our team.",
    job_highlights: {
      Qualifications: ["Developer Relations", "Advocacy", "Staff"],
    },
    job_posted_at_datetime_utc: "2024-01-08T00:00:00.000Z",
  },
];

export default function Jobs() {
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
        <Button className="px-4 py-3 lg:w-fit max-lg:w-full min-h-[46px] !text-light-900 cursor-pointer primary-gradient">
          Find Jobs
        </Button>
      </section>
      <DataRenderer
        success={true}
        error={DEFAULT_ERROR} // TODO: Add error handling
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
    </>
  );
}
