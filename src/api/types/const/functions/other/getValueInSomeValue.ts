import { Schema } from "mongoose";
import { User } from "../../../../database/Schema/users";
import { checkIfUserDoesntExist } from "../../../../http/middlewares/checkUser";
import { customMap } from "../../customType";
import { executeDBFunction } from "../database/databaseFunction";

const dataModifiable: string[] = [
  "email",
  "photo",
  "name",
  "birthDate",
  "age",
  "phoneNumber",
  "gender",
];

export function getMapOfValue(req: any, where: string): customMap[] {
  const map: customMap[] = [];
  for (const value of dataModifiable) {
    if (!req[where][value] || req[where][value] === "default") {
      continue;
    }
    map.push({
      key: value,
      value: req[where][value],
    });
  }
  return map;
}

export const applyModification = async (
  req: any,
  res: any,
  data: { _id: Schema.Types.ObjectId }
): Promise<void | string> => {
  const map: customMap[] = getMapOfValue(req, "body");

  try {
    await checkIfUserDoesntExist(req);
  } catch (err: any) {
    return err.message;
  }

  for (const element of map) {
    executeDBFunction(
      User,
      { _id: data._id },
      { [element.key]: element.value },
      "findOneAndUpdate"
    );
  }
};
