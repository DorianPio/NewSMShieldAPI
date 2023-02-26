import { Model } from "mongoose";
import { missingError } from "../types/const/error";
import { checkValidParams } from "../types/const/functions/Array";
import { Creator } from "../types/request/types";

/**
 * Generates filters for a given creator using request parameters and filter getters
 * @param creator - the creator to generate filters for
 * @param req - the request object containing query parameters
 * @param res - the response object
 * @returns an object containing the generated filters
 * @throws an error if a filter is missing
 */
export async function generateFilters<T extends Model<any>>(
  creator: Creator<T>,
  req: any,
  res: any
) {
  const filters: { [k: keyof any]: any } = {};
  checkValidParams(creator.filter, req, "body");
  checkValidParams(creator.filter, req, "query");

  for (const filter of creator.filter) {
    if (typeof filter !== "object") {
      const queryParam = req.query[filter as any];
      if (!queryParam) {
        throw new Error(missingError + filter.toString());
      }
      filters[filter] = queryParam;
    } else {
      filters[filter.key] = await generateFilterValue(filter, req, res);
      if (!filters[filter.key]) {
        throw new Error(missingError + filter.key.toString());
      }
    }
  }
  return filters;
}

/**
 * Generates the value of a given filter using a filter getter or a request parameter
 * @param filter - the filter to generate a value for
 * @param req - the request object containing query parameters
 * @param res - the response object
 * @returns the value of the filter
 */

async function generateFilterValue(filter: any, req: any, res: Response) {
  if (typeof filter.getter === "string") {
    return req[filter.getter][filter.key];
  }
  return await filter.getter(req, res);
}
