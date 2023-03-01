import { Model } from "mongoose";
import { Creator } from "../../../request/types";

/**
 * Executes the middlewares defined in a Creator object for a given HTTP request.
 * @param creator - The Creator object containing the middlewares to execute.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @throws An error if any of the middlewares throw an error.
 */

export async function executeMiddlewares<T extends Model<any>>(
  creator: Creator<T>,
  req: any,
  res: any
): Promise<void> {
  if (!creator.middlewares) {
    return;
  }
  for (const middlewares of creator.middlewares) {
    await middlewares(req);
  }
}
