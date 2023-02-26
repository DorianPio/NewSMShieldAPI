import { handleResponse } from "../../../makerRequest/handleResponse";
import { ConsoleColor, consoleColors } from "../colors";
import { displayInColor } from "./displayInColor";

export function checkIfIsEmpty(error: string, ...args: any[]): void {
  for (const arg of args) {
    for (const test of arg) {
      if (!test) {
        throw new Error(error);
      }
    }
  }
}

export function errorManage(
  res: Express.Response | undefined,
  checkError: (...args: any) => void,
  error: string,
  ...args: any
) {
  try {
    checkError(error, args);
  } catch (err: any) {
    displayInColor("bgRed", err.message);
  }
}
