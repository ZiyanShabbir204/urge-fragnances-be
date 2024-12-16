const Queue = require("bull");
const { sendEmail } = require("../nodemailer/send-email");

const sendMailQueue = new Queue("sendMail", {
  redis: {
    host: "localhost",
    port: 6379,
  },
});

const sendMailEnQueue = (
  receiverEmail,
  message,
  messagetype = "text",
  subject
) => {
  const data = {
    receiverEmail,
    message,
    messagetype,
    subject,
  };
  sendMailQueue.add(data);
};
sendMailQueue.process(async (job) => {
  if (!job.data.receiverEmail) {
    return Promise.resolve();
  }

  return await sendEmail(
    job.data.receiverEmail,
    job.data.message,
    job.data.messagetype
  );
});
module.exports = { sendMailEnQueue };
