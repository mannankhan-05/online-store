import nodemailer from "nodemailer";
import logger from "./logger";

export const sendMail = async (email: string, text: string) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmation Email",
    text: text,
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      logger.error(`Error sending email: ${err}`);
    } else {
      logger.info(`Email sent: ${res.response}`);
    }
  });
};
