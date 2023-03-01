import { Schema } from "mongoose";
import { codeCreation } from "../const/error";

/**
 * Interface representing a verification email object with an email address, a verification code, a creation date, and ID and version fields.
 */

export interface vericationEmail {
  email: string;
  code: string;
  createdAt: Date;
  _id: Schema.Types.ObjectId;
  __v: number;
}

/**
 * Returns a verification code from a verification email object.
 * @async
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {object} data - The verification email object to extract the code from.
 * @returns {Promise} A promise that resolves with an object containing the verification code, or throws an error if the data object is null.
 * @throws {Error} Throws an error with a message indicating that the verification code cannot be created if the data object is null.
 */

export async function returnCodeOnly(
  req: any,
  res: any,
  data: vericationEmail
): Promise<{ code: string }> {
  if (!data) {
    throw new Error(codeCreation);
  }
  return { code: data.code };
}
