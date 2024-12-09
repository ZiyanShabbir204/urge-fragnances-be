const Perfume = require("../models/Perfumes")

const createPerfume = async (req)=>{
    const {name,type,gender,sizes} = req.body
    // console.log("name",name)
    // console.log("name",sizes)

    const perfume  = Perfume.create({
        name,
        type,
        gender,
        sizes
    })

    return perfume

}
const getPerfume = ()=>{
    return Perfume.find()
}
const getPefumeByName = (name)=>{
    return Perfume.findOne({name})
}

module.exports = {
    createPerfume,
    getPerfume,
    getPefumeByName
}