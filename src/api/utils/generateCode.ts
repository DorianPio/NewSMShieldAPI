/**
 * Generates a random validation code consisting of 10 alphanumeric characters.
 * @returns A string containing the generated validation code.
 */

export const generateValidationCode = (): string => {
  let code: string = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (let i = 0; i < 10; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return code;
};
