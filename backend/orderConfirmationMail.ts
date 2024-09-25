import nodemailer from "nodemailer";
import logger from "./logger";

export const orderConfirmationMail = (email: string) => {
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
    subject: "Order Confirmation Email",
    html: `<h2>Your Order is Confirmed </h2>
        <h3>Thank you for shopping with us</h3>
        <p> Your order will be delivered to you soon</p>
        `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        logger.error(`Error sending Order Confirmation Email: ${err}`);
        reject(err);
      } else {
        logger.info(`Order Confirmation Email sent: ${res.response}`);
        resolve(true);
      }
    });
  });
};
