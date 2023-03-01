import { Model, Schema, model } from "mongoose";

interface IVerificationEmail {
  code: String;
  email: String;
  createdAt: Date;
}

interface IVerificationEmailMethods {}

type VerificationEmailModel = Model<
  IVerificationEmail,
  {},
  IVerificationEmailMethods
>;

const schema = new Schema<
  IVerificationEmail,
  VerificationEmailModel,
  IVerificationEmailMethods
>({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, expires: "24h" },
});

export const VerificationEmail = model<
  IVerificationEmail,
  VerificationEmailModel
>("VerificationEmail", schema);
