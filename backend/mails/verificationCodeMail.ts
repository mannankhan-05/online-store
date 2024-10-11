import nodemailer from "nodemailer";
import logger from "../logger";

export const verificationCode = async (email: string) => {
  let verificationCode: number = Math.floor(100000 + Math.random() * 900000);

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
    subject: "Verification Email",
    html: `<p>Your Verification code is : <strong>${verificationCode}</strong</p>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        logger.error(`Error sending Verification Email: ${err}`);
        reject(err); // Reject the promise on error
      } else {
        logger.info(`Verification Email sent: ${res.response}`);
        resolve(verificationCode); // Resolve the promise with the verification code
      }
    });
  });
};
