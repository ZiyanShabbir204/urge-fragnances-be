const PerfumeWax = require("../models/PerfumeWax")

const createPerfumeWax = async (req)=>{
    const {name,description,gender,sizes} = req.body


    const perfumeWax  = PerfumeWax.create({
        name,
        description,
        gender,
        sizes
    })

    return perfumeWax

}
const getPerfumeWax = ()=>{
    return PerfumeWax.find()
}
const getPerfumeWaxByName = (name)=>{
    return PerfumeWax.findOne({name})
}

module.exports = {
    createPerfumeWax,
    getPerfumeWax,
    getPerfumeWaxByName
}