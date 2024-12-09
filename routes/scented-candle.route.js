const express = require("express")
const {createCandle,getCandle,getCandleByName} = require("../scented-candles/scented-candles.controller")
 
const router = express.Router()

router.post("/",createCandle)
router.get("/",getCandle)
router.get("/:name",getCandleByName)

module.exports =  router