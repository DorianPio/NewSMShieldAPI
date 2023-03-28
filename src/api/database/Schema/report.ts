import { Model, Schema, model } from "mongoose";

interface IReport {
  name: string;
  threaths: number;
  mediasUsed: string;
}

interface IReportMethods {}

type ReportModel = Model<IReport, {}, IReportMethods>;

const schema = new Schema<IReport, ReportModel, IReportMethods>({
  name: { type: String, required: true },
  threaths: { type: Number, required: true },
  mediasUsed: { type: String, required: true },
});

export const Report = model<IReport, ReportModel>("Report", schema);
