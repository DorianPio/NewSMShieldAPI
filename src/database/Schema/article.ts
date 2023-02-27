import { Model, Schema, model } from "mongoose";

interface IArticle {
  title: string;
  date: string;
  content: string;
  author: string;
  validated: boolean;
}

interface IArticleMethods {}

type ArticleModel = Model<IArticle, {}, IArticleMethods>;

const schema = new Schema<IArticle, ArticleModel, IArticleMethods>({
  title: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  validated: { type: Schema.Types.Boolean, required: true, default: false },
});

export const Article = model<IArticle, ArticleModel>("Article", schema);
