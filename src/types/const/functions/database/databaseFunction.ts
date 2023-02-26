import { Model } from "mongoose";
import { ModelFunctionList } from "../../../request/types";

/**
 * Executes a function on a MongoDB model with the specified input parameters.
 * @param model - The MongoDB model on which to execute the function.
 * @param value - The input value for the function.
 * @param filter - The input filter for the function.
 * @param rFunc - The name of the function to execute on the model.
 * @returns The result of the function execution on the model.
 */

export async function executeDBFunction<O extends Model<any>>(
  model: O,
  value: any,
  filter: any,
  rFunc: ModelFunctionList
): Promise<any> {
  try {
    const result = (model[rFunc] as any)(value, filter);
    const data = await result;
    return data;
  } catch (error) {
    return error;
  }
}
