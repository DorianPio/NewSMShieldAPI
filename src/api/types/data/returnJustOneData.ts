import { Schema } from "mongoose";
import { codeCreation } from "../const/error";

export interface vericationEmail {
  email: string;
  code: string;
  createdAt: Date;
  _id: Schema.Types.ObjectId;
  __v: number;
}

export async function returnCodeOnly(
  req: any,
  res: any,
  data: vericationEmail
): Promise<{ code: string }> {
  if (!data) {
    throw new Error(codeCreation);
  }
  return { code: data.code };
}
