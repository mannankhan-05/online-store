import nodemailer from "nodemailer";
import logger from "../logger";

export const orderConfirmationMail = (
  email: string,
  orderId: string,
  orderAmount: number
) => {
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
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="text-align: center; padding-bottom: 20px;">
          <img src="https://www.shutterstock.com/image-illustration/shopping-cart-check-mark-icon-260nw-1428705257.jpg" alt="Your Logo" style="width: 120px; margin-bottom: 20px;">
          <h2 style="color: #333;">Thank you for your order!</h2>
          <p style="color: #555; font-size: 16px; margin: 0;">We appreciate your trust in us. Your order <strong>#${orderId}</strong> has been confirmed!</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-bottom: 10px;">Order Summary</h3>
          <p style="font-size: 16px; color: #555;">
            <strong>Order ID:</strong> ${orderId}<br>
            <strong>Total Amount:</strong> $${orderAmount.toFixed(2)}<br>
          </p>
        </div>

        <div style="text-align: center;">
          <p style="font-size: 16px; color: #777;">Your order is being prepared and will be delivered soon.</p>
        </div>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;">

        <div style="text-align: center;">
          <p style="color: #888; font-size: 14px;">If you have any questions, feel free to <a href="mailto:abdulmannan.khan005@gmail.com" style="color: #007bff;">contact us</a>.</p>
          <p style="color: #888; font-size: 12px;">&copy; ${new Date().getFullYear()} Your Shop. All Rights Reserved.</p>
        </div>
      </div>
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
