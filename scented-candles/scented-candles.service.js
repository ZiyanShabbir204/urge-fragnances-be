const ScentedCandle = require("../models/ScentedCandles")

const createCandle = async (req)=>{
    const {name , description,intro,sizes,candle_throw} = req.body
    const candle = ScentedCandle.create({
        name,
        description,
        intro,
        sizes,
        candle_throw

    })
    return candle

}

const getCandle = async (req)=>{
    return ScentedCandle.find()
}

const getCandleByName = async (name)=>{
    return ScentedCandle.findOne({name})

}



module.exports = {createCandle,getCandle,getCandleByName}