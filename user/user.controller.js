const { sendMailEnQueue } = require("../queue/sendEmailEnqueue");
const UserServices = require("./user.services")

const contactUs = async (req, res) => {
    const {name,email,subject,message} = req.body
  try {
    const contact = await UserServices.contactUS(name,email,subject,message)
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const subscribeUser = async (req,res)=>{

    const {data} =  req.body
    try {
      sendMailEnQueue("ziyanshabbir25@gmail.com",`Email / phone number : ${data}`)
      res.status(200).json({message: "You have been subcribed"})
      
    } catch (error) {
      return res.status(500).json({ error: error.message });
      
    }
  
  
  }



module.exports = {
    contactUs,
    subscribeUser
};
