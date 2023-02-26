import { User } from "../../database/Schema/users";
import { badPassword } from "../const/error";

export async function passwordCheckEquality(req: any, res: any, data: {}) {
  if (!data) {
    throw new Error(badPassword);
  }
  console.log(data);
}
