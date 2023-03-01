import { Router } from "express";
import { Model } from "mongoose";
import { RouteCreator } from "../types/request/types";
import { makeGenericRequest } from "./makeGenericRequest";

/**
 * Create multiple routes for a given model based on an array of route creators.
 *
 * @param model - The model to create routes for.
 * @param creators - An array of route creators, each specifying a type of route to create.
 * @returns An array of Router objects containing the created routes.
 */

export function makeRoute<T extends Model<any>>(
  model: T,
  creators: RouteCreator<T>[]
): Router[] {
  const routers: Array<Router> = [];
  for (const elem of creators) {
    const element = getters[elem.type](model, Array(elem));
    routers.push(element);
  }
  return routers;
}

const getters: Record<RouteCreator<any>["type"], any> = {
  SimpleRequest: makeGenericRequest,
};
