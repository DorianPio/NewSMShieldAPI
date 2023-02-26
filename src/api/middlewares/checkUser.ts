import { User } from "../../database/Schema/users";
import { userAlreadyExist, userDoesntExist } from "../../types/const/error";
import { executeDBFunction } from "../../types/const/functions/database/databaseFunction";

/**
 * Check if a user exists in the database with the provided email.
 * Throws an error if the user doesn't exist.
 * @param req - The HTTP request object.
 * @throws An error with the message "User doesn't exist." if the user doesn't exist in the database.
 */
export const checkIfUserExist = async (req: any): Promise<void> => {
  const result = await executeDBFunction(
    User,
    { email: req.body.email },
    undefined,
    "findOne"
  );
  if (!result) {
    throw new Error(userDoesntExist);
  }
};

/**
 * Check if a user doesn't exist in the database with the provided email.
 * Throws an error if the user already exists.
 * @param req - The HTTP request object.
 * @throws An error with the message "User already exists." if the user already exists in the database.
 */
export const checkIfUserDoesntExist = async (req: any): Promise<void> => {
  const result = await executeDBFunction(
    User,
    { email: req.body.email },
    undefined,
    "findOne"
  );
  if (result) {
    throw new Error(userAlreadyExist);
  }
};
