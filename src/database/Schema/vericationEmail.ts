import { Model, Schema, model } from "mongoose";

interface IVerificationEmail {
  code: String;
  email: String;
  creation: Date;
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
  creation: { type: Date, required: true },
});

export const VerificationEmail = model<
  IVerificationEmail,
  VerificationEmailModel
>("VerificationEmail", schema);
