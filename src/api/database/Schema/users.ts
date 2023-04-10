import { Model, Schema, model } from "mongoose";

interface IUser {
  email: string;
  password: string;
  name: string;
  role: "utilisateur" | "admin" | "support";
  photo: string;
  age: number;
  birthDate: string;
  phoneNumber: string;
  gender: string;
  validated: boolean;
}

interface IUserMethods {}

type UserModel = Model<IUser, {}, IUserMethods>;

const schema = new Schema<IUser, UserModel, IUserMethods>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: false },
  photo: {
    type: String,
    required: true,
    default: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
  },
  birthDate: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  age: { type: Number, required: false },
  gender: { type: String, required: false },
  role: { type: String, required: true, default: "utilisateur" },
  validated: { type: Boolean, required: true, default: false },
});

export const User = model<IUser, UserModel>("User", schema);
