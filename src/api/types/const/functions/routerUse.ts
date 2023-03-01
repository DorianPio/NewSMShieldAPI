import { Router } from "express";
import { Model } from "mongoose";
import { Creator } from "../../request/types";
import jwt from "jsonwebtoken";
import { badJWTToken } from "../error";

/**
 * Checks whether two given string values are equal.
 *
 * @param value The first string value to compare.
 * @param toCompare The second string value to compare.
 * @returns A boolean indicating whether the two values are equal.
 */

export function checkStringEquals(value: string, toCompare: string): boolean {
  return value === toCompare;
}

/**
 * Checks whether a given JWT token is valid by verifying its signature with the JWT_SECRET environment variable.
 *
 * @param req The request object containing the JWT token in its Authorization header.
 * @returns A boolean indicating whether the JWT token is valid.
 */

export function checkIfJWTTokenIsValid(req: any): boolean {
  return jwt.verify(
    String(req.get("Authorization")),
    String(process.env.JWT_SECRET)
  )
    ? true
    : false;
}

/**
 * Checks if a protected route should be used and if a given request is authorized to access it.
 *
 * @param creator The creator function that creates the protected route.
 * @param req The request object to check for authorization.
 * @returns Nothing.
 * @throws An error if the JWT token in the Authorization header is invalid.
 */

export function routerUse<T extends Model<any>>(
  creator: Creator<T>,
  req: any
): void {
  if (creator.protectedRoute) {
    if (checkStringEquals(creator.request, req.method.toLowerCase())) {
      if (checkIfJWTTokenIsValid(req)) {
        return;
      }
      throw new Error(badJWTToken);
    }
    return;
  }
  return;
}
