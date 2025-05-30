import { RequestError } from "../http-errors";
import logger from "../logger";
import handleError from "./error";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(url: string, options: FetchOptions = {}) {
  const { timeout = 10000, headers: customHeaders = {}, ...rest } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };
  const config: RequestInit = {
    ...rest,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(id);
    if (!response.ok) {
      throw new RequestError(response.status, `HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error("Unknown error");
    if (error.name === "AbortError") {
      logger.warn(`Request timed out: ${url}`);
    } else {
      logger.error(`Error fetching ${url}: ${error.message}`);
    }

    return handleError(error) as ActionResponse<T>;
  }
}
