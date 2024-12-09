const mongoose = require("mongoose");

const CandleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  candle_throw: {
    type: String,
  },
  description: {
    type: String,
  },
  intro: {
    type: String,
  },
  sizes: [
    {
      size: {
        type: String, // e.g., "50ml", "100ml"
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      img1: {
        type: String,
      },
      img2: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("ScentedCandle", CandleSchema);
