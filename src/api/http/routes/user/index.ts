import { Router } from "express";
import { makeRoute } from "../../../makerRequest/makeRoutes";
import { User } from "../../../database/Schema/users";
import hash from "object-hash";
import {
  checkIfUserDoesntExist,
  checkIfUserExist,
} from "../../middlewares/checkUser";
import { getEmailByToken } from "../../../utils/getEmailByToken";
import { passwordCheckEquality } from "../../../types/data/passwordCheck";

export const userRoutes = (): Router[] => {
  const routers: Router[] = makeRoute(User, [
    {
      name: "GetUsers",
      description: "Get all the users",
      type: "SimpleRequest",
      path: "/users",
      filter: [],
      functionPropeties: {
        filter: { __v: 0 },
        requestFunction: "find",
        modifiers: { sort: "email" },
      },
      request: "get",
      protectedRoute: true,
    },

    {
      name: "GetUser",
      description: "Get user by ID",
      type: "SimpleRequest",
      path: "/user",
      filter: [
        {
          key: "_id",
          getter: "query",
        },
      ],
      functionPropeties: {
        filter: { __v: 0 },
        requestFunction: "findOne",
      },
      request: "get",
      protectedRoute: true,
    },

    {
      name: "GetUser",
      description: "Get information about current user",
      type: "SimpleRequest",
      path: "/me",
      filter: [
        {
          key: "email",
          getter: (req: any) => getEmailByToken(req.get("Authorization")),
        },
      ],
      functionPropeties: {
        filter: { __v: 0 },
        requestFunction: "findOne",
      },
      request: "get",
      protectedRoute: true,
    },

    {
      name: "GetUser",
      description: "Get information about current user",
      type: "SimpleRequest",
      path: "/user/email",
      filter: [
        {
          key: "email",
          getter: "query",
        },
      ],
      functionPropeties: {
        filter: { __v: 0 },
        requestFunction: "findOne",
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
      protectedRoute: true,
    },
    /**
     * Auth
     *
     * All the route under this are not protected cause it's auth Routes
     *
     */
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
          getter: (req: any) => hash(req.body.password),
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
          getter: (req: any) => hash(req.body.password),
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
