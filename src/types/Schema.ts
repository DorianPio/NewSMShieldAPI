import { Model } from "mongoose";

export type ExtractSchemaType<T extends Model<any>> = T["schema"];
