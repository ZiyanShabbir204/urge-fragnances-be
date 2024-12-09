const mongoose = require("mongoose");

const PerfumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Unisex"],
    required: true,
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
      top_notes: {
        type: String,
      },
      heart_notes: {
        type: String,
      },
      base_notes: {
        type: String,
      },
      img1:{
        type:String
      },
      img2:{
        type:String
      }
    },
  ],
});

module.exports = mongoose.model("Perfume", PerfumeSchema);
