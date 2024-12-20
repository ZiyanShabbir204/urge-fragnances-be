const mongoose = require("mongoose");

// Define a sub-schema for products
const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "type", // Dynamically reference the collection based on "type"
    required: true,
  },
  sizeId: {
    type: mongoose.Schema.Types.ObjectId, // The ID of the size in the `sizes` array
    required: true,
  },
  type: {
    type: String,
    enum: ["Perfumes", "PerfumeWax", "ScentedCandles"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Main order schema
const orderSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
  },
  totalBill: {
    type: Number,
  },
  products: {
    type: [productSchema], // Array of product sub-schema
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
