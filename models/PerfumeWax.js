const mongoose = require("mongoose");

const PerfumeWaxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Unisex"],
    required: true,
  },
  description:{
    type:String
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
      img1:{
        type:String
      },
      img2:{
        type:String
      }
    },
  ],
});

module.exports = mongoose.model("PerfumeWax", PerfumeWaxSchema);
