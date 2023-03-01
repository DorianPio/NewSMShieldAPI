import { Router } from "express";

import { VerificationEmail } from "../../../database/Schema/vericationEmail";
import { makeRoute } from "../../../makerRequest/makeRoutes";
import { mailManager } from "../../../types/data/mailManager";
import { validateAUser } from "../../../types/data/validateAUser";
import { generateValidationCode } from "../../../utils/generateCode";
import { getDateMethod } from "../../../utils/getDate";
import { getValueInReturn } from "../../../utils/getValueInReturn";
import {
  checkIfUserExist,
  checkIfUserIsAdmin,
  checkIfUserIsNotValidated,
  checkIfUserIsValidated,
} from "../../middlewares/checkUser";
import { checkPostmanUserAgent } from "../../middlewares/checkUserAgent";

export const emailRoutes = (): Router[] => {
  const routers: Router[] = makeRoute(VerificationEmail, [
    {
      name: "Delete all code",
      description: "Allow you to delete all the code",
      path: "/verify-email",
      request: "delete",
      filter: [
        {
          key: "__v",
          getter: () => getValueInReturn(0),
        },
      ],
      functionPropeties: {
        requestFunction: "deleteMany",
        filter: { __v: 0 },
      },
      protectedRoute: true,
      type: "SimpleRequest",
      middlewares: [checkIfUserIsAdmin, checkPostmanUserAgent],
    },
    {
      name: "GetCode",
      description: "Allow you to get a validation code",
      path: "/verify-email",
      request: "get",
      filter: [
        {
          key: "email",
          getter: "query",
        },
        {
          key: "code",
          getter: () => generateValidationCode(),
        },
        {
          key: "createdAt",
          getter: () => getDateMethod(),
        },
      ],
      functionPropeties: {
        requestFunction: "create",
      },
      protectedRoute: true,
      type: "SimpleRequest",
      middlewares: [checkIfUserExist, checkIfUserIsNotValidated],
      dataTransformer: [mailManager],
    },

    {
      name: "GetCode",
      description: "Allow you to get see all the code",
      path: "/verify2-email",
      request: "get",
      filter: [],
      functionPropeties: {
        requestFunction: "find",
      },
      protectedRoute: true,
      type: "SimpleRequest",
      middlewares: [checkIfUserIsAdmin, checkPostmanUserAgent],
    },

    {
      name: "Submit Verification",
      description: "Allow you to make a verification of a code",
      path: "/submit-verification",
      request: "post",
      filter: [
        {
          key: "email",
          getter: "body",
        },
        { key: "code", getter: "body" },
      ],
      functionPropeties: {
        requestFunction: "findOne",
      },
      protectedRoute: true,
      type: "SimpleRequest",
      middlewares: [checkIfUserExist, checkIfUserIsNotValidated],
      dataTransformer: [validateAUser],
    },
  ]);
  return routers;
};
