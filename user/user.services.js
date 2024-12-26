const Contact = require("../models/Contact")

const contactUS = async (name,email,subject,message)=>{
    console.log("name",name)
    const contact = await Contact.create({name,email,subject,message})
    return contact
}

module.exports = {
    contactUS
}