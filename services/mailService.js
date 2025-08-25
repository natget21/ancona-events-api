import nodemailer from "nodemailer";
import config from "../config/config.js";

var sendMail = (receiverEmail, subject, bodyText, bodyHtml) => {
  let transporter = nodemailer.createTransport({
    host: config.MAIL.HOST,
    port: config.MAIL.PORT,
    secure: false,
    auth: config.MAIL.AUTH,
    tls: {
      rejectUnauthorized: false,
      ciphers: "SSLv3"
    }
  });

  let mailOptions = {
    from: config.MAIL.FROM,
    to: receiverEmail,
    subject: subject,
    text: bodyText,
    html: bodyHtml
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error: " + error);
      return error;
    }
    console.log("info: " + info);
    return info;
  });
};


export default { sendMail };