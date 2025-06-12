import { NextResponse } from "next/server";

import handleError from "@/lib/handlers/error";
import { RequestError } from "@/lib/http-errors";
import logger from "@/lib/logger";

export async function GET() {
  try {
    const apiUrl = `http://ip-api.com/json/?fields=status,country,countryCode`;

    logger.info(`Fetching location from: ${apiUrl}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(apiUrl, {
      cache: "no-store",
      headers: {
        "User-Agent": "dev-overflow/1.0",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle rate limiting (HTTP 429) as per ip-api documentation
    if (response.status === 429) {
      logger.warn("Rate limited by ip-api.com");
      throw new RequestError(
        429,
        "Rate limited by geolocation service. Try again later."
      );
    }

    if (!response.ok) {
      logger.error(
        `ip-api.com returned ${response.status}: ${response.statusText}`
      );
      throw new RequestError(
        response.status,
        `Geolocation service error: ${response.statusText}`
      );
    }

    const data = await response.json();
    logger.info(`ip-api.com response:`, data);

    // Handle different failure statuses as per ip-api documentation
    if (data.status === "fail") {
      const errorMessage = data.message || "Invalid IP address or request";
      logger.error(`ip-api.com failed: ${errorMessage}`);
      throw new RequestError(400, `Location lookup failed: ${errorMessage}`);
    }

    if (data.status !== "success") {
      logger.error(`Unexpected ip-api.com status: ${data.status}`);
      throw new RequestError(
        500,
        "Unexpected response from geolocation service"
      );
    }

    // Successful response
    logger.info(`Successfully resolved location: ${data.country}`);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    logger.error("Location API error:", error);

    // Handle timeout/abort errors more gracefully
    if (error instanceof Error && error.name === "AbortError") {
      logger.warn("Location API request timed out");
      return NextResponse.json(
        { success: false, error: "Location service timeout" },
        { status: 408 }
      );
    }

    return handleError(error, "api") as Response;
  }
}
