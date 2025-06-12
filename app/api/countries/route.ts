import { NextResponse } from "next/server";

import handleError from "@/lib/handlers/error";
import { RequestError } from "@/lib/http-errors";
import logger from "@/lib/logger";

export async function GET() {
  try {
    const apiUrl = "https://restcountries.com/v3.1/all?fields=name,cca2";

    logger.info(`Fetching countries from: ${apiUrl}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(apiUrl, {
      cache: "force-cache",
      next: { revalidate: 86400 },
      headers: {
        "User-Agent": "dev-overflow/1.0",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      logger.error(
        `REST Countries API returned ${response.status}: ${response.statusText}`
      );
      throw new RequestError(
        response.status,
        `Countries service error: ${response.statusText}`
      );
    }

    const data = await response.json();
    logger.info(`Successfully fetched ${data.length} countries`);

    const transformedData = data
      .map((country: { name: { common: string }; cca2: string }) => ({
        name: country.name.common,
        value: country.cca2,
      }))
      .sort((a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name)
      );

    const locationFilters = [{ name: "All", value: "all" }, ...transformedData];

    return NextResponse.json({ success: true, data: locationFilters });
  } catch (error) {
    logger.error("Countries API error:", error);
    return handleError(error, "api") as Response;
  }
}
