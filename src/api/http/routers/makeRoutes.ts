import { Router } from "express";
import { articlesRoutes } from "../routes/article";
import { userRoutes } from "../routes/user";

export function mergeRoutes(): Router[] {
  const routesArrays: Router[][] = [userRoutes(), articlesRoutes()];

  const finalArray: Router[] = routesArrays.reduce(
    (acc, cur) => acc.concat(cur),
    []
  );
  return finalArray;
}
