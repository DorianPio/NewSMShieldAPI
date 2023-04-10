import { Router } from "express";
import { Article } from "../../../database/Schema/article";
import { makeRoute } from "../../../makerRequest/makeRoutes";
import { getDateMethod } from "../../../utils/getDate";
import { getValueInReturn } from "../../../utils/getValueInReturn";
import { checkIfUserIsAdmin } from "../../middlewares/checkUser";

export const articlesRoutes = (): Router[] => {
  return makeRoute(Article, [
    {
      name: "Create Article",
      description: "Allow you to create a new article",
      path: "/articles",
      request: "post",
      filter: [
        {
          key: "title",
          getter: "body",
        },
        {
          key: "author",
          getter: "body",
        },
        {
          key: "content",
          getter: "body",
        },
        { key: "date", getter: () => getDateMethod() },
      ],
      functionPropeties: {
        requestFunction: "create",
      },
      protectedRoute: true,
      type: "SimpleRequest",
      middlewares: [checkIfUserIsAdmin],
    },

    {
      name: "Delete Article",
      description: "Allow you to delete an article (You need to be admin)",
      filter: [
        {
          key: "_id",
          getter: "body",
        },
      ],
      functionPropeties: {
        requestFunction: "deleteOne",
      },
      path: "/articles",
      protectedRoute: true,
      request: "delete",
      type: "SimpleRequest",
      middlewares: [checkIfUserIsAdmin],
    },

    {
      name: "Non Validated Articles",
      description: "Allow you to get the non validated articles",
      filter: [
        {
          key: "validated",
          getter: () => getValueInReturn(false),
        },
      ],
      functionPropeties: {
        requestFunction: "find",
        modifiers: { sort: "date" },
      },
      path: "/articles",
      protectedRoute: true,
      request: "get",
      type: "SimpleRequest",
    },

    {
      name: "Validated Articles",
      description: "Allow you to get the validated articles",
      filter: [
        {
          key: "validated",
          getter: () => getValueInReturn(true),
        },
      ],

      functionPropeties: {
        requestFunction: "find",
        filter: { __v: 0 },
        modifiers: { sort: "date" },
      },
      path: "/articles/validated",
      protectedRoute: true,
      request: "get",
      type: "SimpleRequest",
      middlewares: [],
    },

    {
      name: "Validated An Articles",
      description: "Allow you to validate an article",
      filter: [
        {
          key: "validated",
          getter: () => getValueInReturn(true),
        },
        {
          key: "_id",
          getter: "body",
        },
      ],
      functionPropeties: {
        requestFunction: "updateOne",
      },
      path: "/articles",
      protectedRoute: true,
      request: "patch",
      type: "SimpleRequest",
      middlewares: [checkIfUserIsAdmin],
    },
  ]);
};
