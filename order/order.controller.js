const mongoose = require("mongoose");
const OrderService = require("./order.service");
const { sendEmail } = require("../nodemailer/send-email");
const { sendMailEnQueue } = require("../queue/sendEmailEnqueue");
// Assuming you have separate models for each type
const Perfumes = require("../models/Perfumes");
const PerfumeWax = require("../models/PerfumeWax");
const ScentedCandles = require("../models/ScentedCandles");

// Create a mapping of models for dynamic access
const models = {
  Perfumes,
  PerfumeWax,
  ScentedCandles,
};

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

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Update the quantity of each product in the database
    for (const product of products) {
      const { type, productId, sizeId, quantity } = product;

      const ProductModel = models[type];
      if (!ProductModel) {
        // throw new Error(`Invalid product type: ${type}`);
        return res
          .status(400)
          .json({ message: `Invalid product type: ${type}` });
      }

      // Find the product document by its _id
      const productDocument = await ProductModel.findOne(
        { _id: productId },
        { sizes: 1 } // Only fetch the sizes array for efficiency
      );

      if (!productDocument) {
        // throw new Error(`Product not found with ID: ${productId}`);
        return res
          .status(404)
          .json({ message: `ID of the product ${product.name} not found` });
      }

      // Find the specific size to update
      const size = productDocument.sizes.find(
        (s) => s._id.toString() === sizeId
      );
      if (!size) {
        // throw new Error(`Size not found with ID: ${sizeId}`);
        return res.status(404).json({
          message: `ID of Size, ${product.size} not found for ${product.name}`,
        });
      }

      if (size.quantity < quantity) {
        // throw new Error(`Insufficient stock for ${product.name} ${product.size}`);
        return res.status(405).json({
          message: `Insufficient stock for ${product.name} ${product.size}`,
        });
      } else {
        // Update the size quantity atomically
        const updatedProduct = await ProductModel.findOneAndUpdate(
          { _id: productId, "sizes._id": sizeId }, // Locate product and size
          { $inc: { "sizes.$.quantity": -quantity } }, // Decrement size quantity
          { new: true, session }
        );
        if (!updatedProduct) {
          // throw new Error(`Failed to update quantity for size ID: ${sizeId}`);
          return res.status(408).json({
            message: `Failed to update quantity for ${product.name} ${product.size}`,
          });
        }
      }
    }

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
      totalBill,
      { session }
    );
    console.log("order", order);
    const perfumes = products.filter((product) => product.type === "Perfumes");
    const perfumeWax = products.filter(
      (product) => product.type === "PerfumeWax"
    );
    const candels = products.filter(
      (product) => product.type === "ScentedCandles"
    );

    const message = `
Hello,

You have received a new order with the following details:

Customer Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone Number: ${phoneNumber}
- Address: ${address}, ${city}, ${postalCode}, ${country}

Order Details:
- Payment Method: ${paymentMethod}
- Total Bill: PKR ${totalBill}

Products Ordered:
${
  perfumes.length > 0
    ? `Perfumes
  ${perfumes
    .map(
      (product, index) => `${index + 1}. ${product.name}
   - Size: ${product.size}
   - Price: PKR ${product.price}
   - Quantity: ${product.quantity}
   `
    )
    .join("\n")}
  `
    : ""
}

${
  candels.length > 0
    ? `Scented Candles
  ${candels
    .map(
      (product, index) => `${index + 1}. ${product.name}
  - Size: ${product.size}
  - Price: PKR ${product.price}
  - Quantity: ${product.quantity}
     `
    )
    .join("\n")}
    `
    : ""
}

  ${
    perfumeWax.length > 0
      ? `Perfume Wax
  ${perfumeWax
    .map(
      (product, index) => `${index + 1}. ${product.name}
  - Size: ${product.size}
  - Price: PKR ${product.price}
  - Quantity: ${product.quantity}
       `
    )
    .join("\n")}
      `
      : ""
  }



Please process the order at your earliest convenience.

Best regards,
Your Website
`;

    sendMailEnQueue("eaxee.info@gmail.com", message);
    sendMailEnQueue("ziyanshabbir25@gmail.com", message);

    // await sendEmail("zayanirfan8@gmail.com","Order has been booked","text")
    await session.commitTransaction();
    session.endSession();
    return res
      .status(200)
      .json({ message: "Order created successfully.", order });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    // console.log("error", error);
    return res.status(500).json({ error: error.message });
  }
};



module.exports = {
  createOrder,
  
};
