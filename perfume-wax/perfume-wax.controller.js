const PerfumeWaxService = require("./perfume-wax.service");

const createPerfumeWax = async (req, res) => {
  try {
    const perfumeWax = await PerfumeWaxService.createPerfumeWax(req);
    res.status(200).json({ perfumeWax });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getPerfumeWax = async (req, res) => {
  try {
    const perfumeWax = await PerfumeWaxService.getPerfumeWax();
    res.status(200).json(perfumeWax);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPerfumeWaxByName = async (req, res) => {
  const { name } = req.params;
  try {
    const perfumeWax = await PerfumeWaxService.getPerfumeWaxByName(name);
    res.status(200).json(perfumeWax);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  createPerfumeWax,
  getPerfumeWax,
  getPerfumeWaxByName,
};
