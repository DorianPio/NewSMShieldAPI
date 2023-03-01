import { User } from "../../database/Schema/users";
import { compareDates } from "../../utils/compareDates";
import { executeDBFunction } from "../const/functions/database/databaseFunction";
import { vericationEmail } from "./returnJustOneData";

/**
 * Validates a user based on a verification email.
 * @async
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {object} data - The verification email data to validate the user.
 * @returns {Promise} A promise that resolves with a status object indicating the validation result, or void if an error occurs.
 */

export const validateAUser = async (
  req: any,
  res: any,
  data: vericationEmail
): Promise<void | { status: string }> => {
  if (data) {
    if (!compareDates(new Date(), data.createdAt)) {
      await executeDBFunction(
        User,
        { email: data.email },
        { validated: true },
        "findOneAndUpdate"
      );
      return { status: "User validated" };
    }
    return { status: "Time expire" };
  }
};
