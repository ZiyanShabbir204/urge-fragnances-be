const { sendMailEnQueue } = require("../queue/sendEmailEnqueue");
const UserServices = require("./user.services");

const contactUs = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const contact = await UserServices.contactUS(name, email, subject, message);
    const newMessage = `Dear Admin,

    You have received a new query from the Contact Us form. Here are the details:
    
    Name: ${name}
    Email: ${email}
    Subject: ${subject}
    Message:
    ${message}
    Please review and take the necessary action.
    
    Best regards`;

    sendMailEnQueue("arbab@urgefragrances.com", newMessage);
    sendMailEnQueue("ziyanshabbir25@gmail.com", newMessage);
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const subscribeUser = async (req, res) => {
  const { data } = req.body;
  try {
    sendMailEnQueue(
      "arbab@urgefragrances.com",
      `You have New subscriber 
        Email / phone number : ${data}`
    );
    sendMailEnQueue(
      "ziyanshabbir25@gmail.com",
      `You have new subscriber
        Email / phone number : ${data}`
    );
    res.status(200).json({ message: "You have been subcribed" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  contactUs,
  subscribeUser,
};
