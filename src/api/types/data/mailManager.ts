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
  return { email: "E-Mail send successfuly" };
};
