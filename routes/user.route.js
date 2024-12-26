const express = require("express")
const {contactUs,subscribeUser} = require("../user/user.controller")

const router= express.Router()

router.post("/contact",contactUs)

router.post("/subscribe",subscribeUser)

module.exports = router