const Perfume = require("../models/Perfumes");

const createPerfume = async (req) => {
  const { name, type, gender, sizes, description } = req.body;
  // console.log("name",name)
  // console.log("name",sizes)

  const perfume = Perfume.create({
    name,
    type,
    gender,
    sizes,
    description,
  });

  return perfume;
};
const getPerfume = (gender) => {
  
  return gender? Perfume.find({gender}) :  Perfume.find();
};
const getPefumeByName = (name) => {
  return Perfume.findOne({ name });
};

const updatePerfume = (name, description) => {
  return Perfume.findOneAndUpdate(
    { name },
    { $set: { description } }, 
    { new: true }
  );
};

// const getPerfumeCategory = (gender)=>{
//   return Perfume.find({gender})

// }

module.exports = {
  createPerfume,
  getPerfume,
  getPefumeByName,
  updatePerfume,
  
};
