import { Model, Schema, model } from "mongoose";

interface INews {
  name: string;
  content : string;
}

interface INewsMethods {}

type NewsModel = Model<INews, {}, INewsMethods>;

const schema = new Schema<INews, NewsModel, INewsMethods>({
  name: { type: String, required: true },
  content: { type: String, required: true },
});

export const News = model<INews, NewsModel>("News", schema);
