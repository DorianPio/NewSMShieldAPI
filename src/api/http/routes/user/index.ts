import { Router } from "express";
import { User } from "../../../../database/Schema/users";
import { makeRoute } from "../../../../makerRequest/makeRoutes";
import hash from "object-hash";
import {
  checkIfUserDoesntExist,
  checkIfUserExist,
} from "../../../middlewares/checkUser";
import { passwordCheckEquality } from "../../../../types/data/passwordCheck";

export const userRoutes = (): Router[] => {
  const routers: Router[] = makeRoute(User, [
    {
      name: "GetUsers",
      type: "SimpleRequest",
      path: "/users",
      filter: [],
      functionPropeties: {
        filter: { __v: 0 },
        requestFunction: "find",
        modifiers: {},
      },
      request: "get",
      protectedRoute: true,
    },
    {
      name: "DeleteUser",
      description: "Delete a user from email",
      type: "SimpleRequest",
      path: "/users",
      filter: [
        {
          key: "email",
          getter: "body",
        },
      ],
      functionPropeties: {
        requestFunction: "deleteOne",
      },
      request: "delete",
      protectedRoute: false,
    },
    {
      name: "Register",
      description: "Register a new user",
      type: "SimpleRequest",
      path: "/register",
      filter: [
        {
          key: "email",
          getter: "body",
        },
        {
          key: "password",
          getter: "body",
        },
        {
          key: "password",
          getter: (req) => hash(req.body.password),
        },
        {
          key: "name",
          getter: "body",
        },
      ],
      functionPropeties: {
        requestFunction: "create",
      },
      request: "post",
      auth: true,
      protectedRoute: false,
      middlewares: [checkIfUserDoesntExist],
    },
    {
      name: "Login",
      description: "Login to the api",
      type: "SimpleRequest",
      path: "/login",
      filter: [
        {
          key: "email",
          getter: "body",
        },
        {
          key: "password",
          getter: "body",
        },
        {
          key: "password",
          getter: (req) => hash(req.body.password),
        },
      ],
      functionPropeties: {
        requestFunction: "findOne",
      },
      request: "post",
      auth: true,
      protectedRoute: false,
      middlewares: [checkIfUserExist],
      dataTransformer: [passwordCheckEquality],
    },
  ]);
  return routers;
};
