/**
 * Error message for missing request parameter(s).
 */
export const missingError: string = "Missing parameter: ";

/**
 * Error message for when there are too many parameters in a request.
 */
export const tooManyParamsError: string =
  "There is too many params in this request: ";

/**
 * Error message for when there is an issue with the makeGenericRequest function.
 */
export const makeGenericRequestError: string =
  "Something went wrong with makeGenericRequest function";

/**
 * Error message for when a JWT token is invalid or empty.
 */
export const badJWTToken: string = "Token empty or invalid";

/**
 * Error message for when a user does not exist.
 */
export const userDoesntExist: string = "User doesn't exist";

/**
 * Error message for when a user already exists.
 */
export const userAlreadyExist: string = "User already exist";

/**
 * Error message for when a password is incorrect.
 */
export const badPassword: string = "Bad password";

/**
 * Error message for when a user is not an administrator.
 */
export const userNeedToBeAdmin: string = "You don't have permission to do that";

/**
 * Error message for when a user has already been validated.
 */
export const userAlreadyValidated: string = "User already validated";

/**
 * Error message for when a user has not been validated.
 */
export const userNotValidated: string = "User not validated";

/**
 * Error message for when there is an issue with creating a verification code.
 */
export const codeCreation: string =
  "Error during the process of the creation of the code, please try again later";

/**
 * Error message for when a User-Agent header is invalid.
 */
export const invalidUserAgent: string = "Invalid User-Agent";
