import { useSession } from "next-auth/react";

const nodemailer = require('nodemailer');

export async function SendEmail (email: string, user: string) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVER,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD
    }
  });
  const result = await transporter.sendMail({
    to: email,
    from: process.env.EMAIL_FROM,
    subject: `You Have Joined XLang.AI Waitlist!`,
    text: text(),
    html: html(user),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

/**
 *使用HTML body 代替正文内容
 */
function html(user: string) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f2f2f2;
              margin: 0;
              padding: 0;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 4px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
              color: #333333;
              font-size: 24px;
              margin-top: 0;
          }
  
          p {
              color: #555555;
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 20px;
          }
  
          .button {
              display: inline-block;
              background-color: #4CAF50;
              color: #ffffff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 4px;
              font-size: 16px;
              margin-top: 20px;
          }
  
          .footer {
              margin-top: 40px;
              text-align: center;
              color: #999999;
              font-size: 14px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>XLang.AI Waitlist Notification</h1>
          <p>Dear ${user},</p>
          <p>We wanted to inform you that you have been placed on the waitlist for xlang.ai, the next-level language interface.</p>
          <p>Please note that being on the waitlist does not guarantee a spot in the demo. However, if any spots become available, we will notify you promptly.</p>
          <p>Thank you for your interest and patience. If you have any questions, please feel free to contact us.</p>
          <a href="[Contact Email]" class="button">Contact Us</a>
          <div class="footer">
              <p>Best regards,</p>
              <p>The XLang.AI Team</p>
          </div>
      </div>
  </body>
  </html>
  `;
}

/** 不支持HTML 的邮件客户端会显示下面的文本信息 */
function text() {
  return `Congratulations, you have joined the XLang.AI Waitlist!`;
}
