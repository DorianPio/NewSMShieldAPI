import { Router } from "express";
import { News } from "../../../database/Schema/news";
import { makeRoute } from "../../../makerRequest/makeRoutes";
import { getDateMethod } from "../../../utils/getDate";
import { getValueInReturn } from "../../../utils/getValueInReturn";
import { checkIfUserIsAdmin } from "../../middlewares/checkUser";

export const newsRoutes = (): Router[] => {
  return makeRoute(News, [
    {
        name: "Validated News",
        description: "Allow you to get the validated News",
        filter: [],
        functionPropeties: {
          requestFunction: "find",
          filter: { __v: 0 },
          modifiers: { sort: "name" },
        },
        path: "/news",
        protectedRoute: true,
        request: "get",
        type: "SimpleRequest",
        middlewares: [],
      },    
    {
      name: "Create News",
      description: "Allow you to create a new News",
      path: "/news",
      request: "post",
      filter: [
        {
          key: "name",
          getter: "body",
        },
       
        {
          key: "content",
          getter: "body",
        },
      ],
      functionPropeties: {
        requestFunction: "create",
      },
      protectedRoute: true,
      type: "SimpleRequest",
      middlewares: [checkIfUserIsAdmin],
    },

    {
      name: "Delete News",
      description: "Allow you to delete an News (You need to be admin)",
      filter: [
        {
          key: "_id",
          getter: "body",
        },
      ],
      functionPropeties: {
        requestFunction: "deleteOne",
      },
      path: "/news",
      protectedRoute: true,
      request: "delete",
      type: "SimpleRequest",
      middlewares: [checkIfUserIsAdmin],
    },
  ]);
};
