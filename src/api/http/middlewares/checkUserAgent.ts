import { invalidUserAgent } from "../../types/const/error";

const postmanDefaultUserAgent: string = "PostmanRuntime";

/**
 * Check if the user agent in the request header is the Postman default user agent.
 * @param {Object} req - The express request object.
 * @throws {Error} Throws an error if the user agent is invalid.
 */

export const checkPostmanUserAgent = (req: any): void => {
  const userAgent = req.get("user-agent");
  if (!userAgent || !userAgent.includes(postmanDefaultUserAgent)) {
    throw new Error(invalidUserAgent + " Needed: " + postmanDefaultUserAgent);
  }
};

/**
 * Check if the user agent string is valid according to a regex pattern.
 * @param {string} userAgent - The user agent string to check.
 * @throws {Error} Throws an error if the user agent is invalid.
 */

export const checkIfIsValidUserAgent = (userAgent: string): void => {
  const regex =
    /^Mozilla\/5\.0 \(.*?\) AppleWebKit\/.*? \(KHTML, like Gecko\) Chrome\/.*? Safari\/.*?$/;
  if (!regex.test(userAgent)) {
    throw new Error(invalidUserAgent);
  }
};
