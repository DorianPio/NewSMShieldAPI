import { Model, Schema, model } from "mongoose";

interface IUser {
  email: string;
  password: string;
  name: string;
  role: string; 
  photo: string;
  age: number;
  birthDate: string;
  phoneNumber: string;
  tokens: Object;
  validated: boolean;
}

interface IUserMethods {
  findOneUserByEmail(): any;
}

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
  role: { type: String, required: true, default: "utilisateur" },
  tokens: {
    twitter_access_token: { type: String, required: false },
    twitter_access_token_secret: { type: String, required: false },
    twitter_uid: { type: String, require: false },
  },
  validated: { type: Boolean, required: true, default: false },
});

schema.method("findOneUserByEmail", function findOneUserByEmail() {
  return model("User").findOne({ email: this.email });
});
export const User = model<IUser, UserModel>("User", schema);
