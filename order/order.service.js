const Order = require("../models/Order");
const { sendMailEnQueue } = require("../queue/sendEmailEnqueue");

const createOrder = async (address,
  city,
  country,
  email,
  firstName,
  lastName,
  paymentMethod,
  phoneNumber,
  postalCode,products,totalBill) => {
  
  const order = await Order.create({
    address,
    city,
    country,
    email,
    firstName,
    lastName,
    paymentMethod,
    phoneNumber,
    postalCode,
    products,
    totalBill

  });

  return order
};



module.exports = {
    createOrder,
}
