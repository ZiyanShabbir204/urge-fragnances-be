const PerfumeService = require("./perfume.service");

const createPerfume = async (req, res) => {
  try {
    const perfume = await PerfumeService.createPerfume(req);
    res.status(200).json({ perfume });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getPerfume = async (req, res) => {
  try {
    const perfumes = await PerfumeService.getPerfume();
    res.status(200).json(perfumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPerfumeCategory = async (req, res) => {
  const { gender } = req.query;
  try {
    const perfumes = await PerfumeService.getPerfumeCategory(gender);
    res.status(200).json(perfumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPefumeByName = async (req, res) => {
  const { name } = req.params;
  try {
    const perfume = await PerfumeService.getPefumeByName(name);
    res.status(200).json(perfume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updatePerfume = async (req, res) => {
  const { name } = req.params;
  const { description } = req.body;
  try {
    const perfume = await PerfumeService.updatePerfume(name, description);
    res.status(200).json(perfume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createPerfume,
  getPerfume,
  getPefumeByName,
  updatePerfume,
  getPerfumeCategory,
};
