import { User } from "../../database/Schema/users";
import { compareDates } from "../../utils/compareDates";
import { executeDBFunction } from "../const/functions/database/databaseFunction";
import { vericationEmail } from "./returnJustOneData";

export const validateAUser = async (
  req: any,
  res: any,
  data: vericationEmail
): Promise<void | { status: string }> => {
  if (data) {
    if (!compareDates(new Date(), data.createdAt)) {
      await executeDBFunction(
        User,
        { email: data.email },
        { validated: true },
        "findOneAndUpdate"
      );
      return { status: "User validated" };
    }
    return { status: "Time expire" };
  }
};
