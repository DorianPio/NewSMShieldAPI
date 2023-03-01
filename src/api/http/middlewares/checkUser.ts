import { User } from "../../database/Schema/users";
import {
  userAlreadyExist,
  userAlreadyValidated,
  userDoesntExist,
  userNeedToBeAdmin,
  userNotValidated,
} from "../../types/const/error";
import { executeDBFunction } from "../../types/const/functions/database/databaseFunction";
import { getEmailByToken } from "../../utils/getEmailByToken";

/**
 * Check if a user exists in the database with the provided email.
 * Throws an error if the user doesn't exist.
 * @param req - The HTTP request object.
 * @throws An error with the message "User doesn't exist." if the user doesn't exist in the database.
 */
export const checkIfUserExist = async (req: any): Promise<void> => {
  const result = await executeDBFunction(
    User,
    { email: !req.body.email ? req.query.email : req.body.email },
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
    { email: !req.body.email ? req.query.email : req.body.email },
    undefined,
    "findOne"
  );
  if (result) {
    throw new Error(userAlreadyExist);
  }
};

/**
 * Checks if the user making the request is an admin.
 * If the user is not an admin, an error message is thrown.
 * @param req - The request object that contains the Authorization header.
 * @returns Promise<void>
 * @throws Error - If the user making the request is not an admin.
 */

export const checkIfUserIsAdmin = async (req: any): Promise<void> => {
  const result = await executeDBFunction(
    User,
    { email: await getEmailByToken(req.get("Authorization")) },
    { role: 1 },
    "findOne"
  );
  if (!result || result.role !== "admin") {
    throw new Error(userNeedToBeAdmin);
  }
};

/**
 * Checks if the user making the request is validated or not.
 * If the user is not validated, an error message is thrown.
 * @param req - The request object that contains the Authorization header.
 * @returns Promise<void>
 * @throws Error - If the user making the request is not validated.
 */

export const checkIfUserIsValidated = async (req: any): Promise<void> => {
  const result = await executeDBFunction(
    User,
    { email: !req.body.email ? req.query.email : req.body.email },
    { validated: 1 },
    "findOne"
  );
  if (!result || !result.validated) {
    throw new Error(userNotValidated);
  }
};

export const checkIfUserIsNotValidated = async (req: any): Promise<void> => {
  const result = await executeDBFunction(
    User,
    { email: !req.body.email ? req.query.email : req.body.email },
    { validated: 1 },
    "findOne"
  );
  if (!result || result.validated) {
    throw new Error(userAlreadyValidated);
  }
};
