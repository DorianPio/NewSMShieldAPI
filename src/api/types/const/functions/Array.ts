import { whereInRequest } from "../../request/types";
import { tooManyParamsError } from "../error";

/**
 * Check if a given number exists in an array of numbers.
 *
 * @param numbers - The array of numbers to search.
 * @param numberToFind - The number to find in the array.
 * @returns Whether the number exists in the array.
 */

export function checkIfNumberExists(
  numbers: number[],
  numberToFind: number
): boolean {
  return numbers.includes(numberToFind);
}

/**
 * Check if the given request parameters are valid according to a set of filters.
 *
 * @param filters - An array of filters, each with a `key` property indicating a valid parameter name.
 * @param req - The Express Request object containing the parameters to check.
 * @param where - A string indicating where to find the parameters in the Request object, either 'query' or 'params'.
 * @throws An error with a message indicating that an invalid parameter was found.
 */

export function checkParams(
  filters: any,
  req: any,
  where: whereInRequest
): void {
  const validParams = new Set(filters.map((f: any) => f.key));
  const params = req[where];
  for (const key of Object.keys(params)) {
    if (!validParams.has(key)) {
      throw new Error(tooManyParamsError + key);
    }
  }
}

/**
 * Check if the given request parameters are valid according to a set of filters.
 *
 * @param filters - An array of filters, each with a `key` property indicating a valid parameter name.
 * @param req - The Express Request object containing the parameters to check.
 * @param where - A string indicating where to find the parameters in the Request object, either 'query' or 'params'.
 * @throws An error with a message indicating that an invalid parameter was found.
 */

export function checkValidParams(
  filers: any,
  req: Express.Request,
  where: whereInRequest
): void {
  checkParams(filers, req, where);
}
