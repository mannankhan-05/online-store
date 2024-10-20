import nodemailer from "nodemailer";
import logger from "../logger";

export const signInMail = async (email: string) => {
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
    subject: "Login Email",
    html: `
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px; max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; padding: 20px; background-color: #4CAF50; border-radius: 8px 8px 0 0;">
    <h2 style="color: white; margin: 0;">Login Successful</h2>
  </div>
  <div style="padding: 20px;">
    <p style="font-size: 16px; color: #555;">Dear user,</p>
    <p style="font-size: 16px; color: #555;">You logged in using your email: <strong style="color: #333;">${email}</strong></p>
    <p style="font-size: 16px; color: #555;">We wanted to let you know that you've successfully logged into your account.</p>
    <p style="font-size: 16px; color: #555;">If you didn't perform this action, we recommend changing your password immediately to ensure your account's security.</p>
    <p style="font-size: 16px; color: #555;">If you have any questions or concerns, please don't hesitate to <a href="#" style="color: #4CAF50; text-decoration: none;">reach out to us</a> for support.</p>
  </div>
  <div style="text-align: center; padding: 20px; background-color: #4CAF50; border-radius: 0 0 8px 8px; color: white;">
    <p style="font-size: 14px; margin: 0;">Best regards,<br><strong>The Support Team</strong></p>
  </div>
</div>
    `,
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      logger.error(`Error sending email: ${err}`);
    } else {
      logger.info(`Email sent: ${res.response}`);
    }
  });
};
