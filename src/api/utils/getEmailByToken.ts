import jwt from "jsonwebtoken";

export const getEmailByToken = async (
  token: string | undefined
): Promise<string | undefined> => {
  try {
    const verified: any = await jwt.verify(
      String(token),
      String(process.env.JWT_SECRET)
    );
    return verified.email;
  } catch (err) {
    return undefined;
  }
};
