import { Model } from "mongoose";
import { Creator } from "../types/request/types";

/**

Handles a function after routing by transforming data based on specified data transformers.
@param {any} req - Express request object.
@param {any} res - Express response object.
@param {object} data - Data returned from the database request.
@param {Creator} creator - The creator object used to create the route.
@returns {Promise<void | Promise<any>[]>} - Returns a promise that resolves to undefined or an array of promises if there are multiple data transformers.
*/

export async function handleFunctionAfterRoutage<T extends Model<any>>(
  req: any,
  res: any,
  data: {},
  creator: Creator<T>
): Promise<void | Promise<any>[]> {
  if (!creator.dataTransformer) {
    return;
  }
  const resultFunc: Array<Promise<any>> = [];
  for (const func of creator.dataTransformer) {
    const result = await func(req, res, data);
    if (result !== undefined) {
      resultFunc.push(result);
    }
  }
  return resultFunc.length === 0
    ? undefined
    : resultFunc.length === 1
    ? resultFunc[0]
    : resultFunc;
}
