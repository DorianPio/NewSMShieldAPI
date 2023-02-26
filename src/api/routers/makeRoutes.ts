import { Router } from "express";
import { userRoutes } from "../http/routes/user";

export function mergeRoutes(): Router[] {
  const routesArrays: Router[][] = [userRoutes()];

  const finalArray: Router[] = routesArrays.reduce(
    (acc, cur) => acc.concat(cur),
    []
  );
  return finalArray;
}
