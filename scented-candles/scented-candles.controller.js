const ScentedCandleServices = require("./scented-candles.service");

const createCandle = async (req, res) => {
  try {
    const candle = await ScentedCandleServices.createCandle(req);
    res.status(200).json(candle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCandle = async (req, res) => {
  try {
    const candles = await ScentedCandleServices.getCandle();
    res.status(200).json(candles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCandleByName = async (req, res) => {
  const { name } = req.params;
  try {
    const candle = await ScentedCandleServices.getCandleByName(name);
    res.status(200).json(candle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCandle,
  getCandle,
  getCandleByName,
};
