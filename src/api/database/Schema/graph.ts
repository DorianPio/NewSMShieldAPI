import { Model, Schema, model } from "mongoose";

interface IGraph {
  name: string;
  value1: number;
  value2: number;
}

interface IGraphMethods {}

type GraphModel = Model<IGraph, {}, IGraphMethods>;

const schema = new Schema<IGraph, GraphModel, IGraphMethods>({
  name: { type: String, required: true },
  value1: { type: Number, required: true },
  value2: { type: Number, required: true },
});

export const Graph = model<IGraph, GraphModel>("Graph", schema);
