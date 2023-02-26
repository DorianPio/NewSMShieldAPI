import { Model } from "mongoose";
import { Creator } from "../types/request/types";

export async function handleFunctionAfterRoutage<T extends Model<any>>(
  req: any,
  res: any,
  data: {},
  creator: Creator<T>
) {
  if (!creator.dataTransformer) {
    return;
  }
  for (const func of creator.dataTransformer) {
    await func(req, res, data);
  }
}
