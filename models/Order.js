const mongoose= require("mongoose")

const orderSchema = new mongoose.Schema({
    address:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required:true
    },
    country: {
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    paymentMethod:{
        type:String
    },
    phoneNumber:{
        type:String,
        required:true
    },
    postalCode:{
        type:String
    }

})

module.exports = mongoose.model("Order",orderSchema)