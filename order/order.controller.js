const OrderService = require("./order.service");
const { sendEmail } = require("../nodemailer/send-email");
const { sendMailEnQueue } = require("../queue/sendEmailEnqueue");

const createOrder = async (req, res) => {
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
    products,
    totalBill,
  } = req.body;


  try {
    const order = await OrderService.createOrder(
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
    );
    const message = `
Hello,

You have received a new order with the following details:

Customer Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone Number: ${phoneNumber}
- Address: ${address}, ${city}, ${postalCode}, ${
      country
    }

Order Details:
- Payment Method: ${paymentMethod}
- Total Bill: PKR ${totalBill}

Products Ordered:
${products
  .map(
    (product, index) =>
      `${index + 1}. ${product.name}
   - Size: ${product.size}
   - Price: PKR ${product.price}
   - Quantity: ${product.quantity}`
  )
  .join("\n")}

Please process the order at your earliest convenience.

Best regards,
Your Website
`;

    sendMailEnQueue("zayanirfan8@gmail.com", message);
    sendMailEnQueue("ziyanshabbir25@gmail.com", message);

    // await sendEmail("zayanirfan8@gmail.com","Order has been booked","text")
    res.status(200).json({ order });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
};
