import { checkIfNumberExists } from "../types/const/functions/Array";
import { statusCodeError, statusCodeValid } from "../types/const/value";
import {
  GetStatusDescription,
  ResponseParserType,
} from "../types/request/return";
import { status, StatusType } from "../types/status/status";

/**
 * Get the description for a given status code.
 *
 * @param statusCode - The status code to get the description for.
 * @returns The description for the status code.
 */

export function handleCode(
  statusCode: number
): GetStatusDescription<typeof statusCode> {
  return status[statusCode].description;
}

/**
 * Check if a status code is valid.
 *
 * @param statusCode - The status code to check.
 * @param numbers - An array of valid status codes to check against.
 * @returns True if the status code is valid, false otherwise.
 */

export function checkStatusCode(statusCode: number, numbers: number[]) {
  return checkIfNumberExists(numbers, statusCode);
}

/**
 * Create a response object.
 *
 * @param res - The response object.
 * @param statusCode - The status code of the response.
 * @param data - The data to include in the response.
 * @returns The response object.
 */

export function makeResponseParser<
  K extends keyof StatusType & number,
  L extends any
>(res: any, statusCode: K, data: L): ResponseParserType<K, L> {
  return {
    statusCode: statusCode,
    description: handleCode(statusCode) as GetStatusDescription<K>,
    data: data,
  } as ResponseParserType<K, L>;
}

/**
 * Handle an HTTP response by setting the status code and sending a response object.
 *
 * @param res - The Express Response object to use for sending the response.
 * @param statusCode - The status code for the response.
 * @param data - The data to include in the response.
 * @param error - An optional error message to include in the response.
 * @returns void
 */

export function handleResponse<
  K extends keyof StatusType & number,
  L extends any
>(res: any, statusCode: K, data: L, error?: string): void {
  const response = makeResponseParser(res, statusCode, data);

  return res.status(response.statusCode).send({
    status: response.description,
    data: checkStatusCode(statusCode, statusCodeValid) ? data : undefined,
    error: checkStatusCode(statusCode, statusCodeError) ? error : undefined,
  });
}
