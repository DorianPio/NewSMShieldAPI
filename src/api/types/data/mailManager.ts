import { Schema } from "mongoose";
import { htmlContentOfMail } from "../../../html/mailContent";
import { sendEmail } from "../../utils/sendAnEmail";

interface dataVerificationEmail {
  code: string;
  email: string;
  createdAt: Date;
  _id: Schema.Types.ObjectId;
  __v: 0;
}

/**
 * Sends an email to verify a user's email address.
 * @param req - The request object from the client.
 * @param res - The response object to send back to the client.
 * @param data - The data object containing the email address, verification code, and creation date.
 * @returns An object containing a success message.
 */

export const mailManager = async (
  req: any,
  res: any,
  data: dataVerificationEmail
): Promise<{ email: string }> => {
  await sendEmail(
    req.query.email,
    "SM Shield - Vérification de votre adresse email",
    htmlContentOfMail(data.code)
  );
  return { email: "Email sent successfuly" };
};
