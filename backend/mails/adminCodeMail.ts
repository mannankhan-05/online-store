import nodemailer from "nodemailer";
import logger from "../logger";

export const adminCode = async (email: string) => {
  let code: number = Math.floor(100000 + Math.random() * 900000);

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
    subject: "Code To Become Admin",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <div style="text-align: center; padding-bottom: 20px;">
        <h2 style="color: #1976d2;">Admin Verification Code</h2>
        <p style="color: #555;">To become an admin and manage users, products, and orders, please use the code below.</p>
      </div>
      <div style="text-align: center; padding: 20px; border: 1px solid #1976d2; border-radius: 5px; background-color: #f9f9f9;">
        <h1 style="color: #1976d2; font-size: 48px; margin: 0;">${code}</h1>
      </div>
      <div style="padding-top: 20px;">
        <p style="color: #555;">Please enter this code on the admin page to complete your verification. The code is valid for 10 minutes.</p>
        <p style="color: #555;">If you did not request this, please ignore this email or contact support.</p>
      </div>
      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="color: #888;">Best Regards,<br/>The Team</p>
      </div>
    </div>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        logger.error(`Error sending Admin Code Email: ${err}`);
        reject(err);
      } else {
        logger.info(`Admin Code Email sent: ${res.response}`);
        resolve(code);
      }
    });
  });
};
