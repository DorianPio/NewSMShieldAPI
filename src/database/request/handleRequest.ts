import { Model } from "mongoose";
import {
  ExtractType,
  ModelFunctionList,
  Modifier,
} from "../../types/request/types";
import jwt from "jsonwebtoken";

/**
 * Handles a request to a database.
 * It's not do for use by yourself.
 * If you need to use it, see all the documentation of the type to use it
 *
 * @param m - The method to use on the model object.
 * @param obj - The model object.
 * @param val - The value to search for.
 * @param filter - The filter to apply.
 * @param modifiers - The modifiers to apply.
 * @returns The result of the database request or the error.
 */

export async function handleDatabaseRequest<O extends Model<any>>(
  m: ModelFunctionList,
  obj: O,
  val?: ExtractType<O>,
  filter?: { [P in keyof ExtractType<O>]: number | string },
  modifiers?: Modifier<O>,
  auth?: true
): Promise<any> {
  try {
    let result = (obj[m] as any)(val, filter);
    if (modifiers) {
      for (const key in modifiers) {
        result = result[key](modifiers[key]);
      }
    }
    result = await result;
    return auth
      ? !result
        ? result
        : {
            authToken: jwt.sign(
              { email: val?.email },
              String(process.env.JWT_SECRET)
            ),
          }
      : result;
  } catch (err) {
    return err;
  }
}
