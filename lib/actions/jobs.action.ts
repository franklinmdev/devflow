"use server";

import { cache } from "react";

import handleError from "../handlers/error";
import { RequestError } from "../http-errors";
import logger from "../logger";

interface JSearchJob {
  job_id?: string;
  job_title?: string;
  employer_logo?: string;
  employer_name?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
  job_location?: string;
  job_apply_link?: string;
  job_employment_type?: string;
  job_min_salary?: number;
  job_max_salary?: number;
  job_description?: string;
  job_highlights?: {
    Qualifications?: string[];
  };
  job_posted_at_datetime_utc?: string;
}

export const getJobs = cache(async function getJobs(
  params: GetJobsParams
): Promise<ActionResponse<{ jobs: Job[]; isNext: boolean }> | ErrorResponse> {
  try {
    const { query = "", location = "", page = 1, pageSize = 10 } = params;

    const rapidApiKey = process.env.RAPIDAPI_KEY;
    const rapidApiHost = process.env.RAPIDAPI_HOST || "jsearch.p.rapidapi.com";

    if (!rapidApiKey) {
      logger.error("RAPIDAPI_KEY environment variable is not set");
      throw new RequestError(500, "API configuration error");
    }

    const jsearchUrl = new URL(`https://${rapidApiHost}/search`);
    jsearchUrl.searchParams.set("query", query || "developer");
    jsearchUrl.searchParams.set("page", page.toString());
    jsearchUrl.searchParams.set("num_pages", "1");

    if (location && location !== "all") {
      jsearchUrl.searchParams.set("country", location);
    }

    logger.info(`Fetching jobs from JSearch API: ${jsearchUrl.toString()}`);

    const response = await fetch(jsearchUrl.toString(), {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": rapidApiHost,
        "User-Agent": "dev-overflow/1.0",
      },
      cache: "no-store",
    });

    if (response.status === 429) {
      logger.warn("Rate limited by JSearch API");
      throw new RequestError(429, "Too many requests. Please try again later.");
    }

    if (response.status === 401) {
      logger.error("Invalid RapidAPI key");
      throw new RequestError(401, "Invalid API key configuration");
    }

    if (!response.ok) {
      logger.error(
        `JSearch API returned ${response.status}: ${response.statusText}`
      );
      throw new RequestError(
        response.status,
        `Jobs service error: ${response.statusText}`
      );
    }

    const apiData = await response.json();
    logger.info(`JSearch API response status: ${apiData.status}`);

    if (apiData.status !== "OK") {
      logger.error("JSearch API returned error:", apiData);
      throw new RequestError(500, "Jobs service returned an error");
    }

    const jobs = apiData.data || [];

    const transformedJobs: Job[] = jobs.map(
      (job: JSearchJob): Job => ({
        job_id: job.job_id || "",
        job_title: job.job_title || "",
        employer_logo: job.employer_logo || "",
        employer_name: job.employer_name || "",
        job_location:
          [job.job_city, job.job_state, job.job_country]
            .filter(Boolean)
            .join(", ") ||
          job.job_location ||
          "",
        job_country: job.job_country || "",
        job_apply_link: job.job_apply_link || "",
        job_employment_type_text: job.job_employment_type || "",
        job_min_salary: job.job_min_salary ? job.job_min_salary.toString() : "",
        job_max_salary: job.job_max_salary ? job.job_max_salary.toString() : "",
        job_description: job.job_description || "",
        job_highlights: {
          Qualifications: job.job_highlights?.Qualifications || [],
        },
        job_posted_at_datetime_utc: job.job_posted_at_datetime_utc || "",
      })
    );

    const totalJobs = transformedJobs.length;
    const totalPages = Math.ceil(totalJobs / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedJobs = transformedJobs.slice(startIndex, endIndex);
    const isNext = page < totalPages;

    logger.info(
      `Successfully transformed ${transformedJobs.length} jobs, returning page ${page} (${paginatedJobs.length} jobs)`
    );

    return {
      success: true,
      data: {
        jobs: paginatedJobs,
        isNext,
      },
      status: 200,
    };
  } catch (error) {
    logger.error("Jobs server action error:", error);
    return handleError(error) as ErrorResponse;
  }
});
