import * as nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function sendEmail(to: String, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "smshield2024@gmail.com",
      pass: "jjjhbthpmzlvziel",
    },
  });

  const mailOptions = {
    from: '"SM Shield" <smshield2024@gmail.com>',
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions as Mail.Options);
}
