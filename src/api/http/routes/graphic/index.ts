import { Router } from "express";
import { Graph } from "../../../database/Schema/graph";
import { makeRoute } from "../../../makerRequest/makeRoutes";
import { getDateMethod } from "../../../utils/getDate";
import { getValueInReturn } from "../../../utils/getValueInReturn";
import { checkIfUserIsAdmin } from "../../middlewares/checkUser";

export const graphRoutes = (): Router[] => {
  return makeRoute(Graph, [
    {
        name: "Validated Graph",
        description: "Allow you to get the validated Graph",
        filter: [],
        functionPropeties: {
          requestFunction: "find",
          filter: { __v: 0 },
          modifiers: { sort: "name" },
        },
        path: "/graph",
        protectedRoute: true,
        request: "get",
        type: "SimpleRequest",
        middlewares: [],
      },    
    {
      name: "Create Graph",
      description: "Allow you to create a new Graph",
      path: "/graph",
      request: "post",
      filter: [
        {
          key: "name",
          getter: "body",
        },
        {
          key: "value1",
          getter: "body",
        },
        {
          key: "value2",
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
      name: "Delete Graph",
      description: "Allow you to delete an Graph (You need to be admin)",
      filter: [
        {
          key: "_id",
          getter: "body",
        },
      ],
      functionPropeties: {
        requestFunction: "deleteOne",
      },
      path: "/graph",
      protectedRoute: true,
      request: "delete",
      type: "SimpleRequest",
      middlewares: [checkIfUserIsAdmin],
    },
  ]);
};
