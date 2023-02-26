import { Model, Schema, model } from "mongoose";

interface IArticle {
  title: String;
  date: String;
  content: String;
  validated: Boolean;
}

interface IArticleMethods {}

type ArticleModel = Model<IArticle, {}, IArticleMethods>;

const schema = new Schema<IArticle, ArticleModel, IArticleMethods>({
  title: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
  validated: { type: Boolean, required: true, default: false },
});

export const Article = model<IArticle, ArticleModel>("Article", schema);
