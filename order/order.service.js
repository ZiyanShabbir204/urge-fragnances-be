const Order = require("../models/Order");

const createOrder = async (req) => {
  const {
    address,
    city,
    country,
    email,
    firstName,
    lastName,
    paymentMethod,
    phoneNumber,
    postalCode,
  } = req.body;
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
  });

  return order
};

module.exports = {
    createOrder
}