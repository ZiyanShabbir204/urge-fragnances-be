const express = require("express")
const { createOrder } = require("../order/order.controller")

const router= express.Router()

router.post("/",createOrder)

module.exports = router