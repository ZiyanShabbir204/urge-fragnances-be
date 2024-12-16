const nodemailer = require("nodemailer");

let transporter;

const initMailer = () => {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.Email_User,
      pass: process.env.Email_Password,
    },
  });
};
const sendEmail = async (receiverEmail, content, messagetype, subject) => {
  await transporter.sendMail({
    from: process.env.Email_User,
    to: receiverEmail,
    subject: subject || "Urge Fragnances",
    [messagetype]: content,
  });
};

module.exports = { sendEmail, initMailer };
