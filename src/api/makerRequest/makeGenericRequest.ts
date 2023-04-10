import { Router } from "express";
import { Model } from "mongoose";
import { Creator } from "../types/request/types";
import { handleDatabaseRequest } from "../database/request/handleRequest";
import { handleResponse } from "./handleResponse";
import { generateFilters, loopOverKeys } from "./generateFilters";
import { checkIfIsEmpty, errorManage } from "../types/const/functions/error";
import { makeGenericRequestError } from "../types/const/error";
import { routerUse } from "../types/const/functions/routerUse";
import { executeMiddlewares } from "../types/const/functions/middlewares/executeMiddlewares";
import { handleFunctionAfterRoutage } from "./afterRoutage";

/**

Performs CRUD operations on a MongoDB collection using Express.js routes and middleware.
@template T - A MongoDB model.
@param {Creator<T>} creator - An object that contains the properties necessary to create the CRUD routes.
@param {...any} args - Additional arguments needed for the function.
@returns {void}
*/

function routerOperations<T extends Model<any>>(
  creator: Creator<T>,
  ...args: any
): void {
  const router = args[0][0] as Router;
  const model = args[0][1] as T;

  errorManage(
    undefined,
    checkIfIsEmpty,
    makeGenericRequestError,
    model,
    router
  );

  router.use(creator.path, async (req, res, next) => {
    try {
      routerUse(creator, req);
      next();
    } catch (err: any) {
      handleResponse(res, 400, "", err.message);
    }
  });

  router[creator.request](creator.path, async (req, res, next) => {
    try {
      const filters = await generateFilters(creator, req, res);
      await executeMiddlewares(creator, req, res);
      const overKeys = loopOverKeys(
        creator.functionPropeties.filter,
        req
      ) as any;

      await handleDatabaseRequest(
        creator.functionPropeties.requestFunction,
        model,
        filters,
        overKeys,
        creator.functionPropeties.modifiers,
        creator.auth,
        creator
      ).then(async (response) => {
        await handleFunctionAfterRoutage(req, res, response, creator).then(
          (result) => {
            response = result === undefined ? response : result;
            handleResponse(res, 200, response);
          }
        );
      });
    } catch (err: any) {
      handleResponse(res, 500, "", err.message);
    }
  });
}

/**
 * Generates a GET endpoint for a given model and creator
 * @param model - the model to generate the GET endpoint for
 * @param creators - an array of creators to generate the GET endpoint for
 * @returns a router containing the GET endpoint
 */

export function makeGenericRequest<T extends Model<any>>(
  model: T,
  creators: Array<Creator<T>>
) {
  const router = Router();

  makeForAndExecuteCode(creators, routerOperations, router, model);
  return {
    router,
  };
}

/**
 * Executes a generic function for each value in an array of values.
 * @param {Array} values - The array of values to execute the function for.
 * @param {function} executeGenericCode - The function to execute for each value.
 * @param {...*} args - Additional arguments to pass to the executeGenericCode function.
 */

function makeForAndExecuteCode(
  values: any,
  executeGenericCode: (value: any, ...args: any) => void,
  ...args: any
) {
  for (const value of values) {
    executeGenericCode(value, args);
  }
}
