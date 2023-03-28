import { Router } from "express";
import { articlesRoutes } from "../routes/article";
import { emailRoutes } from "../routes/email";
import { graphRoutes } from "../routes/graphic";
import { newsRoutes } from "../routes/news";
import { userRoutes } from "../routes/user";

/**
 * Merges the arrays of routes returned by the different route modules into a single array of routes.
 * @returns An array of Router objects representing all the routes in the application.
 */

export function mergeRoutes(): Router[] {
  const routesArrays: Router[][] = [
    userRoutes(),
    articlesRoutes(),
    emailRoutes(),
    newsRoutes(),
    graphRoutes()
  ];

  const finalArray: Router[] = routesArrays.reduce(
    (acc, cur) => acc.concat(cur),
    []
  );
  return finalArray;
}
